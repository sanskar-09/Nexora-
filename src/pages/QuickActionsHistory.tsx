import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, Calendar, Pill, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const QuickActionsHistory = () => {
  const navigate = useNavigate();

  // Mock history data
  const history = [
    { 
      id: 1, 
      type: 'vitals', 
      title: 'Logged Vitals', 
      description: 'Blood Pressure: 120/80, Heart Rate: 72 BPM', 
      timestamp: '2024-01-15 10:30 AM',
      status: 'completed'
    },
    { 
      id: 2, 
      type: 'medication', 
      title: 'Added Medication', 
      description: 'Added Lisinopril 10mg', 
      timestamp: '2024-01-14 2:15 PM',
      status: 'completed'
    },
    { 
      id: 3, 
      type: 'appointment', 
      title: 'Scheduled Appointment', 
      description: 'Dr. Sharma - Cardiology', 
      timestamp: '2024-01-13 9:45 AM',
      status: 'completed'
    },
    { 
      id: 4, 
      type: 'symptoms', 
      title: 'Submitted Symptoms', 
      description: 'Fever, Headache, Fatigue', 
      timestamp: '2024-01-12 3:20 PM',
      status: 'completed'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'vitals':
        return <Activity className="h-4 w-4" />;
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'symptoms':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quick Actions History</h1>
          <p className="text-gray-600 mt-1">View your recent quick actions</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    item.type === 'vitals' ? 'bg-blue-100' :
                    item.type === 'medication' ? 'bg-green-100' :
                    item.type === 'appointment' ? 'bg-purple-100' :
                    'bg-yellow-100'
                  }`}>
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.timestamp}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {item.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsHistory; 