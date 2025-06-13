import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const navigate = useNavigate();

  // Mock appointments data
  const appointments = [
    { id: 1, doctor: "Dr. Priya Sharma", specialty: "Cardiology", date: "2024-01-15", time: "10:00 AM", status: "upcoming" },
    { id: 2, doctor: "Dr. Rajesh Patel", specialty: "General Medicine", date: "2024-01-20", time: "2:30 PM", status: "upcoming" },
    { id: 3, doctor: "Dr. Ananya Gupta", specialty: "Dermatology", date: "2024-01-22", time: "11:15 AM", status: "upcoming" },
    { id: 4, doctor: "Dr. Vikram Singh", specialty: "Orthopedics", date: "2024-01-25", time: "3:45 PM", status: "upcoming" },
    { id: 5, doctor: "Dr. Meera Kapoor", specialty: "Endocrinology", date: "2024-02-02", time: "9:30 AM", status: "upcoming" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your medical appointments</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => navigate('/appointments/new')}>
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <h3 className="text-lg font-semibold">{appointment.doctor}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={
                    appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {appointment.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments; 