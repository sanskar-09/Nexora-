import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { parse } from 'url';

interface Client {
  ws: WebSocket;
  role: 'doctor' | 'patient';
  appointmentId: string;
}

export function setupWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });
  const clients = new Map<string, Client[]>();

  wss.on('connection', (ws, req) => {
    const { query } = parse(req.url || '', true);
    const { role, appointmentId } = query;

    if (!role || !appointmentId || (role !== 'doctor' && role !== 'patient')) {
      ws.close(1008, 'Invalid connection parameters');
      return;
    }

    const client: Client = {
      ws,
      role: role as 'doctor' | 'patient',
      appointmentId: appointmentId as string
    };

    // Add client to the appointment room
    if (!clients.has(appointmentId as string)) {
      clients.set(appointmentId as string, []);
    }
    clients.get(appointmentId as string)?.push(client);

    console.log(`Client connected: ${role} for appointment ${appointmentId}`);

    // Handle messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        const { type, payload } = data;

        // Broadcast message to all clients in the same appointment
        const appointmentClients = clients.get(appointmentId as string) || [];
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
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });

    // Handle disconnection
    ws.on('close', () => {
      const appointmentClients = clients.get(appointmentId as string) || [];
      const index = appointmentClients.findIndex(c => c.ws === ws);
      if (index !== -1) {
        appointmentClients.splice(index, 1);
      }
      if (appointmentClients.length === 0) {
        clients.delete(appointmentId as string);
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