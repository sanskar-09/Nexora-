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
import DocumentViewer from './DocumentViewer';
import { toast } from "@/components/ui/use-toast";
import VideoCall from './VideoCall';
import Chat from './Chat';

interface MedicalRecord {
  id: number;
  title: string;
  type: string;
  provider: string;
  date: string;
  status: string;
  attachmentUrl?: string;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  doctor: string;
  role: 'doctor' | 'patient';
}

const Telemedicine = () => {
  const [activeTab, setActiveTab] = useState('consultations');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<MedicalRecord | null>(null);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [userRole, setUserRole] = useState<'doctor' | 'patient'>('patient'); // Default to patient
  
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      type: "Lab Result",
      provider: "Central Medical Lab",
      date: "2024-01-15",
      status: "completed",
      attachmentUrl: "/uploads/sample-cbc-report.pdf"
    },
    {
      id: 2,
      title: "Chest X-Ray",
      type: "Imaging",
      provider: "City Hospital",
      date: "2024-01-10",
      status: "completed",
      attachmentUrl: "/uploads/sample-xray.pdf"
    },
    {
      id: 3,
      title: "Annual Physical Exam",
      type: "Visit Summary",
      provider: "Dr. Smith's Clinic",
      date: "2024-01-05",
      status: "completed",
      attachmentUrl: "/uploads/sample-physical-exam.pdf"
    }
  ]);

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'General Checkup',
      date: '2024-03-20',
      time: '10:00',
      status: 'upcoming',
      doctor: 'Dr. Priya Sharma',
      role: 'patient'
    },
    {
      id: '2',
      title: 'Follow-up Consultation',
      date: '2024-03-21',
      time: '14:30',
      status: 'upcoming',
      doctor: 'Dr. Rajesh Patel',
      role: 'patient'
    }
  ];

  console.log('Telemedicine component rendering');

  const handleUploadRecord = async (file: File, metadata: any) => {
    console.log('Uploading record:', file.name, metadata);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new medical record
      const newRecord: MedicalRecord = {
        id: Date.now(), // Simple ID generation
        title: metadata.title,
        type: metadata.type.split('_').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        provider: metadata.provider,
        date: metadata.date.toISOString().split('T')[0],
        status: "completed",
        attachmentUrl: `/uploads/${file.name}` // Add attachment URL for uploaded files
      };

      // Add to medical records
      setMedicalRecords(prev => [newRecord, ...prev]);
      
      // Close modal and show success toast
      setShowUploadModal(false);
      
      toast({
        title: "Document uploaded successfully",
        description: `${file.name} has been added to your medical records.`,
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedDocument(record);
    setShowDocumentViewer(true);
  };

  const handleDownloadRecord = (record: MedicalRecord) => {
    // Create a blob with sample content for demonstration
    const sampleContent = `Medical Record: ${record.title}
Provider: ${record.provider}
Date: ${record.date}
Type: ${record.type}
Status: ${record.status}

This is a sample medical document. In a real application, this would contain the actual medical data and reports.

Patient Information:
- Document ID: ${record.id}
- Generated: ${new Date().toISOString()}

Note: This is a demonstration document created for the Nexora Healthcare platform.`;

    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${record.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Download completed",
      description: `${record.title} has been downloaded successfully.`,
    });
  };

  const handleStartConsultation = (appointment: Appointment) => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();

    if (appointmentDateTime > now) {
      toast({
        title: "Appointment not started",
        description: "Please wait until the scheduled time.",
        variant: "destructive"
      });
      return;
    }

    setCurrentAppointment(appointment);
    setActiveTab('consultation');
    
    toast({
      title: "Consultation started",
      description: "Your telemedicine session has begun.",
    });
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
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('consultation')}>
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
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.title}</h4>
                        <p className="text-sm text-gray-600">{appointment.doctor}</p>
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
                      <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartConsultation(appointment)}
                        disabled={appointment.status === 'completed'}
                      >
                        {appointment.status === 'upcoming' ? 'Start Consultation' : 'Join Consultation'}
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
                      <Button size="sm" variant="outline" onClick={() => handleViewRecord(record)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownloadRecord(record)}>
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
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{appointment.title}</h4>
                        <p className="text-gray-600">{appointment.doctor}</p>
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
                    <div className="flex items-center space-x-2">
                      <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        disabled={appointment.status === 'completed'}
                        className="ml-2"
                        onClick={() => handleStartConsultation(appointment)}
                      >
                        {appointment.status === 'upcoming' ? 'Start Consultation' : 'Join Consultation'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consultation">
          {currentAppointment ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <VideoCall 
                appointmentId={currentAppointment.id} 
                role={userRole}
              />
              <Chat 
                appointmentId={currentAppointment.id}
                role={userRole}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p>No active consultation</p>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab('consultations')}
                >
                  View Consultations
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Document Viewer */}
      {selectedDocument && (
        <DocumentViewer
          isOpen={showDocumentViewer}
          onClose={() => {
            setShowDocumentViewer(false);
            setSelectedDocument(null);
          }}
          document={selectedDocument}
        />
      )}
    </div>
  );
};

export default Telemedicine;
