
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
  Shield,
  Wind,
  Zap,
  Eye,
  Bone
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
  { id: 'loss_taste', label: 'Loss of Taste/Smell', category: 'sensory' },
  { id: 'abdominal_pain', label: 'Abdominal Pain', category: 'digestive' },
  { id: 'back_pain', label: 'Back Pain', category: 'musculoskeletal' },
  { id: 'sneezing', label: 'Sneezing', category: 'respiratory' },
  { id: 'sweating', label: 'Excessive Sweating', category: 'general' },
  { id: 'weight_loss', label: 'Unexplained Weight Loss', category: 'general' },
  { id: 'constipation', label: 'Constipation', category: 'digestive' },
  { id: 'insomnia', label: 'Insomnia', category: 'neurological' },
  { id: 'swollen_glands', label: 'Swollen Lymph Nodes', category: 'immune' }
];

const getSymptomAnalysis = (selectedSymptoms: string[]) => {
  const symptomSet = new Set(selectedSymptoms);
  
  // Comprehensive disease patterns with higher specificity
  
  // COVID-19 patterns
  if (symptomSet.has('fever') && symptomSet.has('loss_taste') && symptomSet.has('fatigue')) {
    return {
      condition: 'COVID-19 Infection',
      severity: 'Moderate to High',
      description: 'Symptoms strongly suggest COVID-19 infection. Loss of taste/smell combined with fever and fatigue are characteristic signs.',
      recommendations: [
        'Immediately get tested for COVID-19',
        'Self-isolate for at least 5-10 days',
        'Monitor oxygen levels if available',
        'Contact healthcare provider for antiviral treatment options',
        'Inform close contacts of potential exposure'
      ],
      urgency: 'high',
      icon: <Shield className="w-6 h-6" />,
      possibleCauses: ['SARS-CoV-2 virus infection'],
      duration: '7-14 days typically'
    };
  }

  // Cardiac emergency
  if (symptomSet.has('chest_pain') && symptomSet.has('shortness_breath')) {
    return {
      condition: 'Acute Cardiac or Pulmonary Emergency',
      severity: 'Critical',
      description: 'Chest pain with breathing difficulties requires immediate medical evaluation to rule out heart attack, pulmonary embolism, or other life-threatening conditions.',
      recommendations: [
        'Call emergency services (911) immediately',
        'Do not drive yourself to hospital',
        'Chew aspirin if not allergic and no bleeding disorders',
        'Sit upright and try to remain calm',
        'Have someone stay with you until help arrives'
      ],
      urgency: 'high',
      icon: <Heart className="w-6 h-6" />,
      possibleCauses: ['Myocardial infarction', 'Pulmonary embolism', 'Aortic dissection', 'Pneumothorax'],
      duration: 'Requires immediate treatment'
    };
  }

  // Flu pattern
  if (symptomSet.has('fever') && symptomSet.has('muscle_ache') && symptomSet.has('fatigue') && symptomSet.has('headache')) {
    return {
      condition: 'Influenza (Flu)',
      severity: 'Moderate',
      description: 'Classic flu symptoms including fever, body aches, fatigue, and headache. Influenza is a viral respiratory illness.',
      recommendations: [
        'Rest and stay hydrated with plenty of fluids',
        'Consider antiviral medication if within 48 hours of onset',
        'Use fever reducers and pain relievers as needed',
        'Stay home until fever-free for 24 hours',
        'Get plenty of sleep to help immune system'
      ],
      urgency: 'moderate',
      icon: <Thermometer className="w-6 h-6" />,
      possibleCauses: ['Influenza A virus', 'Influenza B virus'],
      duration: '5-7 days typically'
    };
  }

  // Gastroenteritis
  if (symptomSet.has('nausea') && symptomSet.has('vomiting') && symptomSet.has('diarrhea')) {
    return {
      condition: 'Acute Gastroenteritis',
      severity: 'Moderate',
      description: 'Stomach flu causing inflammation of stomach and intestines, typically caused by viral or bacterial infection.',
      recommendations: [
        'Stay hydrated with clear fluids and electrolytes',
        'Follow BRAT diet: Bananas, Rice, Applesauce, Toast',
        'Avoid dairy, caffeine, alcohol, and fatty foods',
        'Rest and gradually return to normal diet',
        'Seek medical care if severe dehydration occurs'
      ],
      urgency: 'low',
      icon: <Zap className="w-6 h-6" />,
      possibleCauses: ['Norovirus', 'Rotavirus', 'Food poisoning', 'Bacterial infection'],
      duration: '2-5 days typically'
    };
  }

  // Migraine pattern
  if (symptomSet.has('headache') && symptomSet.has('nausea') && symptomSet.has('dizziness')) {
    return {
      condition: 'Migraine Headache',
      severity: 'Moderate',
      description: 'Neurological condition causing severe headaches often accompanied by nausea, dizziness, and sensitivity to light/sound.',
      recommendations: [
        'Rest in a dark, quiet room',
        'Apply cold compress to forehead or warm compress to neck',
        'Stay hydrated and maintain regular sleep schedule',
        'Consider over-the-counter migraine medication',
        'Track triggers in a headache diary'
      ],
      urgency: 'low',
      icon: <Brain className="w-6 h-6" />,
      possibleCauses: ['Stress', 'Hormonal changes', 'Food triggers', 'Sleep disruption'],
      duration: '4-72 hours if untreated'
    };
  }

  // Allergic reaction
  if (symptomSet.has('rash') && symptomSet.has('sneezing') && symptomSet.has('runny_nose')) {
    return {
      condition: 'Allergic Reaction',
      severity: 'Mild to Moderate',
      description: 'Immune system response to allergens causing skin and respiratory symptoms.',
      recommendations: [
        'Identify and avoid potential allergens',
        'Take antihistamines as directed',
        'Apply cool compresses to affected skin areas',
        'Use gentle, fragrance-free skincare products',
        'Consider allergy testing if symptoms persist'
      ],
      urgency: 'low',
      icon: <Eye className="w-6 h-6" />,
      possibleCauses: ['Pollen', 'Pet dander', 'Food allergens', 'Environmental irritants'],
      duration: 'Until allergen exposure ends'
    };
  }

  // Respiratory infection
  if (symptomSet.has('cough') && symptomSet.has('sore_throat') && symptomSet.has('fever')) {
    return {
      condition: 'Upper Respiratory Tract Infection',
      severity: 'Moderate',
      description: 'Viral or bacterial infection affecting the upper airways including throat, sinuses, and bronchi.',
      recommendations: [
        'Rest and increase fluid intake',
        'Gargle with warm salt water for sore throat',
        'Use humidifier or breathe steam from hot shower',
        'Consider throat lozenges and cough suppressants',
        'See doctor if symptoms worsen or persist beyond 10 days'
      ],
      urgency: 'low',
      icon: <Wind className="w-6 h-6" />,
      possibleCauses: ['Rhinovirus', 'Adenovirus', 'Streptococcus bacteria'],
      duration: '7-10 days typically'
    };
  }

  // Stress/Anxiety pattern
  if (symptomSet.has('headache') && symptomSet.has('fatigue') && symptomSet.has('insomnia')) {
    return {
      condition: 'Stress-Related Symptoms',
      severity: 'Mild to Moderate',
      description: 'Physical symptoms related to psychological stress, anxiety, or lifestyle factors affecting sleep and energy.',
      recommendations: [
        'Practice stress management techniques',
        'Establish regular sleep schedule',
        'Engage in regular physical exercise',
        'Consider relaxation techniques like meditation',
        'Talk to counselor or therapist if stress is overwhelming'
      ],
      urgency: 'low',
      icon: <Brain className="w-6 h-6" />,
      possibleCauses: ['Work stress', 'Life changes', 'Anxiety disorders', 'Poor sleep hygiene'],
      duration: 'Variable, improves with stress management'
    };
  }

  // Arthritis/Joint issues
  if (symptomSet.has('joint_pain') && symptomSet.has('muscle_ache') && symptomSet.has('back_pain')) {
    return {
      condition: 'Musculoskeletal Inflammation',
      severity: 'Moderate',
      description: 'Inflammation affecting joints, muscles, and connective tissues, possibly due to arthritis, overuse, or autoimmune condition.',
      recommendations: [
        'Apply heat therapy to stiff joints, ice to inflamed areas',
        'Gentle stretching and low-impact exercise',
        'Anti-inflammatory medications as appropriate',
        'Maintain healthy weight to reduce joint stress',
        'Consider physical therapy evaluation'
      ],
      urgency: 'low',
      icon: <Bone className="w-6 h-6" />,
      possibleCauses: ['Osteoarthritis', 'Rheumatoid arthritis', 'Muscle strain', 'Fibromyalgia'],
      duration: 'Chronic condition requiring ongoing management'
    };
  }

  // Food poisoning
  if (symptomSet.has('abdominal_pain') && symptomSet.has('nausea') && symptomSet.has('diarrhea')) {
    return {
      condition: 'Food Poisoning',
      severity: 'Moderate',
      description: 'Foodborne illness caused by consuming contaminated food or beverages, leading to gastrointestinal distress.',
      recommendations: [
        'Stay hydrated with clear fluids and electrolyte solutions',
        'Avoid solid foods until vomiting stops',
        'Gradually reintroduce bland foods',
        'Rest and avoid dairy and fatty foods',
        'Seek medical care if symptoms are severe or prolonged'
      ],
      urgency: 'moderate',
      icon: <Zap className="w-6 h-6" />,
      possibleCauses: ['Salmonella', 'E. coli', 'Campylobacter', 'Staphylococcus aureus'],
      duration: '1-7 days depending on cause'
    };
  }

  // Common cold
  if (symptomSet.has('runny_nose') && symptomSet.has('sneezing') && symptomSet.has('sore_throat')) {
    return {
      condition: 'Common Cold',
      severity: 'Mild',
      description: 'Viral upper respiratory infection causing nasal congestion, throat irritation, and sneezing.',
      recommendations: [
        'Get plenty of rest and sleep',
        'Drink warm fluids like tea, broth, or warm water',
        'Use saline nasal spray or rinse',
        'Gargle with salt water for sore throat',
        'Use humidifier to ease congestion'
      ],
      urgency: 'low',
      icon: <Stethoscope className="w-6 h-6" />,
      possibleCauses: ['Rhinovirus', 'Coronavirus (common cold strains)', 'Adenovirus'],
      duration: '7-10 days typically'
    };
  }

  // Single symptom analysis with more detail
  if (selectedSymptoms.length === 1) {
    const symptom = selectedSymptoms[0];
    const singleSymptomAnalysis = {
      'fever': {
        condition: 'Isolated Fever',
        severity: 'Variable',
        description: 'Elevated body temperature indicating possible infection, inflammation, or immune response.',
        recommendations: [
          'Monitor temperature regularly (normal: 98.6°F/37°C)',
          'Stay hydrated with plenty of fluids',
          'Rest and avoid strenuous activities',
          'Use fever reducers if temperature exceeds 102°F (39°C)',
          'Seek medical care if fever persists over 3 days'
        ],
        urgency: 'low',
        icon: <Thermometer className="w-6 h-6" />,
        possibleCauses: ['Viral infection', 'Bacterial infection', 'Medication reaction', 'Heat exhaustion'],
        duration: '1-3 days typically'
      },
      'headache': {
        condition: 'Primary Headache',
        severity: 'Mild to Moderate',
        description: 'Head pain that may be tension-type, caused by stress, dehydration, or other benign factors.',
        recommendations: [
          'Stay well hydrated throughout the day',
          'Rest in quiet, dark environment',
          'Apply cold or warm compress to head/neck',
          'Practice relaxation techniques',
          'Consider over-the-counter pain relievers'
        ],
        urgency: 'low',
        icon: <Brain className="w-6 h-6" />,
        possibleCauses: ['Tension', 'Dehydration', 'Eye strain', 'Stress', 'Sleep deprivation'],
        duration: 'Few hours to 1 day typically'
      },
      'cough': {
        condition: 'Isolated Cough',
        severity: 'Mild',
        description: 'Respiratory symptom that may indicate irritation of airways or early stages of respiratory infection.',
        recommendations: [
          'Stay hydrated to thin mucus secretions',
          'Use honey or throat lozenges for throat soothing',
          'Avoid smoke and other respiratory irritants',
          'Consider humidifier to moisten air',
          'Monitor for additional symptoms'
        ],
        urgency: 'low',
        icon: <Wind className="w-6 h-6" />,
        possibleCauses: ['Viral infection', 'Allergies', 'Air pollution', 'Acid reflux', 'Asthma'],
        duration: '1-3 weeks depending on cause'
      }
    };

    return singleSymptomAnalysis[symptom] || {
      condition: 'Individual Symptom Assessment',
      severity: 'Variable',
      description: 'Single symptom that may be part of various conditions or resolve independently.',
      recommendations: [
        'Monitor symptom progression over time',
        'Note any additional symptoms that develop',
        'Maintain good general health practices',
        'Consult healthcare provider if persistent or worsening',
        'Keep symptom diary for pattern recognition'
      ],
      urgency: 'low',
      icon: <Stethoscope className="w-6 h-6" />,
      possibleCauses: ['Various benign conditions', 'Lifestyle factors', 'Environmental factors'],
      duration: 'Variable'
    };
  }

  // Multiple symptoms without specific pattern
  return {
    condition: 'Multi-System Symptom Complex',
    severity: 'Variable',
    description: 'Multiple symptoms present that may indicate systemic condition, viral syndrome, or combination of factors requiring professional evaluation.',
    recommendations: [
      'Document all symptoms with onset times',
      'Monitor symptom progression and severity',
      'Maintain hydration and rest',
      'Avoid contact with others if infectious symptoms present',
      'Schedule comprehensive medical evaluation for proper diagnosis'
    ],
    urgency: 'moderate',
    icon: <Stethoscope className="w-6 h-6" />,
    possibleCauses: ['Viral syndrome', 'Autoimmune condition', 'Medication effects', 'Stress response'],
    duration: 'Requires medical evaluation'
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

                  {analysis.possibleCauses && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Possible Causes:</h4>
                      <ul className="text-sm text-gray-700 list-disc list-inside">
                        {analysis.possibleCauses.map((cause: string, index: number) => (
                          <li key={index}>{cause}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.duration && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">Expected Duration: {analysis.duration}</h4>
                    </div>
                  )}
                  
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
