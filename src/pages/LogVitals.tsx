import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Activity } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const LogVitals = () => {
  const navigate = useNavigate();
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!bloodPressure.systolic || !bloodPressure.diastolic || !heartRate || !temperature || !weight) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Logging vitals:', {
      bloodPressure,
      heartRate,
      temperature,
      weight,
      notes
    });

    toast({
      title: "Vitals logged",
      description: "Your vital signs have been recorded successfully.",
    });

    // Navigate back to dashboard
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Log Vitals</h1>
          <p className="text-gray-600 mt-1">Record your vital signs</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vital Signs</CardTitle>
          <CardDescription>Enter your current vital measurements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Systolic Blood Pressure (mmHg) *</Label>
              <Input
                type="number"
                placeholder="e.g., 120"
                value={bloodPressure.systolic}
                onChange={(e) => setBloodPressure(prev => ({ ...prev, systolic: e.target.value }))}
              />
            </div>
            <div>
              <Label>Diastolic Blood Pressure (mmHg) *</Label>
              <Input
                type="number"
                placeholder="e.g., 80"
                value={bloodPressure.diastolic}
                onChange={(e) => setBloodPressure(prev => ({ ...prev, diastolic: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Heart Rate (BPM) *</Label>
            <Input
              type="number"
              placeholder="e.g., 72"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
            />
          </div>

          <div>
            <Label>Temperature (°F) *</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 98.6"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>

          <div>
            <Label>Weight (lbs) *</Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g., 150"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Any additional observations or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            <Activity className="mr-2 h-4 w-4" />
            Log Vitals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogVitals; 