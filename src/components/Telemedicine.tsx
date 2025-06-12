
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  Star, 
  Shield,
  FileText,
  Download,
  Eye,
  CalendarPlus,
  CalendarCheck,
  Upload,
  Plus
} from "lucide-react";
import AppointmentScheduler from './AppointmentScheduler';
import UploadRecords from './UploadRecords';

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('consultations');
  const [showUploadModal, setShowUploadModal] = useState(false);

  console.log('Telemedicine component rendering');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist", 
      date: "2024-01-22",
      time: "2:30 PM",
      type: "Phone Consultation",
      status: "pending"
    }
  ];

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Emily Rodriguez",
      specialty: "Internal Medicine",
      rating: 4.9,
      experience: "15+ years",
      available: true,
      price: "$120/session"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Psychiatry",
      rating: 4.8,
      experience: "12+ years", 
      available: true,
      price: "$150/session"
    },
    {
      id: 3,
      name: "Dr. Lisa Thompson",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: "10+ years",
      available: false,
      price: "$100/session"
    }
  ];

  const medicalRecords = [
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      type: "Lab Result",
      provider: "Central Medical Lab",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      type: "Imaging",
      provider: "City Hospital",
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: 3,
      title: "Annual Physical Exam",
      type: "Visit Summary",
      provider: "Dr. Smith's Clinic",
      date: "2024-01-05",
      status: "completed"
    }
  ];

  const handleUploadRecord = async (file: File, metadata: any) => {
    // Simulate upload
    console.log('Uploading record:', file.name, metadata);
    // In a real app, you would upload to a server or cloud storage
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Telemedicine Hub</h1>
          <p className="text-gray-600 mt-2">Access comprehensive virtual healthcare services</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Video className="w-4 h-4 mr-1" />
          Available 24/7
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="consultations" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Consultations</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documents & Files</span>
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Find Doctors</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Video Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">Face-to-face consultation with healthcare professionals</p>
                <Button className="w-full">Start Video Call</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Phone Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">Audio consultation for quick medical advice</p>
                <Button variant="outline" className="w-full">Call Doctor</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Chat Consultation</h3>
                <p className="text-sm text-gray-600 mb-4">Text-based consultation for non-urgent queries</p>
                <Button variant="outline" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Upcoming Consultations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentScheduler />
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Documents & Files</h2>
              <p className="text-gray-600">Manage your medical records and documents</p>
            </div>
            <Button onClick={() => setShowUploadModal(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Upload New Document</span>
            </Button>
          </div>

          {/* Medical Records List */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your uploaded medical documents and records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.title}</h4>
                        <p className="text-sm text-gray-600">{record.type} • {record.provider}</p>
                        <p className="text-xs text-gray-500">{record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{record.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Upload New Document</h3>
                    <Button variant="ghost" onClick={() => setShowUploadModal(false)}>
                      ×
                    </Button>
                  </div>
                  <UploadRecords onUpload={handleUploadRecord} />
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="doctors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>Connect with healthcare professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {availableDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{doctor.rating}</span>
                          </span>
                          <span>{doctor.experience}</span>
                          <span className="font-medium text-blue-600">{doctor.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={doctor.available ? 'default' : 'secondary'}>
                        {doctor.available ? 'Available' : 'Busy'}
                      </Badge>
                      <Button 
                        size="sm" 
                        disabled={!doctor.available}
                        className="ml-2"
                      >
                        Book Consultation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Telemedicine;
