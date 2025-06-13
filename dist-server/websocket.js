import { WebSocketServer, WebSocket } from 'ws';
import { parse } from 'url';
export function setupWebSocketServer(server) {
    const wss = new WebSocketServer({ server });
    const clients = new Map();
    wss.on('connection', (ws, req) => {
        const { query } = parse(req.url || '', true);
        const { role, appointmentId } = query;
        if (!role || !appointmentId || (role !== 'doctor' && role !== 'patient')) {
            ws.close(1008, 'Invalid connection parameters');
            return;
        }
        const client = {
            ws,
            role: role,
            appointmentId: appointmentId
        };
        // Add client to the appointment room
        if (!clients.has(appointmentId)) {
            clients.set(appointmentId, []);
        }
        clients.get(appointmentId)?.push(client);
        console.log(`Client connected: ${role} for appointment ${appointmentId}`);
        // Handle messages
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const { type, payload } = data;
                // Broadcast message to all clients in the same appointment
                const appointmentClients = clients.get(appointmentId) || [];
                appointmentClients.forEach((client) => {
                    if (client.ws !== ws && client.ws.readyState === WebSocket.OPEN) {
                        client.ws.send(JSON.stringify({
                            type,
                            payload: {
                                ...payload,
                                appointmentId,
                                role: client.role
                            }
                        }));
                    }
                });
            }
            catch (error) {
                console.error('Error handling message:', error);
            }
        });
        // Handle disconnection
        ws.on('close', () => {
            const appointmentClients = clients.get(appointmentId) || [];
            const index = appointmentClients.findIndex(c => c.ws === ws);
            if (index !== -1) {
                appointmentClients.splice(index, 1);
            }
            if (appointmentClients.length === 0) {
                clients.delete(appointmentId);
            }
            console.log(`Client disconnected: ${role} for appointment ${appointmentId}`);
        });
        // Handle errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
    return wss;
}
