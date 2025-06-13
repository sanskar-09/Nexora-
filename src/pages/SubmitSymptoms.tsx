import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SubmitSymptoms = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [duration, setDuration] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = () => {
    if (!symptoms.trim()) {
      toast({
        title: "Symptoms required",
        description: "Please describe your symptoms to continue.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting symptoms:', {
      symptoms,
      severity,
      duration,
      additionalNotes
    });

    toast({
      title: "Symptoms submitted",
      description: "A healthcare professional will review your symptoms shortly.",
    });

    // Navigate back to dashboard after submission
    navigate('/');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Submit Symptoms</h1>
          <p className="text-gray-600 mt-1">Quickly submit your symptoms for review</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
          <CardDescription>Provide details about your current condition</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>What symptoms are you experiencing?</Label>
            <Textarea
              placeholder="Describe your symptoms in detail..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label>Severity</Label>
            <Select value={severity} onValueChange={(value: 'mild' | 'moderate' | 'severe') => setSeverity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Mild</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="severe">Severe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Duration</Label>
            <Input
              placeholder="How long have you had these symptoms? (e.g., 2 days, 1 week)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <Label>Additional Notes (Optional)</Label>
            <Textarea
              placeholder="Any other relevant information..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Submit for Review
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Warning */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Emergency Warning</h3>
              <p className="text-sm text-red-600">
                If you're experiencing severe symptoms like chest pain, difficulty breathing, or severe bleeding,
                please call emergency services immediately or visit the nearest emergency room.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitSymptoms; 