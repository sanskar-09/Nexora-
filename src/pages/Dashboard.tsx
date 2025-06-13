import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  FileText, 
  Bell, 
  Search,
  Plus,
  Video,
  MessageSquare,
  FileUp,
  Activity,
  ChevronRight,
  Star,
  AlertCircle
} from "lucide-react";
import { format, parseISO, addDays, isToday, isTomorrow } from 'date-fns';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  type: 'video' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'alert';
  read: boolean;
  date: Date;
}

interface HealthMetric {
  id: number;
  name: string;
  value: string;
  unit: string;
  date: Date;
  normalRange?: string;
  status: 'normal' | 'abnormal' | 'critical';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);

  // Mock data for appointments
  useEffect(() => {
    setAppointments([
      {
        id: '1',
        patientName: 'John Doe',
        doctorName: 'Dr. Priya Sharma',
        date: new Date(),
        time: '10:00 AM',
        type: 'video',
        status: 'scheduled'
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        doctorName: 'Dr. Rajesh Patel',
        date: addDays(new Date(), 1),
        time: '2:30 PM',
        type: 'in-person',
        status: 'scheduled'
      },
      {
        id: '3',
        patientName: 'Robert Johnson',
        doctorName: 'Dr. Ananya Gupta',
        date: addDays(new Date(), 2),
        time: '11:15 AM',
        type: 'video',
        status: 'scheduled'
      }
    ]);

    setNotifications([
      {
        id: '1',
        title: 'Appointment Reminder',
        message: 'You have a video consultation with Dr. Priya Sharma in 30 minutes',
        type: 'appointment',
        read: false,
        date: new Date()
      },
      {
        id: '2',
        title: 'Test Results Available',
        message: 'Your blood test results are now available',
        type: 'alert',
        read: false,
        date: new Date()
      },
      {
        id: '3',
        title: 'Prescription Update',
        message: 'Your prescription has been updated',
        type: 'reminder',
        read: true,
        date: new Date()
      }
    ]);

    setHealthMetrics([
      {
        id: 1,
        name: 'Blood Pressure',
        value: '120/80',
        unit: 'mmHg',
        date: new Date(),
        normalRange: '90-120/60-80',
        status: 'normal'
      },
      {
        id: 2,
        name: 'Heart Rate',
        value: '72',
        unit: 'bpm',
        date: new Date(),
        normalRange: '60-100',
        status: 'normal'
      },
      {
        id: 3,
        name: 'Blood Sugar',
        value: '95',
        unit: 'mg/dL',
        date: new Date(),
        normalRange: '70-100',
        status: 'normal'
      }
    ]);
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-appointment':
        navigate('/appointments/new');
        break;
      case 'video-consultation':
        navigate('/consultation/new');
        break;
      case 'upload-records':
        navigate('/records/upload');
        break;
      case 'view-metrics':
        navigate('/health-metrics');
        break;
      default:
        break;
    }
  };

  const handleAppointmentClick = (appointmentId: string) => {
    navigate(`/appointments/${appointmentId}`);
  };

  const handleNotificationClick = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'reminder':
        return <Bell className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatAppointmentDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your overview</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleQuickAction('new-appointment')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">New Appointment</h3>
                <p className="text-sm text-gray-500">Schedule a consultation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleQuickAction('video-consultation')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Video Consultation</h3>
                <p className="text-sm text-gray-500">Start a video call</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleQuickAction('upload-records')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <FileUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Upload Records</h3>
                <p className="text-sm text-gray-500">Share medical documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleQuickAction('view-metrics')}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-full">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Health Metrics</h3>
                <p className="text-sm text-gray-500">View your vitals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleAppointmentClick(appointment.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {appointment.type === 'video' ? (
                        <Video className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-500">
                        {formatAppointmentDate(appointment.date)} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusBadgeColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(notification.date, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
            <CardDescription>Your recent vital signs and measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {healthMetrics.map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{metric.name}</h4>
                        <p className="text-2xl font-bold mt-2">
                          {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Normal range: {metric.normalRange}
                        </p>
                      </div>
                      <Badge className={getStatusBadgeColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 