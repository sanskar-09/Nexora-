import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Calendar, FileText, Heart, Users, AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";

interface DashboardProps {
  userRole: 'patient' | 'doctor' | 'admin' | 'guest';
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const navigate = useNavigate();
  const healthScore = 85;
  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Priya Sharma", specialty: "Cardiology", date: "2024-01-15", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Rajesh Patel", specialty: "General Medicine", date: "2024-01-20", time: "2:30 PM" },
    { id: 3, doctor: "Dr. Ananya Gupta", specialty: "Dermatology", date: "2024-01-22", time: "11:15 AM" },
    { id: 4, doctor: "Dr. Vikram Singh", specialty: "Orthopedics", date: "2024-01-25", time: "3:45 PM" },
    { id: 5, doctor: "Dr. Meera Kapoor", specialty: "Endocrinology", date: "2024-02-02", time: "9:30 AM" }
  ];

  const recentMedications = [
    { id: 1, name: "Lisinopril", dosage: "10mg", nextDose: "Today, 8:00 PM", status: "on-time" },
    { id: 2, name: "Metformin", dosage: "500mg", nextDose: "Tomorrow, 9:00 AM", status: "upcoming" },
    { id: 3, name: "Atorvastatin", dosage: "20mg", nextDose: "Today, 10:00 PM", status: "on-time" },
    { id: 4, name: "Vitamin D3", dosage: "2000 IU", nextDose: "Tomorrow, 8:00 AM", status: "upcoming" },
    { id: 5, name: "Omega-3", dosage: "1000mg", nextDose: "Today, 6:00 PM", status: "missed" }
  ];

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", trend: "stable" },
    { label: "Heart Rate", value: "72", unit: "BPM", status: "normal", trend: "improving" },
    { label: "Weight", value: "165", unit: "lbs", status: "normal", trend: "decreasing" },
    { label: "Blood Sugar", value: "95", unit: "mg/dL", status: "normal", trend: "stable" },
    { label: "Steps Today", value: "8,750", unit: "steps", status: "good", trend: "increasing" },
    { label: "Sleep Quality", value: "7.8", unit: "/10", status: "good", trend: "stable" }
  ];

  const recentActivities = [
    { id: 1, type: "medication", description: "Took Lisinopril 10mg", time: "2 hours ago" },
    { id: 2, type: "vitals", description: "Logged blood pressure reading", time: "4 hours ago" },
    { id: 3, type: "exercise", description: "Completed 30-minute walk", time: "6 hours ago" },
    { id: 4, type: "appointment", description: "Visited Dr. Johnson for check-up", time: "Yesterday" },
    { id: 5, type: "medication", description: "Refilled Metformin prescription", time: "2 days ago" }
  ];

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'doctor':
        return "Welcome back, Doctor! Here's your practice overview.";
      case 'admin':
        return "Welcome to the admin dashboard. System overview below.";
      case 'guest':
        return "Welcome! Explore our health platform features.";
      default:
        return "Welcome to your health dashboard!";
    }
  };

  const handleViewAllAppointments = () => {
    navigate('/appointments');
  };

  const handleManageMedications = () => {
    navigate('/medications');
  };

  const handleViewDetails = (appointmentId: number) => {
    navigate(`/appointments/${appointmentId}`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'check-symptoms':
        navigate('/submit-symptoms');
        break;
      case 'add-medication':
        navigate('/medications/add');
        break;
      case 'log-vitals':
        navigate('/vitals/log');
        break;
      case 'book-appointment':
        navigate('/appointments/new');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{getWelcomeMessage()}</h1>
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

      {/* Health Metrics Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Health Metrics</CardTitle>
          <CardDescription>Your latest health measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {healthMetrics.map((metric, index) => (
              <div 
                key={index} 
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => navigate(`/vitals/${metric.label.toLowerCase().replace(/\s+/g, '-')}`)}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    metric.status === 'normal' || metric.status === 'good' ? 'bg-green-100 text-green-800' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <p className="text-lg font-bold">{metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span></p>
                <p className={`text-xs ${
                  metric.trend === 'improving' || metric.trend === 'increasing' ? 'text-green-600' :
                  metric.trend === 'decreasing' ? 'text-blue-600' :
                  'text-gray-500'
                }`}>
                  {metric.trend === 'improving' ? '↗ Improving' :
                   metric.trend === 'increasing' ? '↗ Increasing' :
                   metric.trend === 'decreasing' ? '↘ Decreasing' :
                   '→ Stable'}
                </p>
              </div>
            ))}
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
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  <p className="text-sm text-blue-600">{appointment.date} at {appointment.time}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(appointment.id)}
                >
                  View Details
                </Button>
              </div>
            ))}
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={handleViewAllAppointments}
            >
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Medications */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Reminders</CardTitle>
            <CardDescription>Your current medication schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMedications.slice(0, 3).map((med) => (
              <div 
                key={med.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/medications/${med.id}`)}
              >
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage}</p>
                  <p className="text-sm text-blue-600">{med.nextDose}</p>
                </div>
                <Badge 
                  variant={med.status === 'on-time' ? 'default' : 'secondary'}
                  className={
                    med.status === 'on-time' ? 'bg-green-100 text-green-800' :
                    med.status === 'missed' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }
                >
                  {med.status === 'on-time' ? 'On Time' : 
                   med.status === 'missed' ? 'Missed' : 'Upcoming'}
                </Badge>
              </div>
            ))}
            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={handleManageMedications}
            >
              Manage Medications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest health-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/activity/${activity.id}`)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'medication' ? 'bg-blue-100' :
                  activity.type === 'vitals' ? 'bg-green-100' :
                  activity.type === 'exercise' ? 'bg-purple-100' :
                  'bg-yellow-100'
                }`}>
                  <svg className={`w-4 h-4 ${
                    activity.type === 'medication' ? 'text-blue-600' :
                    activity.type === 'vitals' ? 'text-green-600' :
                    activity.type === 'exercise' ? 'text-purple-600' :
                    'text-yellow-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={activity.type === 'medication' ? "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" :
                       activity.type === 'vitals' ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" :
                       activity.type === 'exercise' ? "M13 10V3L4 14h7v7l9-11h-7z" :
                       "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"}
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2"
              onClick={() => handleQuickAction('check-symptoms')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Check Symptoms</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2"
              onClick={() => handleQuickAction('add-medication')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-sm">Add Medication</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2"
              onClick={() => handleQuickAction('log-vitals')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm">Log Vitals</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col space-y-2"
              onClick={() => handleQuickAction('book-appointment')}
            >
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
