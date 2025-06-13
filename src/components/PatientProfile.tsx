import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User, Phone, Mail, MapPin, Calendar as CalendarIcon, Edit, Save, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { healthDataService } from '@/services/api';

interface PatientInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
}

const PatientProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: parseISO("1985-06-15"),
    address: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "(555) 987-6543",
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001"
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!patientInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!patientInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!patientInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(patientInfo.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!patientInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Remove mock delay
      await healthDataService.addHealthData(patientInfo); // Use actual service
      
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data if needed
  };

  const updateField = (field: keyof PatientInfo, value: any) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addItem = (field: 'allergies' | 'medications' | 'medicalConditions', item: string) => {
    if (item.trim()) {
      setPatientInfo(prev => ({
        ...prev,
        [field]: [...prev[field], item.trim()]
      }));
    }
  };

  const removeItem = (field: 'allergies' | 'medications' | 'medicalConditions', index: number) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal and medical information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={patientInfo.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    disabled={!isEditing}
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={patientInfo.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    disabled={!isEditing}
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    disabled={!isEditing}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={patientInfo.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    disabled={!isEditing}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <span>{format(patientInfo.dateOfBirth, 'MMMM d, yyyy')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={patientInfo.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={patientInfo.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={patientInfo.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={patientInfo.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>Your medical history and current conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Blood Type</Label>
                <Select
                  value={patientInfo.bloodType}
                  onValueChange={(value) => updateField('bloodType', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Allergies</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {patientInfo.allergies.map((allergy, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {allergy}
                      {isEditing && (
                        <button
                          onClick={() => removeItem('allergies', index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add allergy"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addItem('allergies', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Current Medications</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {patientInfo.medications.map((medication, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {medication}
                      {isEditing && (
                        <button
                          onClick={() => removeItem('medications', index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Add medication"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('medications', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Medical Conditions</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {patientInfo.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {condition}
                      {isEditing && (
                        <button
                          onClick={() => removeItem('medicalConditions', index)}
                          className="ml-2 text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Add medical condition"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('medicalConditions', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Person to contact in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={patientInfo.emergencyContactName}
                  onChange={(e) => updateField('emergencyContactName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={patientInfo.emergencyContactPhone}
                  onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
              <CardDescription>Your health insurance details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={patientInfo.insurance.provider}
                  onChange={(e) => updateField('insurance', { ...patientInfo.insurance, provider: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  value={patientInfo.insurance.policyNumber}
                  onChange={(e) => updateField('insurance', { ...patientInfo.insurance, policyNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupNumber">Group Number</Label>
                <Input
                  id="groupNumber"
                  value={patientInfo.insurance.groupNumber}
                  onChange={(e) => updateField('insurance', { ...patientInfo.insurance, groupNumber: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;
