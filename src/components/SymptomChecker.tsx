
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Heart, 
  Thermometer, 
  Brain, 
  Stethoscope,
  Clock,
  Phone,
  Shield
} from 'lucide-react';

const symptoms = [
  { id: 'fever', label: 'Fever', category: 'general' },
  { id: 'headache', label: 'Headache', category: 'neurological' },
  { id: 'cough', label: 'Cough', category: 'respiratory' },
  { id: 'sore_throat', label: 'Sore Throat', category: 'respiratory' },
  { id: 'fatigue', label: 'Fatigue', category: 'general' },
  { id: 'nausea', label: 'Nausea', category: 'digestive' },
  { id: 'vomiting', label: 'Vomiting', category: 'digestive' },
  { id: 'diarrhea', label: 'Diarrhea', category: 'digestive' },
  { id: 'chest_pain', label: 'Chest Pain', category: 'cardiac' },
  { id: 'shortness_breath', label: 'Shortness of Breath', category: 'respiratory' },
  { id: 'dizziness', label: 'Dizziness', category: 'neurological' },
  { id: 'rash', label: 'Skin Rash', category: 'dermatological' },
  { id: 'joint_pain', label: 'Joint Pain', category: 'musculoskeletal' },
  { id: 'muscle_ache', label: 'Muscle Aches', category: 'musculoskeletal' },
  { id: 'runny_nose', label: 'Runny Nose', category: 'respiratory' },
  { id: 'loss_taste', label: 'Loss of Taste/Smell', category: 'sensory' }
];

const getSymptomAnalysis = (selectedSymptoms: string[]) => {
  const symptomSet = new Set(selectedSymptoms);
  
  // Define different conditions based on symptom combinations
  if (symptomSet.has('fever') && symptomSet.has('cough') && symptomSet.has('sore_throat')) {
    return {
      condition: 'Upper Respiratory Infection',
      severity: 'Moderate',
      description: 'Likely viral or bacterial upper respiratory tract infection affecting the throat, sinuses, and airways.',
      recommendations: [
        'Rest and stay hydrated',
        'Consider over-the-counter pain relievers',
        'Gargle with warm salt water',
        'See a doctor if symptoms worsen or persist beyond 7-10 days'
      ],
      urgency: 'low',
      icon: <Stethoscope className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('chest_pain') && symptomSet.has('shortness_breath')) {
    return {
      condition: 'Cardiac or Pulmonary Concern',
      severity: 'High',
      description: 'Chest pain combined with breathing difficulties requires immediate medical evaluation to rule out serious conditions.',
      recommendations: [
        'Seek immediate medical attention',
        'Call emergency services if severe',
        'Do not drive yourself to hospital',
        'Monitor symptoms closely'
      ],
      urgency: 'high',
      icon: <Heart className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('fever') && symptomSet.has('headache') && symptomSet.has('rash')) {
    return {
      condition: 'Possible Viral Exanthem',
      severity: 'Moderate',
      description: 'Combination of fever, headache, and rash may indicate a viral infection with skin manifestations.',
      recommendations: [
        'Monitor temperature regularly',
        'Avoid contact with others until fever-free',
        'Apply cool compresses to rash',
        'Consult healthcare provider for proper diagnosis'
      ],
      urgency: 'moderate',
      icon: <Thermometer className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('nausea') && symptomSet.has('vomiting') && symptomSet.has('diarrhea')) {
    return {
      condition: 'Gastroenteritis',
      severity: 'Moderate',
      description: 'Inflammation of the stomach and intestines, commonly caused by viral or bacterial infection.',
      recommendations: [
        'Stay hydrated with clear fluids',
        'Follow BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Rest and avoid dairy products',
        'Seek medical care if severe dehydration occurs'
      ],
      urgency: 'low',
      icon: <Shield className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('headache') && symptomSet.has('dizziness') && symptomSet.has('fatigue')) {
    return {
      condition: 'Possible Migraine or Tension Headache',
      severity: 'Moderate',
      description: 'Neurological symptoms suggesting migraine, tension headache, or other headache disorders.',
      recommendations: [
        'Rest in a dark, quiet room',
        'Apply cold or warm compress to head',
        'Stay hydrated and maintain regular sleep schedule',
        'Track triggers and consult neurologist if frequent'
      ],
      urgency: 'low',
      icon: <Brain className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('cough') && symptomSet.has('runny_nose') && !symptomSet.has('fever')) {
    return {
      condition: 'Common Cold',
      severity: 'Mild',
      description: 'Viral upper respiratory infection with typical cold symptoms but no fever.',
      recommendations: [
        'Get plenty of rest',
        'Drink warm fluids',
        'Use saline nasal drops',
        'Symptoms usually resolve in 7-10 days'
      ],
      urgency: 'low',
      icon: <Stethoscope className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('fever') && symptomSet.has('loss_taste') && symptomSet.has('fatigue')) {
    return {
      condition: 'Possible COVID-19',
      severity: 'Moderate',
      description: 'Symptoms consistent with COVID-19 infection. Testing and isolation recommended.',
      recommendations: [
        'Get tested for COVID-19',
        'Isolate from others until test results',
        'Monitor oxygen levels if available',
        'Contact healthcare provider for guidance'
      ],
      urgency: 'moderate',
      icon: <Shield className="w-6 h-6" />
    };
  }
  
  if (symptomSet.has('joint_pain') && symptomSet.has('muscle_ache') && symptomSet.has('fatigue')) {
    return {
      condition: 'Musculoskeletal Condition',
      severity: 'Mild to Moderate',
      description: 'Pain and fatigue affecting muscles and joints, possibly due to overexertion, arthritis, or systemic condition.',
      recommendations: [
        'Apply heat or ice to affected areas',
        'Gentle stretching and movement',
        'Over-the-counter anti-inflammatory medication',
        'Consult doctor if symptoms persist or worsen'
      ],
      urgency: 'low',
      icon: <Shield className="w-6 h-6" />
    };
  }
  
  // Single symptom analysis
  if (selectedSymptoms.length === 1) {
    const symptom = selectedSymptoms[0];
    switch (symptom) {
      case 'fever':
        return {
          condition: 'Fever',
          severity: 'Variable',
          description: 'Elevated body temperature indicating possible infection or inflammatory response.',
          recommendations: [
            'Monitor temperature regularly',
            'Stay hydrated',
            'Rest and avoid strenuous activity',
            'Seek medical care if fever exceeds 102°F (39°C)'
          ],
          urgency: 'low',
          icon: <Thermometer className="w-6 h-6" />
        };
      case 'headache':
        return {
          condition: 'Headache',
          severity: 'Mild to Moderate',
          description: 'Head pain that may be due to tension, dehydration, or other causes.',
          recommendations: [
            'Stay hydrated',
            'Rest in quiet environment',
            'Apply cold or warm compress',
            'Consider over-the-counter pain relief'
          ],
          urgency: 'low',
          icon: <Brain className="w-6 h-6" />
        };
      default:
        return {
          condition: 'General Symptom',
          severity: 'Variable',
          description: 'Individual symptom that may resolve on its own or indicate need for medical evaluation.',
          recommendations: [
            'Monitor symptom progression',
            'Rest and self-care',
            'Consult healthcare provider if persistent',
            'Seek immediate care if severe'
          ],
          urgency: 'low',
          icon: <Stethoscope className="w-6 h-6" />
        };
    }
  }
  
  // Default analysis for other combinations
  return {
    condition: 'Multiple Symptoms',
    severity: 'Variable',
    description: 'Multiple symptoms present that may indicate various conditions. Professional medical evaluation recommended.',
    recommendations: [
      'Monitor all symptoms closely',
      'Rest and maintain hydration',
      'Avoid contact with others if infectious symptoms present',
      'Schedule appointment with healthcare provider for proper diagnosis'
    ],
    urgency: 'moderate',
    icon: <Stethoscope className="w-6 h-6" />
  };
};

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms(prev => [...prev, symptomId]);
    } else {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
    }
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis time
    setTimeout(() => {
      const result = getSymptomAnalysis(selectedSymptoms);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setAnalysis(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'moderate': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <Clock className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Symptom Checker</h1>
          <p className="text-lg text-gray-600">
            Select your symptoms below for personalized health insights and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptom Selection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2" />
                Select Your Symptoms
              </CardTitle>
              <CardDescription>
                Choose all symptoms you're currently experiencing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                    />
                    <label 
                      htmlFor={symptom.id} 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {symptom.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button 
                  onClick={analyzeSymptoms} 
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
                </Button>
                <Button variant="outline" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
              
              {selectedSymptoms.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(symptomId => {
                      const symptom = symptoms.find(s => s.id === symptomId);
                      return (
                        <Badge key={symptomId} variant="secondary">
                          {symptom?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Analysis Results
              </CardTitle>
              <CardDescription>
                AI-powered health insights based on your symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysis ? (
                <div className="text-center py-12 text-gray-500">
                  <Stethoscope className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select symptoms and click "Analyze" to get your health insights</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {analysis.icon}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{analysis.condition}</h3>
                        <Badge variant={getUrgencyColor(analysis.urgency)} className="mt-1">
                          {getUrgencyIcon(analysis.urgency)}
                          <span className="ml-1 capitalize">{analysis.urgency} Priority</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Severity: {analysis.severity}</h4>
                    <p className="text-gray-700 text-sm">{analysis.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {analysis.urgency === 'high' && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        <strong>Urgent:</strong> These symptoms may require immediate medical attention. 
                        Consider calling emergency services or visiting an emergency room.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Doctor Appointment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-2">Important Medical Disclaimer</h3>
                <p className="text-sm text-yellow-700">
                  This symptom checker is for informational purposes only and should not replace professional medical advice, 
                  diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns. 
                  In case of emergency, call your local emergency number immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;
