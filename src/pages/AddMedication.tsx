import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Pill } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AddMedication = () => {
  const navigate = useNavigate();
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = () => {
    if (!medicationName.trim() || !dosage.trim() || !frequency.trim() || !startDate.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Adding medication:', {
      medicationName,
      dosage,
      frequency,
      startDate,
      endDate,
      instructions
    });

    toast({
      title: "Medication added",
      description: "Your medication has been added successfully.",
    });

    // Navigate back to medications page
    navigate('/medications');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Add Medication</h1>
          <p className="text-gray-600 mt-1">Add a new medication to your list</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medication Details</CardTitle>
          <CardDescription>Enter the details of your medication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Medication Name *</Label>
            <Input
              placeholder="Enter medication name"
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
          </div>

          <div>
            <Label>Dosage *</Label>
            <Input
              placeholder="e.g., 500mg, 1 tablet"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>

          <div>
            <Label>Frequency *</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once-daily">Once daily</SelectItem>
                <SelectItem value="twice-daily">Twice daily</SelectItem>
                <SelectItem value="thrice-daily">Three times daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="as-needed">As needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label>End Date (Optional)</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Special Instructions (Optional)</Label>
            <Textarea
              placeholder="e.g., Take with food, Avoid alcohol"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            <Pill className="mr-2 h-4 w-4" />
            Add Medication
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMedication; 