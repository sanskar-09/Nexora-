import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, Search, Clock, Thermometer, Heart, Brain } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description: string;
}

const SymptomsChecker = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Mock symptoms database
  const commonSymptoms = [
    { id: '1', name: 'Fever', category: 'General', severity: 'moderate', duration: '', description: 'Elevated body temperature above normal range' },
    { id: '2', name: 'Headache', category: 'Neurological', severity: 'mild', duration: '', description: 'Pain in the head or upper neck' },
    { id: '3', name: 'Cough', category: 'Respiratory', severity: 'mild', duration: '', description: 'Sudden expulsion of air from the lungs' },
    { id: '4', name: 'Fatigue', category: 'General', severity: 'mild', duration: '', description: 'Feeling of tiredness or exhaustion' },
    { id: '5', name: 'Shortness of Breath', category: 'Respiratory', severity: 'severe', duration: '', description: 'Difficulty breathing or breathlessness' },
    { id: '6', name: 'Chest Pain', category: 'Cardiac', severity: 'severe', duration: '', description: 'Pain or discomfort in the chest area' },
    { id: '7', name: 'Nausea', category: 'Digestive', severity: 'moderate', duration: '', description: 'Feeling of sickness with an urge to vomit' },
    { id: '8', name: 'Dizziness', category: 'Neurological', severity: 'moderate', duration: '', description: 'Feeling of lightheadedness or unsteadiness' }
  ];

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSymptomSelect = (symptom: Symptom) => {
    if (!selectedSymptoms.find(s => s.id === symptom.id)) {
      setSelectedSymptoms([...selectedSymptoms, { ...symptom, duration }]);
    }
  };

  const handleSymptomRemove = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to continue.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Submitting symptoms:', {
      symptoms: selectedSymptoms,
      severity,
      additionalNotes
    });

    toast({
      title: "Symptoms submitted",
      description: "A healthcare professional will review your symptoms shortly.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Symptoms Checker</h1>
          <p className="text-gray-600 mt-1">Check your symptoms and get preliminary medical advice</p>
        </div>
        <Button variant="outline" onClick={() => window.history.back()}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Symptom Search and Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Search Symptoms</CardTitle>
            <CardDescription>Find and select your symptoms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search symptoms..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredSymptoms.map(symptom => (
                <div
                  key={symptom.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSymptomSelect(symptom)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      symptom.category === 'General' ? 'bg-blue-100' :
                      symptom.category === 'Respiratory' ? 'bg-green-100' :
                      symptom.category === 'Cardiac' ? 'bg-red-100' :
                      'bg-purple-100'
                    }`}>
                      {symptom.category === 'General' ? <Thermometer className="h-4 w-4" /> :
                       symptom.category === 'Respiratory' ? <Lungs className="h-4 w-4" /> :
                       symptom.category === 'Cardiac' ? <Heart className="h-4 w-4" /> :
                       <Brain className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{symptom.name}</p>
                      <p className="text-sm text-gray-500">{symptom.category}</p>
                    </div>
                  </div>
                  <Badge className={
                    symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                    symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {symptom.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Symptoms and Details */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Symptoms</CardTitle>
            <CardDescription>Review and provide additional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSymptoms.length > 0 ? (
              <>
                <div className="space-y-3">
                  {selectedSymptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{symptom.name}</p>
                        <p className="text-sm text-gray-500">{symptom.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSymptomRemove(symptom.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Overall Severity</Label>
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
                    <Label>Duration of Symptoms</Label>
                    <Input
                      placeholder="e.g., 2 days, 1 week"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Additional Notes</Label>
                    <Textarea
                      placeholder="Describe your symptoms in detail..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </div>

                  <Button className="w-full" onClick={handleSubmit}>
                    Submit Symptoms
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No symptoms selected</p>
                <p className="text-sm text-gray-400 mt-1">Search and select your symptoms from the list</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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

export default SymptomsChecker; 