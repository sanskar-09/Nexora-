
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
    'Body aches', 'Fatigue', 'Nausea', 'Vomiting', 'Diarrhea',
    'Chest pain', 'Shortness of breath', 'Dizziness', 'Rash', 'Joint pain'
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    }
  };

  const analyzeSymptoms = () => {
    // Simulate AI analysis
    const mockAnalysis = {
      condition: "Common Cold",
      confidence: 85,
      severity: "Mild",
      recommendations: [
        "Rest and stay hydrated",
        "Consider over-the-counter pain relievers",
        "Monitor symptoms for 3-5 days",
        "Consult a doctor if symptoms worsen"
      ],
      urgency: "low",
      similarConditions: ["Seasonal Allergies", "Viral Upper Respiratory Infection"]
    };
    setAnalysis(mockAnalysis);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
        <p className="text-gray-600">Describe your symptoms for personalized health insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Your Symptoms</CardTitle>
            <CardDescription>Choose all symptoms you're currently experiencing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox 
                    id={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                  />
                  <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label>Symptom Severity</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mild">Mild - Barely noticeable</SelectItem>
                    <SelectItem value="moderate">Moderate - Uncomfortable but manageable</SelectItem>
                    <SelectItem value="severe">Severe - Significantly impacting daily activities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="How long have you had these symptoms?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">A few hours</SelectItem>
                    <SelectItem value="1-2days">1-2 days</SelectItem>
                    <SelectItem value="3-7days">3-7 days</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="longer">More than 2 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additional">Additional Information</Label>
                <Textarea 
                  id="additional"
                  placeholder="Describe any other symptoms or relevant details..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={analyzeSymptoms}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={selectedSymptoms.length === 0}
              >
                Analyze Symptoms
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered health insights based on your symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{analysis.condition}</h3>
                  <Badge className="bg-blue-100 text-blue-800">
                    {analysis.confidence}% Confidence
                  </Badge>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.urgency === 'low' ? 'bg-green-500' : 
                      analysis.urgency === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">Severity: {analysis.severity}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Similar Conditions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.similarConditions.map((condition: string, index: number) => (
                      <Badge key={index} variant="outline">{condition}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. 
                    Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">Save Report</Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Book Consultation</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">Select your symptoms to get started with the analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;
