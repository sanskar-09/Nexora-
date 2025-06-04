import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import telemedicineService from "@/services/telemedicineService";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  location: string;
  type: 'in-person' | 'video' | 'phone';
}

const AppointmentScheduler = () => {
  // Custom colors for different appointment types
  const appointmentColors = {
    'in-person': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: 'In-Person Visit'
    },
    'video': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      label: 'Video Consultation'
    },
    'phone': {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      label: 'Phone Consultation'
    }
  };

  // Custom status colors
  const statusColors = {
    'scheduled': {
      bg: 'bg-green-100',
      text: 'text-green-800'
    },
    'cancelled': {
      bg: 'bg-red-100',
      text: 'text-red-800'
    },
    'completed': {
      bg: 'bg-blue-100',
      text: 'text-blue-800'
    }
  };

  const { toast, dismiss } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedAppointmentToReschedule, setSelectedAppointmentToReschedule] = useState<Appointment | null>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('in-person');
  const [appointmentNotes, setAppointmentNotes] = useState<string>('');

  // Initial appointments data
  const initialAppointments: Appointment[] = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: parseISO("2024-01-15"),
      time: "10:00 AM",
      status: 'scheduled',
      location: "Main Hospital, Room 305",
      type: 'in-person'
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: parseISO("2024-01-20"),
      time: "2:30 PM",
      status: 'scheduled',
      location: "Medical Center, Floor 2",
      type: 'in-person'
    },
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: addDays(new Date(), 5),
      time: "11:15 AM",
      status: 'scheduled',
      location: "Virtual Appointment",
      type: 'video'
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  // Helper functions
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(app => isSameDay(app.date, date));
  };

  const availableDoctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", availableDays: [1, 3, 5] },
    { id: 2, name: "Dr. Michael Chen", specialty: "General Medicine", availableDays: [0, 2, 4] },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatology", availableDays: [1, 2, 4] },
    { id: 4, name: "Dr. James Wilson", specialty: "Orthopedics", availableDays: [0, 3, 5] },
    { id: 5, name: "Dr. Lisa Thompson", specialty: "Endocrinology", availableDays: [2, 4, 5] },
    { id: 6, name: "Dr. Robert Garcia", specialty: "Neurology", availableDays: [1, 3, 5] },
    { id: 7, name: "Dr. Jennifer Lee", specialty: "Psychiatry", availableDays: [0, 2, 4] },
    { id: 8, name: "Dr. David Kim", specialty: "Pulmonology", availableDays: [1, 3, 5] }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM"
  ];

  const bookAppointment = () => {
    if (!date || !selectedTime || !selectedDoctor) return;

    const doctor = availableDoctors.find(doc => doc.name === selectedDoctor);
    if (!doctor) return;

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      doctorName: selectedDoctor,
      specialty: doctor.specialty,
      date: date,
      time: selectedTime,
      status: 'scheduled',
      notes: appointmentNotes,
      location: selectedType === 'in-person' ? "Main Hospital, Room 305" : "Virtual Appointment",
      type: selectedType
    };

    setAppointments([...appointments, newAppointment]);
    setSelectedTime('');
    setAppointmentNotes('');
  };

  const cancelAppointment = async (id: number) => {
    try {
      // First update local state
      setAppointments(prevAppointments => prevAppointments.map(app => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      ));

      // Then make API call to server
      await telemedicineService.deleteAppointment(id.toString());
      
      // Show success message
      const successToast = toast({
        title: 'Success',
        description: 'Appointment cancelled successfully',
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss(successToast.id);
          }
        },
        duration: 3000
      });
      
      // Automatically dismiss after 3 seconds
      setTimeout(() => {
        dismiss(successToast.id);
      }, 3000);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      // Show error message
      const errorToast = toast({
        title: 'Error',
        description: 'Failed to cancel appointment. Please try again.',
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss(errorToast.id);
          }
        },
        duration: 3000
      });
      
      // Automatically dismiss after 3 seconds
      setTimeout(() => {
        dismiss(errorToast.id);
      }, 3000);
      
      // Revert local state if API call fails
      setAppointments(prevAppointments => prevAppointments.map(app => 
        app.id === id ? { ...app, status: 'scheduled' } : app
      ));
    }
  };

  const handleRescheduleClick = (appointment: Appointment) => {
    setSelectedAppointmentToReschedule(appointment);
    setRescheduleDialogOpen(true);
  };

  const rescheduleAppointment = async (id: number, newDate: Date, newTime: string) => {
    try {
      // First update local state
      setAppointments(prevAppointments => prevAppointments.map(app => 
        app.id === id ? { ...app, date: newDate, time: newTime } : app
      ));

      // Then make API call to server
      await telemedicineService.updateAppointment(
        id.toString(),
        { dateTime: new Date(newDate.toISOString().split('T')[0] + 'T' + newTime),
          status: 'scheduled' }
      );

      // Close dialog and show success message
      setRescheduleDialogOpen(false);
      // Show success message
      const successToast = toast({
        title: 'Success',
        description: 'Appointment rescheduled successfully',
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss(successToast.id);
          }
        },
        duration: 3000
      });
      
      // Automatically dismiss after 3 seconds
      setTimeout(() => {
        dismiss(successToast.id);
      }, 3000);
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      // Show error message
      const errorToast = toast({
        title: 'Error',
        description: 'Failed to reschedule appointment. Please try again.',
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            dismiss(errorToast.id);
          }
        },
        duration: 3000
      });
      
      // Automatically dismiss after 3 seconds
      setTimeout(() => {
        dismiss(errorToast.id);
      }, 3000);
      // Revert local state if API call fails
      setAppointments(prevAppointments => prevAppointments.map(app => 
        app.id === id ? { ...app, date: selectedAppointmentToReschedule?.date || new Date(), 
                         time: selectedAppointmentToReschedule?.time || '' } : app
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Scheduler</h1>
          <p className="text-gray-600 mt-1">Book and manage your medical appointments</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="book">Book Appointment</TabsTrigger>
          <TabsTrigger value="history">Appointment History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments
              .filter(app => app.status === 'scheduled')
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(appointment => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-4xl font-bold text-blue-600">{appointment.doctorName}</CardTitle>
                        <CardDescription className="text-blue-400">Book and manage your medical appointments</CardDescription>
                      </div>
                      <Badge className={`${appointmentColors[appointment.type].bg} ${appointmentColors[appointment.type].text} font-semibold`}>
                        {appointmentColors[appointment.type].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{appointment.doctorName} - {appointment.specialty}</p>
                          <p className="text-sm text-gray-500">
                            {format(appointment.date, 'MMMM d, yyyy')} at {appointment.time}
                          </p>
                        </div>
                        <Badge className={`${statusColors[appointment.status].bg} ${statusColors[appointment.status].text} font-semibold`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Location:</span>
                        <p className="text-sm text-gray-600">{appointment.location}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Type:</span>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Notes:</span>
                        <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-300"
                        onClick={() => {
                          setSelectedAppointmentToReschedule(appointment);
                          setRescheduleDialogOpen(true);
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
                        onClick={() => cancelAppointment(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="book" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-blue-600">Book Appointment</CardTitle>
              <CardDescription className="text-blue-400">Book a new appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDoctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={selectedType} onValueChange={(value) => setSelectedType(value as 'in-person' | 'video' | 'phone')}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium">Notes:</span>
                  <textarea 
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                    className="w-full h-20 p-2 border rounded-md"
                  />
                </div>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={bookAppointment}
                  disabled={!date || !selectedTime || !selectedDoctor}
                >
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-blue-600">Appointment History</CardTitle>
              <CardDescription className="text-blue-400">View your past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter(app => app.status === 'completed' || app.status === 'cancelled')
                  .map(appointment => (
                    <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{appointment.doctorName} - {appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {format(appointment.date, 'MMMM d, yyyy')} at {appointment.time}
                        </p>
                      </div>
                      <Badge className={`${statusColors[appointment.status].bg} ${statusColors[appointment.status].text} font-semibold`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                {appointments.filter(app => app.status === 'completed' || app.status === 'cancelled').length === 0 && (
                  <p className="text-center text-gray-500">No appointment history available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentScheduler;