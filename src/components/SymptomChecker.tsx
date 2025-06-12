
import React, { useState, useEffect } from 'react';
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
  Bone,
  Activity,
  Droplets,
  Pill,
  History,
  Info
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
  
  // Critical emergency conditions - highest priority
  if (symptomSet.has('chest_pain') && symptomSet.has('shortness_breath')) {
    return {
      condition: 'Acute Cardiac Emergency',
      severity: 'Critical',
      description: 'Chest pain with difficulty breathing requires immediate emergency medical attention. This could indicate a heart attack, pulmonary embolism, or other life-threatening conditions.',
      recommendations: [
        'Call 911 immediately - DO NOT DRIVE YOURSELF',
        'Chew one aspirin if not allergic and no bleeding disorders',
        'Sit upright and try to remain calm',
        'Loosen tight clothing around chest and neck',
        'Have someone stay with you until emergency services arrive'
      ],
      urgency: 'high',
      icon: <Heart className="w-6 h-6" />,
      possibleCauses: ['Heart attack', 'Pulmonary embolism', 'Aortic dissection', 'Pneumothorax'],
      duration: 'Emergency - requires immediate treatment'
    };
  }

  // COVID-19 specific pattern
  if (symptomSet.has('fever') && symptomSet.has('loss_taste')) {
    return {
      condition: 'COVID-19 Infection',
      severity: 'Moderate to High',
      description: 'The combination of fever and loss of taste/smell is highly characteristic of COVID-19 infection. Immediate testing and isolation are recommended.',
      recommendations: [
        'Get a COVID-19 test immediately',
        'Self-isolate for 5-10 days minimum',
        'Monitor oxygen levels if pulse oximeter available',
        'Contact healthcare provider about antiviral treatments',
        'Inform close contacts about potential exposure',
        'Stay hydrated and rest'
      ],
      urgency: 'high',
      icon: <Shield className="w-6 h-6" />,
      possibleCauses: ['SARS-CoV-2 virus infection'],
      duration: '7-14 days typically, isolation until fever-free 24 hours'
    };
  }

  // Respiratory infections - different patterns
  if (symptomSet.has('runny_nose') && symptomSet.has('sneezing')) {
    if (symptomSet.has('fever')) {
      return {
        condition: 'Viral Upper Respiratory Infection',
        severity: 'Moderate',
        description: 'Common cold or flu-like illness affecting the upper respiratory tract. The presence of fever suggests a viral infection rather than allergies.',
        recommendations: [
          'Rest and increase fluid intake significantly',
          'Use saline nasal rinses to clear congestion',
          'Gargle with warm salt water',
          'Consider over-the-counter decongestants',
          'Stay home until fever-free for 24 hours',
          'Use humidifier or breathe steam from hot shower'
        ],
        urgency: 'low',
        icon: <Wind className="w-6 h-6" />,
        possibleCauses: ['Rhinovirus', 'Influenza virus', 'Adenovirus', 'Parainfluenza virus'],
        duration: '7-10 days, contagious for first 3-5 days'
      };
    } else {
      return {
        condition: 'Allergic Rhinitis',
        severity: 'Mild',
        description: 'Seasonal or environmental allergies causing nasal symptoms without fever. This is typically not contagious and responds well to allergy management.',
        recommendations: [
          'Identify and avoid known allergens',
          'Take antihistamines as directed',
          'Use nasal saline rinses twice daily',
          'Keep windows closed during high pollen days',
          'Consider air purifiers in your home',
          'Shower after outdoor activities'
        ],
        urgency: 'low',
        icon: <Eye className="w-6 h-6" />,
        possibleCauses: ['Pollen allergies', 'Dust mites', 'Pet dander', 'Mold spores'],
        duration: 'Ongoing during allergen exposure, improves with avoidance'
      };
    }
  }

  // Respiratory symptoms alone
  if (symptomSet.has('cough') && !symptomSet.has('fever') && selectedSymptoms.length === 1) {
    return {
      condition: 'Isolated Cough',
      severity: 'Mild',
      description: 'A persistent cough without other symptoms may indicate airway irritation, allergies, or early stages of a respiratory condition.',
      recommendations: [
        'Stay well hydrated to thin mucus',
        'Use honey or throat lozenges (avoid honey in children under 1 year)',
        'Avoid smoke and other respiratory irritants',
        'Consider humidifier or steam inhalation',
        'Monitor for development of additional symptoms',
        'See doctor if cough persists more than 3 weeks'
      ],
      urgency: 'low',
      icon: <Wind className="w-6 h-6" />,
      possibleCauses: ['Post-viral cough', 'Allergic asthma', 'Acid reflux', 'Environmental irritants'],
      duration: '1-3 weeks depending on cause'
    };
  }

  // Gastrointestinal conditions
  if (symptomSet.has('nausea') && symptomSet.has('vomiting')) {
    if (symptomSet.has('diarrhea')) {
      return {
        condition: 'Acute Gastroenteritis',
        severity: 'Moderate',
        description: 'Stomach flu causing inflammation of the digestive tract. This is often viral but can be bacterial, especially if symptoms are severe.',
        recommendations: [
          'Stay hydrated with clear fluids and oral rehydration solutions',
          'Start with BRAT diet: Bananas, Rice, Applesauce, Toast',
          'Avoid dairy, caffeine, alcohol, and fatty foods',
          'Rest and gradually return to normal diet',
          'Seek medical care if signs of severe dehydration occur',
          'Wash hands frequently to prevent spread'
        ],
        urgency: 'moderate',
        icon: <Zap className="w-6 h-6" />,
        possibleCauses: ['Norovirus', 'Rotavirus', 'Food poisoning', 'Bacterial gastroenteritis'],
        duration: '2-5 days, seek care if longer than 1 week'
      };
    } else {
      return {
        condition: 'Nausea and Vomiting Syndrome',
        severity: 'Moderate',
        description: 'Nausea and vomiting without diarrhea may indicate food poisoning, medication side effects, or other gastrointestinal issues.',
        recommendations: [
          'Stop eating solid foods temporarily',
          'Sip clear fluids slowly and frequently',
          'Try ginger tea or ginger supplements',
          'Rest in a comfortable position',
          'Gradually reintroduce bland foods when vomiting stops',
          'Contact healthcare provider if unable to keep fluids down'
        ],
        urgency: 'moderate',
        icon: <Droplets className="w-6 h-6" />,
        possibleCauses: ['Food poisoning', 'Medication side effects', 'Migraine', 'Viral illness'],
        duration: '1-3 days, seek care if dehydration develops'
      };
    }
  }

  // Neurological symptoms
  if (symptomSet.has('headache')) {
    if (symptomSet.has('nausea') && symptomSet.has('dizziness')) {
      return {
        condition: 'Migraine Headache',
        severity: 'Moderate to Severe',
        description: 'Classic migraine pattern with headache, nausea, and dizziness. Migraines are neurological events that can be debilitating but are typically not dangerous.',
        recommendations: [
          'Rest in a dark, quiet room',
          'Apply cold compress to forehead or warm compress to neck',
          'Stay hydrated and maintain regular sleep schedule',
          'Consider over-the-counter migraine medications',
          'Track triggers in a headache diary',
          'Avoid known trigger foods and stress'
        ],
        urgency: 'low',
        icon: <Brain className="w-6 h-6" />,
        possibleCauses: ['Stress', 'Hormonal changes', 'Food triggers', 'Sleep disruption', 'Weather changes'],
        duration: '4-72 hours if untreated, 2-4 hours with medication'
      };
    } else if (selectedSymptoms.length === 1) {
      return {
        condition: 'Tension Headache',
        severity: 'Mild to Moderate',
        description: 'Common headache often related to stress, dehydration, or muscle tension. Usually not serious but can be uncomfortable.',
        recommendations: [
          'Stay well hydrated throughout the day',
          'Rest in a quiet environment',
          'Apply heat or cold to head and neck',
          'Practice relaxation techniques or gentle stretching',
          'Consider over-the-counter pain relievers',
          'Maintain regular sleep schedule'
        ],
        urgency: 'low',
        icon: <Brain className="w-6 h-6" />,
        possibleCauses: ['Stress', 'Dehydration', 'Eye strain', 'Poor posture', 'Lack of sleep'],
        duration: 'Few hours to 1 day, recurrent if triggers persist'
      };
    }
  }

  // Musculoskeletal issues
  if (symptomSet.has('joint_pain') || symptomSet.has('muscle_ache') || symptomSet.has('back_pain')) {
    if (symptomSet.has('fever')) {
      return {
        condition: 'Viral Myalgia (Flu-like illness)',
        severity: 'Moderate',
        description: 'Body aches and pains with fever typically indicate a viral infection like influenza. This is your body\'s immune response to fighting infection.',
        recommendations: [
          'Rest and avoid strenuous activities',
          'Stay well hydrated with fluids',
          'Use fever reducers and pain relievers as directed',
          'Apply heat to sore muscles',
          'Get plenty of sleep to help immune system',
          'Stay home until fever-free for 24 hours'
        ],
        urgency: 'low',
        icon: <Activity className="w-6 h-6" />,
        possibleCauses: ['Influenza virus', 'Other viral infections', 'COVID-19'],
        duration: '5-7 days typically'
      };
    } else {
      return {
        condition: 'Musculoskeletal Pain Syndrome',
        severity: 'Mild to Moderate',
        description: 'Joint and muscle pain without fever may indicate arthritis, overuse injury, or chronic pain conditions. Physical therapy and gentle movement often help.',
        recommendations: [
          'Apply heat to stiff joints, ice to acute injuries',
          'Gentle stretching and low-impact exercise',
          'Anti-inflammatory medications as appropriate',
          'Maintain healthy weight to reduce joint stress',
          'Consider physical therapy evaluation',
          'Ergonomic improvements at work and home'
        ],
        urgency: 'low',
        icon: <Bone className="w-6 h-6" />,
        possibleCauses: ['Osteoarthritis', 'Rheumatoid arthritis', 'Fibromyalgia', 'Muscle strain', 'Overuse injury'],
        duration: 'Variable, chronic conditions require ongoing management'
      };
    }
  }

  // Single fever
  if (selectedSymptoms.length === 1 && symptomSet.has('fever')) {
    return {
      condition: 'Isolated Fever',
      severity: 'Moderate',
      description: 'Fever without other symptoms often indicates the early stages of an infection. Monitor closely for additional symptoms developing.',
      recommendations: [
        'Monitor temperature every 4-6 hours',
        'Stay hydrated with plenty of fluids',
        'Rest and avoid strenuous activities',
        'Use fever reducers if temperature exceeds 102°F (39°C)',
        'Watch for additional symptoms developing',
        'Seek medical care if fever persists over 3 days'
      ],
      urgency: 'moderate',
      icon: <Thermometer className="w-6 h-6" />,
      possibleCauses: ['Early viral infection', 'Bacterial infection', 'Immune response', 'Medication reaction'],
      duration: '1-3 days typically, seek care if prolonged'
    };
  }

  // Digestive issues
  if (symptomSet.has('abdominal_pain')) {
    if (symptomSet.has('nausea')) {
      return {
        condition: 'Gastritis or Food Intolerance',
        severity: 'Moderate',
        description: 'Stomach pain with nausea may indicate gastritis, food intolerance, or early gastroenteritis. Monitor symptoms and dietary triggers.',
        recommendations: [
          'Avoid spicy, fatty, or acidic foods',
          'Eat small, frequent meals',
          'Stay hydrated with clear fluids',
          'Consider probiotics for digestive health',
          'Keep a food diary to identify triggers',
          'Seek medical care if pain is severe or persistent'
        ],
        urgency: 'low',
        icon: <Zap className="w-6 h-6" />,
        possibleCauses: ['Gastritis', 'Food intolerance', 'Peptic ulcer', 'Gallbladder issues'],
        duration: '1-3 days with dietary changes'
      };
    }
  }

  // Sleep and stress issues
  if (symptomSet.has('insomnia') && symptomSet.has('fatigue')) {
    return {
      condition: 'Sleep Disorder/Stress Response',
      severity: 'Moderate',
      description: 'Difficulty sleeping combined with fatigue often indicates stress, anxiety, or sleep disorders. Good sleep hygiene is essential for recovery.',
      recommendations: [
        'Establish consistent sleep and wake times',
        'Create a relaxing bedtime routine',
        'Limit screen time 1 hour before bed',
        'Practice stress management techniques',
        'Avoid caffeine after 2 PM',
        'Consider talking to a healthcare provider about sleep study'
      ],
      urgency: 'low',
      icon: <Brain className="w-6 h-6" />,
      possibleCauses: ['Stress', 'Anxiety', 'Sleep apnea', 'Depression', 'Poor sleep hygiene'],
      duration: 'Improves with lifestyle changes and stress management'
    };
  }

  // Skin conditions
  if (symptomSet.has('rash') && selectedSymptoms.length === 1) {
    return {
      condition: 'Contact Dermatitis or Allergic Reaction',
      severity: 'Mild',
      description: 'Skin rash without other symptoms often indicates contact with an irritant or allergen. Most skin rashes are not serious but can be uncomfortable.',
      recommendations: [
        'Identify and avoid potential allergens or irritants',
        'Apply cool, wet compresses to affected areas',
        'Use gentle, fragrance-free skincare products',
        'Consider over-the-counter hydrocortisone cream',
        'Avoid scratching to prevent secondary infection',
        'See dermatologist if rash persists or spreads'
      ],
      urgency: 'low',
      icon: <Eye className="w-6 h-6" />,
      possibleCauses: ['Contact dermatitis', 'Allergic reaction', 'Eczema', 'Heat rash'],
      duration: '3-7 days with proper care'
    };
  }

  // Weight loss concern
  if (symptomSet.has('weight_loss') && selectedSymptoms.length === 1) {
    return {
      condition: 'Unexplained Weight Loss',
      severity: 'Moderate to High',
      description: 'Unintentional weight loss without trying to lose weight can indicate various underlying conditions and should be evaluated by a healthcare provider.',
      recommendations: [
        'Schedule comprehensive medical evaluation',
        'Keep a detailed food and symptom diary',
        'Monitor weight weekly',
        'Ensure adequate caloric intake',
        'Stay hydrated and maintain nutrition',
        'Discuss with healthcare provider about potential causes'
      ],
      urgency: 'moderate',
      icon: <Activity className="w-6 h-6" />,
      possibleCauses: ['Metabolic disorders', 'Gastrointestinal issues', 'Chronic diseases', 'Medication side effects'],
      duration: 'Requires medical evaluation for proper diagnosis'
    };
  }

  // Multiple respiratory symptoms
  if ((symptomSet.has('cough') && symptomSet.has('sore_throat')) || 
      (symptomSet.has('runny_nose') && symptomSet.has('cough'))) {
    return {
      condition: 'Upper Respiratory Tract Infection',
      severity: 'Mild to Moderate',
      description: 'Multiple respiratory symptoms suggest a viral upper respiratory infection, commonly known as a cold or upper respiratory tract infection.',
      recommendations: [
        'Rest and increase fluid intake',
        'Gargle with warm salt water for sore throat',
        'Use humidifier or breathe steam from hot shower',
        'Consider throat lozenges and cough suppressants',
        'Avoid smoking and secondhand smoke',
        'See doctor if symptoms worsen or persist beyond 10 days'
      ],
      urgency: 'low',
      icon: <Wind className="w-6 h-6" />,
      possibleCauses: ['Common cold virus', 'Rhinovirus', 'Adenovirus', 'Early flu'],
      duration: '7-10 days typically'
    };
  }

  // Default for any remaining combinations
  return {
    condition: 'General Health Assessment Needed',
    severity: 'Variable',
    description: 'Your combination of symptoms suggests you should consult with a healthcare provider for proper evaluation and diagnosis. Multiple symptoms can have various causes.',
    recommendations: [
      'Schedule appointment with your healthcare provider',
      'Document when symptoms started and their progression',
      'Keep track of what makes symptoms better or worse',
      'Monitor your temperature and vital signs if possible',
      'Stay hydrated and get adequate rest',
      'Avoid contact with others if you feel unwell'
    ],
    urgency: 'moderate',
    icon: <Stethoscope className="w-6 h-6" />,
    possibleCauses: ['Various conditions requiring professional evaluation'],
    duration: 'Depends on underlying cause - seek medical evaluation'
  };
};

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symptomHistory, setSymptomHistory] = useState<any[]>([]);

  useEffect(() => {
    // Load symptom history from localStorage
    const savedHistory = localStorage.getItem('symptomHistory');
    if (savedHistory) {
      try {
        setSymptomHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Failed to parse symptom history:', err);
      }
    }
  }, []);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setSelectedSymptoms(prev =>
      checked ? [...prev, symptomId] : prev.filter(id => id !== symptomId)
    );
    setAnalysisResult(null);
    setError(null);
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      setAnalysisResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Use the local analysis function
      const result = getSymptomAnalysis(selectedSymptoms);
      
      // Add timestamp and save to history
      const historyEntry = {
        ...result,
        symptoms: selectedSymptoms.map(id => symptoms.find(s => s.id === id)?.label).filter(Boolean),
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString()
      };
      
      // Save to localStorage
      const updatedHistory = [historyEntry, ...symptomHistory.slice(0, 9)]; // Keep last 10 entries
      setSymptomHistory(updatedHistory);
      localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory));
      
      setAnalysisResult(result);
    } catch (err) {
      console.error("Symptom analysis failed:", err);
      setError("Failed to analyze symptoms. Please try again.");
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setAnalysisResult(null);
    setError(null);
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

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, typeof symptoms>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Activity className="w-4 h-4 mr-2" />
            AI-Powered Health Analysis
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Symptom Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized health insights powered by advanced AI. Select your symptoms below for 
            intelligent analysis, condition identification, and evidence-based recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Symptom Selection Panel */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Stethoscope className="w-6 h-6 mr-3" />
                Select Your Symptoms
              </CardTitle>
              <CardDescription className="text-blue-100">
                Choose all symptoms you're currently experiencing. Our AI will analyze patterns and provide insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Error Display */}
              {error && (
                <Alert className="mb-6 border-red-300 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
              
              {/* Symptoms by Category */}
              <div className="space-y-6">
                {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="font-semibold text-gray-900 capitalize border-b border-gray-200 pb-2">
                      {category.replace('_', ' ')} Symptoms
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categorySymptoms.map((symptom) => (
                        <div key={symptom.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                          <Checkbox
                            id={symptom.id}
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                          />
                          <label 
                            htmlFor={symptom.id} 
                            className="text-sm font-medium leading-none cursor-pointer flex-1"
                          >
                            {symptom.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <Button 
                  onClick={analyzeSymptoms} 
                  disabled={selectedSymptoms.length === 0 || loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3"
                >
                  {loading ? (
                    <>
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Analyze Symptoms ({selectedSymptoms.length})
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearSelection} className="px-6">
                  Clear All
                </Button>
              </div>
              
              {/* Selected Symptoms Display */}
              {selectedSymptoms.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-3">
                    Selected symptoms ({selectedSymptoms.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(symptomId => {
                      const symptom = symptoms.find(s => s.id === symptomId);
                      return (
                        <Badge key={symptomId} variant="secondary" className="bg-blue-100 text-blue-800">
                          {symptom?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results Panel */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Brain className="w-6 h-6 mr-3" />
                AI Analysis Results
              </CardTitle>
              <CardDescription className="text-purple-100">
                Intelligent health insights based on your symptom patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {!analysisResult ? (
                <div className="text-center py-16 text-gray-500">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                  <p className="text-sm">Select symptoms and click "Analyze" to get your personalized health insights</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Condition Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
                        {analysisResult.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{analysisResult.condition}</h3>
                        <Badge variant={getUrgencyColor(analysisResult.urgency)} className="text-sm">
                          {getUrgencyIcon(analysisResult.urgency)}
                          <span className="ml-2 capitalize">{analysisResult.urgency} Priority</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Severity & Description */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Severity: {analysisResult.severity}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{analysisResult.description}</p>
                  </div>

                  {/* Possible Causes */}
                  {analysisResult.possibleCauses && (
                    <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Possible Causes:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {analysisResult.possibleCauses.map((cause: string, index: number) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 flex-shrink-0"></div>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Duration */}
                  {analysisResult.duration && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Expected Duration: {analysisResult.duration}
                      </h4>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Pill className="w-4 h-4 mr-2" />
                      Recommended Actions:
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Emergency Alert */}
                  {analysisResult.urgency === 'high' && (
                    <Alert className="border-red-300 bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <AlertDescription className="text-red-800 font-medium">
                        <strong>URGENT MEDICAL ATTENTION REQUIRED:</strong> These symptoms may indicate a serious medical condition. 
                        Seek immediate medical care or call emergency services.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="pt-4 border-t space-y-3">
                    <Button variant="outline" className="w-full" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Doctor Appointment
                    </Button>
                    <Button variant="ghost" onClick={clearSelection} className="w-full">
                      Check Different Symptoms
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Symptom History */}
        {symptomHistory.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Recent Symptom Analysis History</span>
              </CardTitle>
              <CardDescription>Review your past symptom analysis results.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {symptomHistory.slice(0, 5).map((entry, index) => (
                  <Alert key={index} variant={entry.severity === 'Critical' ? 'destructive' : 'default'}>
                    <Info className="w-4 h-4" />
                    <AlertDescription className="font-medium">
                      <p><strong>{entry.condition}</strong> - {entry.date}</p>
                      <p className="text-sm text-gray-700">Symptoms: {entry.symptoms.join(', ')}</p>
                      <p className="text-sm text-gray-700">Severity: {entry.severity}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medical Disclaimer */}
        <Card className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-800 mb-3 text-lg">Important Medical Disclaimer</h3>
                <div className="text-sm text-yellow-700 space-y-2">
                  <p>
                    <strong>This AI symptom checker is for informational and educational purposes only.</strong> It should never replace 
                    professional medical advice, diagnosis, or treatment from qualified healthcare providers.
                  </p>
                  <p>
                    Always consult with your doctor or other qualified health professional with any questions about your medical condition. 
                    In case of emergency, call your local emergency number (911) immediately.
                  </p>
                  <p>
                    The AI analysis is based on general medical knowledge and cannot account for your complete medical history, 
                    current medications, or individual health factors that may affect your condition.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomChecker;
