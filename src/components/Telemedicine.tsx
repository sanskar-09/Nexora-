import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, addDays, parseISO } from 'date-fns';
import { Video, Phone, Calendar, Clock, User, MessageSquare, X } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: string[];
  imageUrl?: string;
  bio: string;
}

interface Consultation {
  id: number;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'video' | 'phone';
  notes?: string;
}

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationDate, setConsultationDate] = useState<Date | undefined>(new Date());
  const [consultationTime, setConsultationTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'video' | 'phone'>('video');
  const [consultationReason, setConsultationReason] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Sample doctors data
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: "15 years",
      availability: ["Mon", "Wed", "Fri"],
      bio: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management. She completed her fellowship at Mayo Clinic and has published numerous research papers on cardiovascular health."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Medicine",
      rating: 4.7,
      experience: "10 years",
      availability: ["Tue", "Thu", "Sat"],
      bio: "Dr. Chen practices comprehensive primary care with a focus on preventive medicine and chronic disease management. He is known for his patient-centered approach and clear communication style."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      rating: 4.8,
      experience: "12 years",
      availability: ["Mon", "Tue", "Thu"],
      bio: "Dr. Rodriguez is a dermatologist specializing in medical, surgical, and cosmetic dermatology. She has expertise in treating skin conditions like acne, eczema, psoriasis, and skin cancer."
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedics",
      rating: 4.6,
      experience: "20 years",
      availability: ["Wed", "Fri", "Sat"],
      bio: "Dr. Wilson is an orthopedic surgeon with expertise in sports medicine, joint replacement, and minimally invasive procedures. He has worked with professional athletes and has a special interest in knee and shoulder injuries."
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Endocrinology",
      rating: 4.8,
      experience: "14 years",
      availability: ["Mon", "Wed", "Fri"],
      bio: "Dr. Thompson specializes in hormonal disorders including diabetes, thyroid conditions, and metabolic disorders. She takes a holistic approach to treatment, focusing on lifestyle modifications alongside medical interventions."
    },
    {
      id: 6,
      name: "Dr. Robert Garcia",
      specialty: "Neurology",
      rating: 4.9,
      experience: "18 years",
      availability: ["Tue", "Thu", "Sat"],
      bio: "Dr. Garcia is a neurologist with expertise in headache disorders, multiple sclerosis, and neurodegenerative diseases. He combines the latest research with compassionate care to help patients manage complex neurological conditions."
    }
  ];

  // Sample consultations data
  const [consultations, setConsultations] = useState<Consultation[]>([
    {
      id: 1,
      doctorId: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: addDays(new Date(), 2),
      time: "10:00 AM",
      status: 'scheduled',
      type: 'video'
    },
    {
      id: 2,
      doctorId: 3,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: addDays(new Date(), 5),
      time: "2:30 PM",
      status: 'scheduled',
      type: 'phone'
    },
    {
      id: 3,
      doctorId: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: parseISO('2023-12-15'),
      time: "11:00 AM",
      status: 'completed',
      type: 'video',
      notes: "Follow-up in 3 months. Continue current medication regimen."
    }
  ]);

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM"
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const bookConsultation = () => {
    if (!selectedDoctor || !consultationDate || !consultationTime) return;

    const newConsultation: Consultation = {
      id: consultations.length + 1,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: consultationDate,
      time: consultationTime,
      status: 'scheduled',
      type: consultationType,
      notes: consultationReason
    };

    setConsultations([...consultations, newConsultation]);
    setIsBookingModalOpen(false);
    setActiveTab('upcoming');
    resetBookingForm();
  };

  const resetBookingForm = () => {
    setSelectedDoctor(null);
    setConsultationDate(new Date());
    setConsultationTime('');
    setConsultationType('video');
    setConsultationReason('');
  };

  const cancelConsultation = (id: number) => {
    setConsultations(consultations.map(consultation => 
      consultation.id === id ? { ...consultation, status: 'cancelled' } : consultation
    ));
  };

  const startConsultation = (consultation: Consultation) => {
    setIsCallActive(true);
    setSelectedDoctor(doctors.find(d => d.id === consultation.doctorId) || null);
  };

  const endConsultation = () => {
    setIsCallActive(false);
  };

  const upcomingConsultations = consultations.filter(c => c.status === 'scheduled');
  const pastConsultations = consultations.filter(c => c.status === 'completed' || c.status === 'cancelled');

  if (isCallActive && selectedDoctor) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="bg-gray-900 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{selectedDoctor.name}</h3>
              <p className="text-gray-400 text-sm">{selectedDoctor.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <MessageSquare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800" onClick={endConsultation}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gray-800">
          <div className="relative w-full max-w-4xl aspect-video bg-gray-700 rounded-lg overflow-hidden">
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-32 h-32 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 flex justify-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-gray-700 text-white">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-gray-800 hover:bg-gray-700 text-white">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="destructive" size="icon" className="rounded-full" onClick={endConsultation}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Telemedicine</h1>
          <p className="text-gray-600 mt-1">Connect with healthcare providers virtually</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find">Find Doctors</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Consultations</TabsTrigger>
          <TabsTrigger value="history">Consultation History</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find a Healthcare Provider</CardTitle>
              <CardDescription>Search for specialists available for virtual consultations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search by name or specialty</Label>
                  <Input 
                    id="search" 
                    placeholder="e.g., Dr. Smith or Cardiology" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <Label htmlFor="specialty">Filter by specialty</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{doctor.name}</h3>
                              <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">{doctor.rating} ★</Badge>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-medium">Experience:</span> {doctor.experience}</p>
                            <p><span className="font-medium">Available:</span> {doctor.availability.join(', ')}</p>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>
                          <div className="mt-3">
                            <Button 
                              onClick={() => handleDoctorSelect(doctor)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Book Consultation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No doctors found matching your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingConsultations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{consultation.doctorName}</CardTitle>
                        <CardDescription>{consultation.specialty}</CardDescription>
                      </div>
                      <Badge className={consultation.type === 'video' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                        {consultation.type === 'video' ? 'Video Call' : 'Phone Call'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{format(consultation.date, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{consultation.time}</span>
                      </div>
                      {consultation.notes && (
                        <div className="pt-2">
                          <span className="text-sm font-medium">Reason:</span>
                          <p className="text-sm text-gray-600 mt-1">{consultation.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 pt-4">
                        {new Date(consultation.date).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 && (
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => startConsultation(consultation)}
                          >
                            Join {consultation.type === 'video' ? 'Video' : 'Call'}
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => cancelConsultation(consultation.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">You have no upcoming consultations.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setActiveTab('find')}
                >
                  Find a Doctor
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {pastConsultations.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Past Consultations</CardTitle>
                <CardDescription>Your consultation history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastConsultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{consultation.doctorName}</TableCell>
                        <TableCell>{consultation.specialty}</TableCell>
                        <TableCell>
                          {format(consultation.date, 'MMM d, yyyy')} at {consultation.time}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {consultation.type === 'video' ? 'Video' : 'Phone'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={consultation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">You have no past consultations.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book a Consultation</DialogTitle>
            <DialogDescription>
              {selectedDoctor ? `Schedule a virtual consultation with ${selectedDoctor.name}` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDoctor && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{selectedDoctor.name}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="consultationType">Consultation Type</Label>
              <Select value={consultationType} onValueChange={(value: 'video' | 'phone') => setConsultationType(value)}>
                <SelectTrigger id="consultationType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="consultationTime">Preferred Time</Label>
              <Select value={consultationTime} onValueChange={setConsultationTime}>
                <SelectTrigger id="consultationTime">
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="consultationReason">Reason for Consultation</Label>
              <Textarea 
                id="consultationReason" 
                placeholder="Briefly describe your symptoms or reason for the consultation"
                value={consultationReason}
                onChange={(e) => setConsultationReason(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
            <Button onClick={bookConsultation}>Book Appointment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Telemedicine;