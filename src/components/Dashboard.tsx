
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  userRole: 'patient' | 'doctor' | 'admin';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const healthScore = 85;
  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "2024-01-15", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "General Medicine", date: "2024-01-20", time: "2:30 PM" }
  ];

  const recentMedications = [
    { id: 1, name: "Lisinopril", dosage: "10mg", nextDose: "Today, 8:00 PM", status: "on-time" },
    { id: 2, name: "Metformin", dosage: "500mg", nextDose: "Tomorrow, 9:00 AM", status: "upcoming" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-1">Here's your health overview for today</p>
        </div>
        <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
          All systems healthy
        </Badge>
      </div>

      {/* Health Score Card */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Overall Health Score</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">{healthScore}/100</Badge>
          </CardTitle>
          <CardDescription>Based on your recent activity and health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={healthScore} className="h-3 mb-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">92%</p>
              <p className="text-sm text-gray-600">Medication Adherence</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">8.5</p>
              <p className="text-sm text-gray-600">Sleep Quality</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">7,250</p>
              <p className="text-sm text-gray-600">Daily Steps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled medical appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  <p className="text-sm text-blue-600">{appointment.date} at {appointment.time}</p>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">Schedule New Appointment</Button>
          </CardContent>
        </Card>

        {/* Recent Medications */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Reminders</CardTitle>
            <CardDescription>Your current medication schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMedications.map((med) => (
              <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage}</p>
                  <p className="text-sm text-blue-600">{med.nextDose}</p>
                </div>
                <Badge 
                  variant={med.status === 'on-time' ? 'default' : 'secondary'}
                  className={med.status === 'on-time' ? 'bg-green-100 text-green-800' : ''}
                >
                  {med.status === 'on-time' ? 'On Time' : 'Upcoming'}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">Manage Medications</Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Check Symptoms</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-sm">Add Medication</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm">Log Vitals</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Book Appointment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
