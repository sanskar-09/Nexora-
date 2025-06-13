import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import wsService from '@/services/websocketService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: string;
}

interface ChatProps {
  appointmentId: string;
  role: 'doctor' | 'patient';
}

const Chat = ({ appointmentId, role }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subscribe to chat messages
    wsService.subscribe('chat-message', handleNewMessage);

    return () => {
      wsService.unsubscribe('chat-message', handleNewMessage);
    };
  }, []);

  const handleNewMessage = (data: any) => {
    if (data.appointmentId !== appointmentId) return;

    const message: Message = {
      id: Date.now(),
      text: data.text,
      sender: data.sender,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: role === 'doctor' ? 'doctor' : 'user',
        timestamp: new Date().toISOString()
      };

      // Send message through WebSocket
      wsService.send('chat-message', {
        ...message,
        appointmentId,
        role
      });

      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setIsSending(false);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again.",
        variant: "destructive"
      });
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          {role === 'doctor' ? 'Patient Chat' : 'Doctor Chat'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === (role === 'doctor' ? 'user' : 'doctor') ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === (role === 'doctor' ? 'user' : 'doctor')
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type a message as ${role === 'doctor' ? 'doctor' : 'patient'}...`}
            className="flex-1"
            disabled={isSending}
          />
          <Button 
            onClick={sendMessage} 
            size="icon"
            disabled={isSending || !newMessage.trim()}
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat; 