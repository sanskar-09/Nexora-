import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, addDays, parseISO, isSameDay } from 'date-fns';
import { Video, Phone, Clock, Star, MessageSquare, FileText, Upload, X, Check, AlertCircle, Calendar as CalendarIcon, User, Download, Paperclip, Send, Bell, Settings, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  availability: string[];
  bio: string;
  reviews?: {
    rating: number;
    comment: string;
    date: Date;
  }[];
  imageUrl?: string;
  languages?: string[];
  education?: string[];
  availabilityCalendar?: {
    date: Date;
    slots: string[];
  }[];
  certifications?: string[];
}

interface DoctorReview {
  id: number;
  patientName: string;
  rating: number;
  date: Date;
  comment: string;
}

interface Consultation {
  id: number;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'video' | 'phone';
  notes?: string;
  prescription?: {
    id: number;
    medications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }[];
    instructions: string;
    date: Date;
  };
  chatHistory?: ChatMessage[];
}

interface Prescription {
  id: number;
  medications: Medication[];
  instructions: string;
  date: Date;
  followUpDate?: Date;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface ChatMessage {
  id: number;
  sender: 'doctor' | 'patient';
  message: string;
  timestamp: Date;
  attachmentUrl?: string;
}

const Telemedicine = () => {
  console.log('Telemedicine component rendering'); // Add logging

  useEffect(() => {
    console.log('Telemedicine component mounted');
  }, []);

  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('find');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationDate, setConsultationDate] = useState<Date | undefined>(new Date());
  const [consultationTime, setConsultationTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'video' | 'phone'>('video');
  const [consultationReason, setConsultationReason] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isRecordUploadModalOpen, setIsRecordUploadModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: '',
    policyNumber: '',
    coverageType: ''
  });
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [selectedEmergencyDoctor, setSelectedEmergencyDoctor] = useState<Doctor | null>(null);

  // Add appointments state
  const [appointments, setAppointments] = useState<Consultation[]>([
    {
      id: 1,
      doctorId: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: addDays(new Date(), 2),
      time: "10:00 AM",
      status: 'scheduled',
      type: 'video',
      notes: "Regular checkup for heart condition",
      prescription: {
        id: 1,
        medications: [
          {
            name: "Aspirin",
            dosage: "81mg",
            frequency: "Once daily",
            duration: "30 days"
          }
        ],
        instructions: "Take with food",
        date: new Date()
      }
    },
    {
      id: 2,
      doctorId: 2,
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: addDays(new Date(), 5),
      time: "2:30 PM",
      status: 'scheduled',
      type: 'video',
      notes: "Follow-up for skin condition"
    }
  ]);

  // Add chat messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Add consultation state
  const [isConsultationActive, setIsConsultationActive] = useState(false);
  const [consultationDuration, setConsultationDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isMedicalRecordOpen, setIsMedicalRecordOpen] = useState(false);

  // Add dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalConsultations: 12,
    upcomingAppointments: 3,
    completedAppointments: 8,
    emergencyConsultations: 1,
    averageRating: 4.8,
    totalPrescriptions: 5,
    recentActivity: [
      {
        id: 1,
        type: 'appointment',
        description: 'Appointment scheduled with Dr. Sarah Johnson',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        status: 'completed'
      },
      {
        id: 2,
        type: 'prescription',
        description: 'New prescription received from Dr. Emily Rodriguez',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'pending'
      },
      {
        id: 3,
        type: 'emergency',
        description: 'Emergency consultation with Dr. Michael Chen',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'completed'
      }
    ]
  });

  // Add health metrics
  const [healthMetrics, setHealthMetrics] = useState({
    bloodPressure: { systolic: 120, diastolic: 80 },
    heartRate: 72,
    temperature: 98.6,
    weight: 70,
    lastUpdated: new Date()
  });

  // Add medication reminders
  const [medicationReminders, setMedicationReminders] = useState([
    {
      id: 1,
      medication: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      nextDose: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 hours from now
      status: 'pending'
    },
    {
      id: 2,
      medication: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      nextDose: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
      status: 'pending'
    }
  ]);

  // Add notification state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Your appointment with Dr. Sarah Johnson is in 30 minutes',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'prescription',
      message: 'New prescription available from Dr. Emily Rodriguez',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false
    }
  ]);

  // Add settings state
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
    autoRecord: false
  });

  // Add help state
  const [showHelp, setShowHelp] = useState(false);

  // Add quick actions state
  const [quickActions] = useState([
    {
      id: 1,
      title: 'Book Appointment',
      description: 'Schedule a new consultation',
      icon: CalendarIcon,
      action: () => setActiveTab('find')
    },
    {
      id: 2,
      title: 'Upload Records',
      description: 'Share your medical history',
      icon: Upload,
      action: () => setIsRecordUploadModalOpen(true)
    },
    {
      id: 3,
      title: 'View Prescriptions',
      description: 'Check your medications',
      icon: FileText,
      action: () => setActiveTab('appointments')
    },
    {
      id: 4,
      title: 'Emergency Care',
      description: 'Get immediate assistance',
      icon: AlertCircle,
      action: () => setActiveTab('emergency')
    }
  ]);

  // Add health tips state
  const [healthTips] = useState([
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily',
      icon: '💧'
    },
    {
      id: 2,
      title: 'Regular Exercise',
      description: '30 minutes of moderate activity daily',
      icon: '🏃'
    },
    {
      id: 3,
      title: 'Healthy Diet',
      description: 'Eat a balanced diet rich in fruits and vegetables',
      icon: '🥗'
    }
  ]);

  // Add upcoming reminders state
  const [upcomingReminders] = useState([
    {
      id: 1,
      title: 'Blood Pressure Check',
      time: 'Tomorrow, 9:00 AM',
      type: 'checkup'
    },
    {
      id: 2,
      title: 'Medication Refill',
      time: 'In 3 days',
      type: 'medication'
    },
    {
      id: 3,
      title: 'Annual Checkup',
      time: 'Next week',
      type: 'appointment'
    }
  ]);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      experience: 15,
      availability: ["Mon", "Wed", "Fri"],
      bio: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management. She completed her fellowship at Mayo Clinic and has published numerous research papers on cardiovascular health.",
      reviews: [
        {
          rating: 5,
          comment: "Excellent doctor, very thorough and caring.",
          date: new Date()
        }
      ]
    },
    {
      id: 2,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      rating: 4.8,
      experience: 12,
      availability: ["Mon", "Tue", "Thu"],
      bio: "Dr. Rodriguez is a dermatologist specializing in medical, surgical, and cosmetic dermatology. She has expertise in treating skin conditions like acne, eczema, psoriasis, and skin cancer.",
      reviews: [
        {
          rating: 4,
          comment: "Very knowledgeable and professional.",
          date: new Date()
        }
      ]
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      specialty: "General Medicine",
      rating: 4.7,
      experience: 10,
      availability: ["Tue", "Thu", "Sat"],
      bio: "Dr. Chen practices comprehensive primary care with a focus on preventive medicine and chronic disease management. He is known for his patient-centered approach and clear communication style.",
      imageUrl: "/images/doctors/michael-chen.jpg",
      availabilityCalendar: [
        { date: addDays(new Date(), 2), slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
        { date: addDays(new Date(), 4), slots: ["10:00 AM", "1:00 PM", "4:00 PM"] },
        { date: addDays(new Date(), 6), slots: ["9:30 AM", "11:30 AM", "3:30 PM"] }
      ],
      languages: ["English", "Mandarin"],
      certifications: ["American Board of Family Medicine"]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: 8,
      availability: ["Mon", "Wed", "Fri"],
      bio: "Dr. Wilson is a pediatrician with a special focus on child development and preventive care. He has extensive experience in managing common childhood illnesses and providing comprehensive care for children of all ages."
    },
    {
      id: 5,
      name: "Dr. Lisa Patel",
      specialty: "Neurology",
      rating: 4.8,
      experience: 14,
      availability: ["Tue", "Thu", "Sat"],
      bio: "Dr. Patel is a neurologist specializing in the diagnosis and treatment of neurological disorders. She has particular expertise in treating migraines, epilepsy, and movement disorders."
    }
  ];

  const verifyInsurance = (consultationId: number) => {
    // Logic to verify insurance
    console.log(`Verifying insurance for consultation ${consultationId}`);
    setIsInsuranceModalOpen(false);
  };
  
  const uploadMedicalRecord = (consultationId: number, record: any) => {
    // Logic to upload medical record
    console.log(`Uploading medical record for consultation ${consultationId}`, record);
  };

  // Emergency doctors (subset of doctors who are available now)
  const emergencyDoctors = doctors.slice(0, 3);

  // Add consultation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConsultationActive) {
      timer = setInterval(() => {
        setConsultationDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isConsultationActive]);

  // Handle starting consultation
  const handleStartConsultation = (appointment: Consultation) => {
    setSelectedConsultation(appointment);
    setIsCallActive(true);
    setIsConsultationActive(true);
    setIsChatOpen(true);
    
    // Initialize chat messages for this consultation
    setChatMessages([
      {
        id: 1,
        sender: 'doctor',
        message: `Hello, I'm ${appointment.doctorName}. How can I help you today?`,
        timestamp: new Date()
      }
    ]);

    // Update appointment status
    const updatedAppointments = appointments.map(app => 
      app.id === appointment.id 
        ? { ...app, status: 'in-progress' as const }
        : app
    );
    setAppointments(updatedAppointments);

    toast.success('Consultation started');
  };

  // Handle ending consultation
  const handleEndConsultation = () => {
    if (!selectedConsultation) return;

    setIsConsultationActive(false);
    setIsCallActive(false);
    setConsultationDuration(0);
    setIsRecording(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setIsScreenSharing(false);
    setIsChatOpen(false);
    setIsPrescriptionOpen(false);
    setIsMedicalRecordOpen(false);

    // Update appointment status
    const updatedAppointments = appointments.map(app => 
      app.id === selectedConsultation.id 
        ? { ...app, status: 'completed' as const }
        : app
    );
    setAppointments(updatedAppointments);

    // Add consultation summary to chat
    const summaryMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'doctor',
      message: `Consultation ended. Duration: ${Math.floor(consultationDuration / 60)}:${(consultationDuration % 60).toString().padStart(2, '0')}`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, summaryMessage]);

    toast.success('Consultation ended');
  };

  // Handle sending chat message
  const handleSendMessage = () => {
    if (!chatMessage.trim() || !selectedConsultation) return;

    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'patient',
      message: chatMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate doctor's response after 2 seconds
    setTimeout(() => {
      const doctorResponse: ChatMessage = {
        id: chatMessages.length + 2,
        sender: 'doctor',
        message: "I understand. Let me help you with that.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  // Handle uploading medical record
  const handleUploadMedicalRecord = (file: File) => {
    if (!selectedConsultation) return;

    // Simulate file upload
    console.log('Uploading medical record:', file.name);
    
    // Add upload confirmation to chat
    const uploadMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'patient',
      message: `Uploaded medical record: ${file.name}`,
      timestamp: new Date(),
      attachmentUrl: URL.createObjectURL(file)
    };
    setChatMessages(prev => [...prev, uploadMessage]);

    setIsMedicalRecordOpen(false);
    toast.success('Medical record uploaded successfully');
  };

  // Handle generating prescription
  const handleGeneratePrescription = () => {
    if (!selectedConsultation) return;

    const prescription = {
      id: Date.now(),
      medications: [
        {
          name: "Sample Medication",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "7 days"
        }
      ],
      instructions: "Take with food",
      date: new Date()
    };

    const updatedAppointments = appointments.map(app => 
      app.id === selectedConsultation.id 
        ? { ...app, prescription }
        : app
    );
    setAppointments(updatedAppointments);

    // Add prescription notification to chat
    const prescriptionMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: 'doctor',
      message: "I've generated a prescription for you. You can view it in the prescription tab.",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, prescriptionMessage]);

    setIsPrescriptionOpen(false);
    toast.success('Prescription generated successfully');
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    if (!selectedDoctor || !consultationDate || !consultationTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAppointment: Consultation = {
      id: appointments.length + 1,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: consultationDate,
      time: consultationTime,
      status: 'scheduled',
      type: consultationType,
      notes: consultationReason
    };

    setAppointments(prev => [...prev, newAppointment]);
    setIsBookingModalOpen(false);
    setConsultationReason('');
    setConsultationTime('');

    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      type: 'appointment',
      message: `Appointment scheduled with ${selectedDoctor.name} on ${format(consultationDate, 'MMM dd')} at ${consultationTime}`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [...prev, newNotification]);

    toast.success('Appointment booked successfully');
  };

  // Handle emergency consultation
  const handleEmergencyConsultation = (doctor: Doctor) => {
    setSelectedEmergencyDoctor(doctor);
    setIsEmergencyModalOpen(true);
  };

  // Start emergency consultation
  const startEmergencyConsultation = () => {
    if (!selectedEmergencyDoctor || !emergencyReason) {
      toast.error('Please describe your emergency situation');
      return;
    }

    const newAppointment: Consultation = {
      id: appointments.length + 1,
      doctorId: selectedEmergencyDoctor.id,
      doctorName: selectedEmergencyDoctor.name,
      specialty: selectedEmergencyDoctor.specialty,
      date: new Date(),
      time: format(new Date(), 'h:mm a'),
      status: 'scheduled',
      type: 'video',
      notes: `EMERGENCY: ${emergencyReason}`
    };

    setAppointments(prev => [...prev, newAppointment]);
    setIsEmergencyModalOpen(false);
    setEmergencyReason('');
    setSelectedEmergencyDoctor(null);

    // Add emergency notification
    const newNotification = {
      id: notifications.length + 1,
      type: 'emergency',
      message: `Emergency consultation started with ${selectedEmergencyDoctor.name}`,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [...prev, newNotification]);

    handleStartConsultation(newAppointment);
    toast.error('Emergency consultation started', {
      duration: 5000,
      action: {
        label: 'End',
        onClick: handleEndConsultation
      }
    });
  };

  // Handle rating submission
  const handleRatingSubmit = () => {
    if (!selectedConsultation) return;

    // Update doctor's rating
    const updatedDoctors = doctors.map(doctor => 
      doctor.id === selectedConsultation.doctorId
        ? {
            ...doctor,
            rating: (doctor.rating + rating) / 2,
            reviews: [
              ...(doctor.reviews || []),
              {
                rating,
                comment: reviewComment,
                date: new Date()
              }
            ]
          }
        : doctor
    );

    setIsRatingModalOpen(false);
    setRating(5);
    setReviewComment('');

    toast.success('Thank you for your feedback');
  };

  // Handle notification click
  const handleNotificationClick = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
    toast.info('Notification marked as read');
  };

  // Handle settings update
  const handleSettingsUpdate = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Settings updated successfully');
  };

  // Handle medication reminder
  const handleMedicationReminder = (reminderId: number) => {
    setMedicationReminders(prev => prev.map(reminder =>
      reminder.id === reminderId
        ? { ...reminder, status: 'taken' as const }
        : reminder
    ));
    toast.success('Medication marked as taken');
  };

  // Handle health metrics update
  const handleHealthMetricsUpdate = (metric: keyof typeof healthMetrics, value: any) => {
    setHealthMetrics(prev => ({
      ...prev,
      [metric]: value,
      lastUpdated: new Date()
    }));
    toast.success('Health metrics updated');
  };

  // Handle emergency alert
  const handleEmergencyAlert = () => {
    toast.error('Emergency alert sent to nearby doctors', {
      duration: 5000,
      action: {
        label: 'Cancel',
        onClick: () => toast.info('Emergency alert cancelled')
      }
    });
  };

  try {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Here's your health overview</p>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Notifications</h4>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-2 rounded-lg cursor-pointer ${
                        notification.read ? 'bg-muted' : 'bg-primary/10'
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(notification.timestamp, 'MMM dd, h:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Notifications</Label>
                      <Checkbox
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingsUpdate('notifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Checkbox
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingsUpdate('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Dark Mode</Label>
                      <Checkbox
                        checked={settings.darkMode}
                        onCheckedChange={(checked) => handleSettingsUpdate('darkMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Auto Record</Label>
                      <Checkbox
                        checked={settings.autoRecord}
                        onCheckedChange={(checked) => handleSettingsUpdate('autoRecord', checked)}
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" onClick={() => setShowHelp(!showHelp)}>
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action) => (
            <Card key={action.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <action.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Health Metrics Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>
                Last updated: {format(healthMetrics.lastUpdated, 'MMM dd, h:mm a')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Blood Pressure</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={healthMetrics.bloodPressure.systolic}
                      onChange={(e) => handleHealthMetricsUpdate('bloodPressure', {
                        ...healthMetrics.bloodPressure,
                        systolic: parseInt(e.target.value)
                      })}
                      className="w-20"
                    />
                    <span className="self-center">/</span>
                    <Input
                      type="number"
                      value={healthMetrics.bloodPressure.diastolic}
                      onChange={(e) => handleHealthMetricsUpdate('bloodPressure', {
                        ...healthMetrics.bloodPressure,
                        diastolic: parseInt(e.target.value)
                      })}
                      className="w-20"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
                <div className="space-y-2">
                  <Label>Heart Rate</Label>
                  <Input
                    type="number"
                    value={healthMetrics.heartRate}
                    onChange={(e) => handleHealthMetricsUpdate('heartRate', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">bpm</p>
                </div>
                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Input
                    type="number"
                    value={healthMetrics.temperature}
                    onChange={(e) => handleHealthMetricsUpdate('temperature', parseFloat(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">°F</p>
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <Input
                    type="number"
                    value={healthMetrics.weight}
                    onChange={(e) => handleHealthMetricsUpdate('weight', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reminders</CardTitle>
              <CardDescription>Your health schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {reminder.type === 'checkup' && <User className="h-5 w-5 text-primary" />}
                      {reminder.type === 'medication' && <FileText className="h-5 w-5 text-primary" />}
                      {reminder.type === 'appointment' && <CalendarIcon className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Health Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
              <CardDescription>Daily wellness advice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthTips.map((tip) => (
                  <div key={tip.id} className="flex items-start gap-4 p-3 border rounded-lg">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-medium">{tip.title}</p>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest medical interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.type === 'appointment' && <CalendarIcon className="h-4 w-4 text-primary" />}
                      {activity.type === 'prescription' && <FileText className="h-4 w-4 text-primary" />}
                      {activity.type === 'emergency' && <AlertCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(activity.timestamp, 'MMM dd, h:mm a')}
                      </p>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'secondary' :
                      activity.status === 'pending' ? 'default' :
                      'destructive'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medication Reminders */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Medication Reminders</CardTitle>
            <CardDescription>Upcoming doses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicationReminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{reminder.medication}</p>
                    <p className="text-sm text-muted-foreground">
                      {reminder.dosage} - {reminder.frequency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {format(reminder.nextDose, 'h:mm a')}
                    </p>
                    <Button
                      size="sm"
                      variant={reminder.status === 'pending' ? 'default' : 'secondary'}
                      onClick={() => handleMedicationReminder(reminder.id)}
                      disabled={reminder.status === 'taken'}
                    >
                      {reminder.status === 'pending' ? 'Mark as Taken' : 'Taken'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            variant="destructive"
            className="rounded-full shadow-lg"
            onClick={handleEmergencyAlert}
          >
            <AlertCircle className="h-6 w-6 mr-2" />
            Emergency
          </Button>
        </div>

        {/* Booking Modal */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
              <DialogDescription>
                Schedule a consultation with {selectedDoctor?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={consultationDate ? format(consultationDate, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setConsultationDate(e.target.value ? new Date(e.target.value) : undefined)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Time</Label>
                <Select value={consultationTime} onValueChange={setConsultationTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDoctor?.availabilityCalendar?.find(cal => 
                      isSameDay(cal.date, consultationDate || new Date())
                    )?.slots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Consultation Type</Label>
                <Select value={consultationType} onValueChange={(value: 'video' | 'phone') => setConsultationType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Reason for Visit</Label>
                <Textarea
                  value={consultationReason}
                  onChange={(e) => setConsultationReason(e.target.value)}
                  placeholder="Please describe your symptoms or reason for consultation"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBookAppointment}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Emergency Consultation Modal */}
        <Dialog open={isEmergencyModalOpen} onOpenChange={setIsEmergencyModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Emergency Consultation</DialogTitle>
              <DialogDescription>
                Please describe your emergency situation briefly.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="emergency-reason">Emergency Description</Label>
                <Textarea
                  id="emergency-reason"
                  placeholder="Describe your emergency situation..."
                  value={emergencyReason}
                  onChange={(e) => setEmergencyReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEmergencyModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={startEmergencyConsultation}>
                Start Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Active Consultation Modal */}
        <Dialog open={isConsultationActive} onOpenChange={setIsConsultationActive}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Consultation with {selectedConsultation?.doctorName}</DialogTitle>
              <DialogDescription>
                Duration: {Math.floor(consultationDuration / 60)}:{(consultationDuration % 60).toString().padStart(2, '0')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="aspect-video bg-black rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {isVideoOff ? "Video Off" : "Video Feed"}
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <X className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <X className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isScreenSharing ? "default" : "outline"}
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleEndConsultation}
                  >
                    End Call
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Button
                    variant={isChatOpen ? "default" : "outline"}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button
                    variant={isPrescriptionOpen ? "default" : "outline"}
                    onClick={() => setIsPrescriptionOpen(!isPrescriptionOpen)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Prescription
                  </Button>
                  <Button
                    variant={isMedicalRecordOpen ? "default" : "outline"}
                    onClick={() => setIsMedicalRecordOpen(!isMedicalRecordOpen)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Records
                  </Button>
                </div>
                {isChatOpen && (
                  <div className="border rounded-lg p-4 h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-2 ${
                              message.sender === 'patient'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70">
                              {format(message.timestamp, 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {isPrescriptionOpen && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Prescription</h3>
                    {selectedConsultation?.prescription ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Medications</h4>
                          {selectedConsultation.prescription.medications.map((med, index) => (
                            <div key={index} className="mt-2">
                              <p><strong>{med.name}</strong> - {med.dosage}</p>
                              <p className="text-sm text-muted-foreground">
                                {med.frequency} for {med.duration}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-medium">Instructions</h4>
                          <p className="text-sm">{selectedConsultation.prescription.instructions}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">No prescription generated yet</p>
                        <Button onClick={handleGeneratePrescription}>
                          Generate Prescription
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                {isMedicalRecordOpen && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Medical Records</h3>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your medical records here or click to browse
                        </p>
                        <Input
                          type="file"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleUploadMedicalRecord(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help Dialog */}
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Help & Support</DialogTitle>
              <DialogDescription>
                Learn how to use the telemedicine platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Quick Start Guide</h4>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Book appointments through the "Find Doctor" tab</li>
                  <li>View and manage your appointments in "My Appointments"</li>
                  <li>Access emergency care through the "Emergency" tab</li>
                  <li>Track your health metrics and medication schedule</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Contact our support team at support@telemedicine.com or call +1-800-HELP-NOW
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  } catch (error) {
    console.error('Error rendering Telemedicine component:', error);
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>
              There was an error loading the telemedicine component. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
};

export default Telemedicine;