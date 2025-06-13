import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const NewAppointment = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [preferredDoctor, setPreferredDoctor] = useState('');

  const specialties = [
    "General Medicine",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Endocrinology",
    "Gastroenterology",
    "Pediatrics"
  ];

  const handleSubmit = () => {
    if (!specialty || !date || !time || !reason) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Scheduling appointment:', {
      specialty,
      date,
      time,
      reason,
      preferredDoctor
    });

    toast({
      title: "Appointment scheduled",
      description: "Your appointment request has been submitted successfully.",
    });

    // Navigate back to appointments page
    navigate('/appointments');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule Appointment</h1>
          <p className="text-gray-600 mt-1">Book a new medical appointment</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Fill in the details for your appointment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Specialty *</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec.toLowerCase()}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Preferred Date *</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Preferred Time *</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Preferred Doctor (Optional)</Label>
            <Input
              placeholder="Enter doctor's name"
              value={preferredDoctor}
              onChange={(e) => setPreferredDoctor(e.target.value)}
            />
          </div>

          <div>
            <Label>Reason for Visit *</Label>
            <Textarea
              placeholder="Describe the reason for your appointment..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAppointment; 