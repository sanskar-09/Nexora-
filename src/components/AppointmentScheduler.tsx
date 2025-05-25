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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'in-person' | 'video' | 'phone'>('in-person');
  const [appointmentNotes, setAppointmentNotes] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([
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
  ]);

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

  const cancelAppointment = (id: number) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'cancelled' } : app
    ));
  };

  const rescheduleAppointment = (id: number) => {
    // Implementation for rescheduling would go here
    console.log("Reschedule appointment", id);
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(app => isSameDay(app.date, date));
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
                        <CardTitle>{appointment.doctorName}</CardTitle>
                        <CardDescription>{appointment.specialty}</CardDescription>
                      </div>
                      <Badge className={appointment.type === 'video' ? 'bg-blue-100 text-blue-800' : 
                                        appointment.type === 'phone' ? 'bg-purple-100 text-purple-800' : 
                                        'bg-green-100 text-green-800'}>
                        {appointment.type === 'video' ? 'Video Call' : 
                         appointment.type === 'phone' ? 'Phone Call' : 'In-Person'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Date & Time:</span>
                        <span className="text-sm">
                          {format(appointment.date, 'MMMM d, yyyy')} at {appointment.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Location:</span>
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                      {appointment.notes && (
                        <div className="pt-2">
                          <span className="text-sm font-medium">Notes:</span>
                          <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => rescheduleAppointment(appointment.id)}
                        >
                          Reschedule
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          {appointments.filter(app => app.status === 'scheduled').length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">You have no upcoming appointments.</p>
                <Button className="mt-4" onClick={() => document.getElementById('book-tab')?.click()}>
                  Book an Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="book" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Doctor</CardTitle>
                <CardDescription>Choose your preferred date and doctor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger id="doctor">
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

                <div className="space-y-1">
                  <Label>Appointment Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={{
                      before: new Date(),
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Complete your appointment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="time">Time Slot</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time">
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

                <div className="space-y-1">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select value={selectedType} onValueChange={(value: 'in-person' | 'video' | 'phone') => setSelectedType(value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person Visit</SelectItem>
                      <SelectItem value="video">Video Consultation</SelectItem>
                      <SelectItem value="phone">Phone Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Add any notes or concerns for your doctor"
                    value={appointmentNotes}
                    onChange={(e) => setAppointmentNotes(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full mt-4" 
                  onClick={bookAppointment}
                  disabled={!date || !selectedTime || !selectedDoctor}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>

          {date && (
            <Card>
              <CardHeader>
                <CardTitle>Appointments on {format(date, 'MMMM d, yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getAppointmentsForDate(date).length > 0 ? (
                    getAppointmentsForDate(date).map(app => (
                      <div key={app.id} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{app.time} - {app.doctorName}</p>
                          <p className="text-sm text-gray-500">{app.specialty}</p>
                        </div>
                        <Badge className={app.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
                                          app.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                          'bg-gray-100 text-gray-800'}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No appointments scheduled for this date.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>View your past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments
                  .filter(app => app.status === 'completed' || app.status === 'cancelled')
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .map(appointment => (
                    <div key={appointment.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{appointment.doctorName} - {appointment.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {format(appointment.date, 'MMMM d, yyyy')} at {appointment.time}
                        </p>
                      </div>
                      <Badge className={appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
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