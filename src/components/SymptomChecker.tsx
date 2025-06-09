import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Clock, TrendingUp, Activity, Heart, Thermometer, Brain, Shield, 
  Calendar, FileText, MessageSquare, Bell, History, BookOpen, MapPin, Users, 
  Activity as ActivityIcon, Droplet, Pill, Stethoscope } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define types
interface SymptomCategory {
  [key: string]: string[];
}

interface EmergencyContact {
  type: string;
  number: string;
  hours: string;
  afterHours: string;
  services: string;
  whenToCall: string;
}

interface SymptomSeverity {
  level: 'mild' | 'moderate' | 'severe';
  description: string;
  impact: string;
  management: string;
}

interface SymptomTimeline {
  onset: string;
  peak: string;
  resolution: string;
  stages: Array<{
    day: number;
    description: string;
    symptoms: string[];
    recommendations: string[];
  }>;
}

interface AnalysisData {
  condition: string;
  confidence: number;
  severity: string;
  urgency: string;
  recommendations: string[];
  whenToSeekHelp: string[];
  lifestyleAdjustments: string[];
  prevention: string[];
  emergencyContacts: EmergencyContact[];
  nearbyFacilities: Array<{
    name: string;
    distance: string;
    type: string;
    services: string[];
    hours: string;
  }>;
  similarConditions: Array<{
    name: string;
    probability: number;
    symptoms: string[];
    keyDifferences: string[];
    treatment: string;
  }>;
  riskFactors: Array<{
    factor: string;
    level: string;
    description: string;
    impact: string;
    explanation: string;
  }>;
  timeline: {
    onset: string;
    progression: string;
    expectedDuration: string;
    stages: Array<{
      day: number;
      description: string;
      symptoms: string[];
      recommendations: string[];
    }>;
  };
  symptomAnalysis: {
    primarySymptoms: Array<{
      name: string;
      severity: string;
      duration: string;
      pattern: string;
      impact: string;
      management: string;
    }>;
    secondarySymptoms: Array<{
      name: string;
      severity: string;
      duration: string;
      pattern: string;
      impact: string;
      management: string;
    }>;
    symptomPattern: string;
    symptomSeverity: string;
    symptomProgression: string;
    symptomInteractions: Array<{
      symptoms: string[];
      interaction: string;
      management: string;
    }>;
  };
  treatmentOptions: {
    medications: Array<{
      name: string;
      purpose: string;
      dosage: string;
      maxDailyDose: string;
      precautions: string;
      interactions: string;
      sideEffects: string[];
      whenToTake: string;
      storage: string;
      brandNames: string[];
      category: string;
    }>;
    homeRemedies: Array<{
      name: string;
      purpose: string;
      instructions: string;
      precautions: string;
      frequency: string;
      duration: string;
      benefits: string;
    }>;
    medicationSchedule: {
      morning: Array<{
        name: string;
        purpose: string;
        dosage: string;
        maxDailyDose: string;
        precautions: string;
        interactions: string;
        sideEffects: string[];
        whenToTake: string;
        storage: string;
        brandNames: string[];
        category: string;
      }>;
      afternoon: Array<{
        name: string;
        purpose: string;
        dosage: string;
        maxDailyDose: string;
        precautions: string;
        interactions: string;
        sideEffects: string[];
        whenToTake: string;
        storage: string;
        brandNames: string[];
        category: string;
      }>;
      evening: Array<{
        name: string;
        purpose: string;
        dosage: string;
        maxDailyDose: string;
        precautions: string;
        interactions: string;
        sideEffects: string[];
        whenToTake: string;
        storage: string;
        brandNames: string[];
        category: string;
      }>;
      asNeeded: Array<{
        name: string;
        purpose: string;
        dosage: string;
        maxDailyDose: string;
        precautions: string;
        interactions: string;
        sideEffects: string[];
        whenToTake: string;
        storage: string;
        brandNames: string[];
        category: string;
      }>;
    };
  };
  environmentalFactors: {
    triggers: Array<{
      factor: string;
      impact: string;
      management: string;
    }>;
    aggravatingFactors: Array<{
      factor: string;
      impact: string;
      management: string;
    }>;
    relievingFactors: Array<{
      factor: string;
      impact: string;
      management: string;
    }>;
  };
  dietaryRecommendations: {
    recommended: Array<{
      item: string;
      benefit: string;
      examples: string;
    }>;
    avoid: Array<{
      item: string;
      reason: string;
      alternatives: string;
    }>;
    supplements: Array<{
      name: string;
      dosage: string;
      benefit: string;
      precautions: string;
    }>;
  };
  symptomTrends: {
    data: Array<{
      day: number;
      severity: number;
      symptoms: number;
      fever: number;
      energy: number;
    }>;
  };
  recoveryMetrics: {
    expectedRecoveryTime: string;
    recoveryFactors: Array<{
      factor: string;
      importance: string;
      impact: string;
      recommendations: string;
    }>;
    potentialComplications: Array<{
      name: string;
      probability: string;
      warningSigns: string[];
      prevention: string;
    }>;
    recoveryIndicators: Array<{
      indicator: string;
      timeline: string;
      significance: string;
    }>;
  };
  exerciseGuidelines: {
    recommended: Array<{
      activity: string;
      duration: string;
      frequency: string;
      benefits: string;
    }>;
    avoid: Array<{
      activity: string;
      reason: string;
      alternative: string;
    }>;
    duration: string;
    precautions: string;
  };
  sleepRecommendations: {
    duration: string;
    position: string;
    environment: string;
    tips: string[];
  };
  followUpSchedule: {
    nextCheck: string;
    monitoringPoints: Array<{
      point: string;
      frequency: string;
      normalRange?: string;
      action: string;
      scale?: string;
      indicators?: string;
    }>;
  };
  symptomSeverity: { [key: string]: SymptomSeverity };
  symptomTimeline: SymptomTimeline;
  relatedConditions: Array<{
    name: string;
    probability: number;
    symptoms: string[];
    riskFactors: string[];
  }>;
  medicationInteractions: Array<{
    medication: string;
    symptoms: string[];
    interaction: string;
    recommendation: string;
    severity: 'mild' | 'moderate' | 'severe';
  }>;
  environmentalTriggers: Array<{
    trigger: string;
    symptoms: string[];
    impact: string;
    avoidance: string;
    management: string;
  }>;
}

// Define constants outside component
const commonSymptoms = [
  'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
  'Body aches', 'Fatigue', 'Nausea', 'Vomiting', 'Diarrhea',
  'Chest pain', 'Shortness of breath', 'Dizziness', 'Rash', 'Joint pain',
  'Loss of appetite', 'Muscle weakness', 'Confusion', 'Blurred vision', 'Abdominal pain',
  'Chills', 'Sweating', 'Swollen lymph nodes', 'Difficulty swallowing', 'Ear pain',
  'Sinus pressure', 'Post-nasal drip', 'Wheezing', 'Chest congestion', 'Loss of taste/smell'
];

const symptomCategories: SymptomCategory = {
  'Respiratory': ['Cough', 'Shortness of breath', 'Chest pain', 'Wheezing', 'Chest congestion'],
  'General': ['Fever', 'Fatigue', 'Chills', 'Sweating', 'Loss of appetite'],
  'Head & Neck': ['Headache', 'Sore throat', 'Runny nose', 'Sinus pressure', 'Ear pain'],
  'Digestive': ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Difficulty swallowing'],
  'Neurological': ['Dizziness', 'Confusion', 'Muscle weakness', 'Blurred vision'],
};

// Define common data structures
const commonData = {
  baseRecommendations: [
    "Rest and stay hydrated",
    "Monitor symptoms for changes",
    "Practice good hygiene"
  ],
  baseWarningSigns: [
    "Difficulty breathing",
    "Severe pain",
    "High fever (>38.5°C)",
    "Confusion or disorientation"
  ],
  baseLifestyleAdjustments: [
    "Get adequate rest",
    "Stay hydrated",
    "Maintain regular exercise",
    "Practice stress management",
    "Follow a balanced diet"
  ],
  basePreventionTips: [
    "Maintain good hygiene",
    "Get adequate sleep",
    "Exercise regularly",
    "Eat a balanced diet",
    "Manage stress"
  ]
};

// Helper function to generate common analysis components
const generateCommonAnalysis = (condition: string, symptoms: string[], severity: string) => {
  return {
    recommendations: [...commonData.baseRecommendations, ...(conditionSpecificData.recommendations[condition] || [])],
    whenToSeekHelp: [...commonData.baseWarningSigns, ...(conditionSpecificData.warningSigns[condition] || [])],
    lifestyleAdjustments: conditionSpecificData.lifestyleAdjustments[condition] || commonData.baseLifestyleAdjustments,
    prevention: conditionSpecificData.preventionTips[condition] || commonData.basePreventionTips
  };
};

// Consolidate condition-specific data
const conditionSpecificData = {
  recommendations: {
    "Viral Upper Respiratory Infection": [
      "Use a humidifier to ease congestion",
      "Consider over-the-counter pain relievers",
      "Use saline nasal spray"
    ],
    "Seasonal Allergies": [
      "Take antihistamines as directed",
      "Use air purifier",
      "Keep windows closed during high pollen times"
    ],
    "Gastroenteritis": [
      "Follow BRAT diet (Bananas, Rice, Applesauce, Toast)",
      "Stay hydrated with electrolyte solutions",
      "Avoid dairy and spicy foods"
    ],
    "Migraine": [
      "Rest in a dark, quiet room",
      "Apply cold compress to head",
      "Take prescribed medication as directed"
    ],
    "Anxiety": [
      "Practice deep breathing exercises",
      "Consider meditation or relaxation techniques",
      "Maintain regular sleep schedule"
    ]
  },
  warningSigns: {
    "Viral Upper Respiratory Infection": [
      "Worsening cough",
      "Chest pain",
      "Difficulty swallowing"
    ],
    "Seasonal Allergies": [
      "Severe wheezing",
      "Swelling of face or throat",
      "Difficulty breathing"
    ],
    "Gastroenteritis": [
      "Severe dehydration",
      "Blood in stool",
      "Persistent vomiting"
    ],
    "Migraine": [
      "Sudden severe headache",
      "Vision changes",
      "Difficulty speaking"
    ],
    "Anxiety": [
      "Chest pain with sweating",
      "Rapid heartbeat",
      "Feeling of impending doom"
    ]
  },
  lifestyleAdjustments: {
    "Viral Upper Respiratory Infection": [
      "Get adequate rest",
      "Stay hydrated",
      "Use humidifier",
      "Avoid smoking and secondhand smoke",
      "Practice good hand hygiene"
    ],
    "Seasonal Allergies": [
      "Monitor pollen counts",
      "Keep windows closed during high pollen times",
      "Use air purifier",
      "Shower after outdoor activities",
      "Wash bedding regularly"
    ],
    "Gastroenteritis": [
      "Follow BRAT diet",
      "Stay hydrated",
      "Avoid caffeine and alcohol",
      "Rest as needed",
      "Practice good food hygiene"
    ],
    "Migraine": [
      "Maintain regular sleep schedule",
      "Stay hydrated",
      "Avoid trigger foods",
      "Manage stress",
      "Exercise regularly"
    ],
    "Anxiety": [
      "Practice regular exercise",
      "Maintain sleep schedule",
      "Limit caffeine",
      "Practice relaxation techniques",
      "Stay connected with support system"
    ]
  },
  preventionTips: {
    "Viral Upper Respiratory Infection": [
      "Wash hands frequently",
      "Avoid close contact with sick people",
      "Cover mouth when coughing",
      "Get adequate sleep",
      "Maintain a healthy diet"
    ],
    "Seasonal Allergies": [
      "Monitor pollen forecasts",
      "Keep windows closed during high pollen times",
      "Use air purifier",
      "Wash bedding regularly",
      "Consider allergy medication"
    ],
    "Gastroenteritis": [
      "Wash hands before eating",
      "Cook food thoroughly",
      "Avoid raw foods",
      "Practice good food hygiene",
      "Stay hydrated"
    ],
    "Migraine": [
      "Identify and avoid triggers",
      "Maintain regular sleep schedule",
      "Stay hydrated",
      "Manage stress",
      "Exercise regularly"
    ],
    "Anxiety": [
      "Practice regular exercise",
      "Maintain sleep schedule",
      "Limit caffeine and alcohol",
      "Practice relaxation techniques",
      "Stay connected with support system"
    ]
  }
};

// Add new interfaces for enhanced analysis
interface SymptomCombination {
  symptoms: string[];
  pattern: string;
  likelyConditions: string[];
  management: string;
  warningSigns: string[];
}

interface MedicationInteraction {
  medication: string;
  symptoms: string[];
  interaction: string;
  recommendation: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface EnvironmentalTrigger {
  trigger: string;
  symptoms: string[];
  impact: string;
  avoidance: string;
  management: string;
}

// Add new helper functions for enhanced analysis
const generateSymptomCombinations = (symptoms: string[]): SymptomCombination[] => {
  const combinations: SymptomCombination[] = [];
  
  // Respiratory pattern
  if (symptoms.some(s => ['fever', 'cough', 'sore throat', 'runny nose'].includes(s.toLowerCase()))) {
    combinations.push({
      symptoms: symptoms.filter(s => ['fever', 'cough', 'sore throat', 'runny nose'].includes(s.toLowerCase())),
      pattern: 'Respiratory',
      likelyConditions: ['Upper Respiratory Infection', 'Common Cold', 'Flu'],
      management: 'Rest, stay hydrated, use humidifier, consider OTC medications',
      warningSigns: ['Difficulty breathing', 'Chest pain', 'High fever']
    });
  }

  // Gastrointestinal pattern
  if (symptoms.some(s => ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'].includes(s.toLowerCase()))) {
    combinations.push({
      symptoms: symptoms.filter(s => ['nausea', 'vomiting', 'diarrhea', 'abdominal pain'].includes(s.toLowerCase())),
      pattern: 'Gastrointestinal',
      likelyConditions: ['Gastroenteritis', 'Food Poisoning', 'Stomach Flu'],
      management: 'BRAT diet, stay hydrated, rest',
      warningSigns: ['Severe dehydration', 'Blood in stool', 'Severe abdominal pain']
    });
  }

  // Neurological pattern
  if (symptoms.some(s => ['headache', 'dizziness', 'confusion', 'blurred vision'].includes(s.toLowerCase()))) {
    combinations.push({
      symptoms: symptoms.filter(s => ['headache', 'dizziness', 'confusion', 'blurred vision'].includes(s.toLowerCase())),
      pattern: 'Neurological',
      likelyConditions: ['Migraine', 'Vertigo', 'Concussion'],
      management: 'Rest in dark room, avoid triggers, stay hydrated',
      warningSigns: ['Severe headache', 'Loss of consciousness', 'Seizures']
    });
  }

  // Musculoskeletal pattern
  if (symptoms.some(s => ['body aches', 'joint pain', 'muscle weakness'].includes(s.toLowerCase()))) {
    combinations.push({
      symptoms: symptoms.filter(s => ['body aches', 'joint pain', 'muscle weakness'].includes(s.toLowerCase())),
      pattern: 'Musculoskeletal',
      likelyConditions: ['Viral Infection', 'Fibromyalgia', 'Arthritis'],
      management: 'Rest, gentle stretching, pain management',
      warningSigns: ['Severe pain', 'Inability to move', 'Joint swelling']
    });
  }

  return combinations;
};

const generateMedicationInteractions = (symptoms: string[]): MedicationInteraction[] => {
  const interactions: MedicationInteraction[] = [];
  
  // Pain and fever medications
  if (symptoms.some(s => ['fever', 'headache', 'body aches'].includes(s.toLowerCase()))) {
    interactions.push({
      medication: 'Aspirin',
      symptoms: ['Fever', 'Headache', 'Body aches'],
      interaction: 'May increase risk of bleeding',
      recommendation: 'Consider acetaminophen instead',
      severity: 'moderate'
    });
    interactions.push({
      medication: 'Ibuprofen',
      symptoms: ['Fever', 'Headache', 'Body aches'],
      interaction: 'May cause stomach upset',
      recommendation: 'Take with food',
      severity: 'mild'
    });
  }

  // Cough and cold medications
  if (symptoms.some(s => ['cough', 'runny nose', 'sore throat'].includes(s.toLowerCase()))) {
    interactions.push({
      medication: 'Decongestants',
      symptoms: ['Runny nose', 'Sinus pressure'],
      interaction: 'May increase blood pressure',
      recommendation: 'Avoid if you have high blood pressure',
      severity: 'moderate'
    });
    interactions.push({
      medication: 'Antihistamines',
      symptoms: ['Runny nose', 'Sneezing'],
      interaction: 'May cause drowsiness',
      recommendation: 'Avoid driving or operating machinery',
      severity: 'mild'
    });
  }

  // Gastrointestinal medications
  if (symptoms.some(s => ['nausea', 'vomiting', 'diarrhea'].includes(s.toLowerCase()))) {
    interactions.push({
      medication: 'Anti-diarrheals',
      symptoms: ['Diarrhea'],
      interaction: 'May cause constipation',
      recommendation: 'Use only as directed',
      severity: 'mild'
    });
    interactions.push({
      medication: 'Anti-nausea medications',
      symptoms: ['Nausea', 'Vomiting'],
      interaction: 'May cause drowsiness',
      recommendation: 'Avoid driving or operating machinery',
      severity: 'moderate'
    });
  }

  return interactions;
};

const generateEnvironmentalTriggers = (symptoms: string[]): EnvironmentalTrigger[] => {
  const triggers: EnvironmentalTrigger[] = [];
  
  // Respiratory triggers
  if (symptoms.some(s => ['cough', 'runny nose', 'sore throat'].includes(s.toLowerCase()))) {
    triggers.push({
      trigger: 'Dry air',
      symptoms: ['Cough', 'Sore throat'],
      impact: 'Worsens symptoms',
      avoidance: 'Use humidifier, stay hydrated',
      management: 'Maintain 40-60% humidity'
    });
    triggers.push({
      trigger: 'Cold air',
      symptoms: ['Cough', 'Runny nose'],
      impact: 'Triggers symptoms',
      avoidance: 'Cover mouth and nose in cold weather',
      management: 'Stay warm, use scarf'
    });
  }

  // Allergic triggers
  if (symptoms.some(s => ['runny nose', 'sneezing', 'rash'].includes(s.toLowerCase()))) {
    triggers.push({
      trigger: 'Pollen',
      symptoms: ['Runny nose', 'Sneezing'],
      impact: 'Triggers allergic response',
      avoidance: 'Check pollen count, stay indoors during high counts',
      management: 'Use air purifier, take antihistamines'
    });
    triggers.push({
      trigger: 'Dust',
      symptoms: ['Runny nose', 'Sneezing', 'Cough'],
      impact: 'Worsens symptoms',
      avoidance: 'Regular cleaning, use air purifier',
      management: 'Wear mask while cleaning'
    });
  }

  // Neurological triggers
  if (symptoms.some(s => ['headache', 'dizziness'].includes(s.toLowerCase()))) {
    triggers.push({
      trigger: 'Bright lights',
      symptoms: ['Headache', 'Eye strain'],
      impact: 'Triggers or worsens headache',
      avoidance: 'Wear sunglasses, dim lights',
      management: 'Rest in dark room'
    });
    triggers.push({
      trigger: 'Loud noises',
      symptoms: ['Headache', 'Dizziness'],
      impact: 'Worsens symptoms',
      avoidance: 'Use earplugs, avoid noisy environments',
      management: 'Rest in quiet environment'
    });
  }

  return triggers;
};

const generateSymptomSeverity = (symptoms: string[]) => {
  const severity: Record<string, SymptomSeverity> = {};
  symptoms.forEach(symptom => {
    severity[symptom] = {
      level: "moderate",
      description: "Moderate impact on daily activities",
      impact: "May affect daily activities",
      management: "Monitor and treat as needed"
    };
  });
  return severity;
};

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [symptomHistory, setSymptomHistory] = useState<AnalysisData[]>([]);

  const determinePrimaryCondition = (symptoms: string[]) => {
    // Define common condition patterns
    const conditionPatterns = {
      "Viral Upper Respiratory Infection": {
        primarySymptoms: ["Fever", "Cough", "Sore throat", "Runny nose"],
        secondarySymptoms: ["Fatigue", "Body aches", "Headache"],
        probability: 0
      },
      "Seasonal Allergies": {
        primarySymptoms: ["Runny nose", "Sneezing", "Itchy eyes"],
        secondarySymptoms: ["Post-nasal drip", "Cough", "Fatigue"],
        probability: 0
      },
      "Gastroenteritis": {
        primarySymptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain"],
        secondarySymptoms: ["Fever", "Fatigue", "Loss of appetite"],
        probability: 0
      },
      "Migraine": {
        primarySymptoms: ["Headache", "Nausea", "Sensitivity to light"],
        secondarySymptoms: ["Fatigue", "Dizziness", "Blurred vision"],
        probability: 0
      },
      "Anxiety": {
        primarySymptoms: ["Chest pain", "Shortness of breath", "Dizziness"],
        secondarySymptoms: ["Fatigue", "Muscle tension", "Sweating"],
        probability: 0
      }
    };

    // Calculate probability for each condition
    Object.keys(conditionPatterns).forEach(condition => {
      const pattern = conditionPatterns[condition];
      let score = 0;
      
      // Check primary symptoms (weighted more heavily)
      pattern.primarySymptoms.forEach(symptom => {
        if (symptoms.includes(symptom)) score += 2;
      });
      
      // Check secondary symptoms
      pattern.secondarySymptoms.forEach(symptom => {
        if (symptoms.includes(symptom)) score += 1;
      });
      
      pattern.probability = score;
    });

    // Find the condition with highest probability
    let maxCondition = Object.keys(conditionPatterns)[0];
    let maxProbability = conditionPatterns[maxCondition].probability;

    Object.keys(conditionPatterns).forEach(condition => {
      if (conditionPatterns[condition].probability > maxProbability) {
        maxCondition = condition;
        maxProbability = conditionPatterns[condition].probability;
      }
    });

    return {
      name: maxCondition,
      symptoms: [...conditionPatterns[maxCondition].primarySymptoms, ...conditionPatterns[maxCondition].secondarySymptoms],
      probability: maxProbability
    };
  };

  const determineSeverityLevel = (symptoms: string[], userSeverity: string) => {
    const severityFactors = {
      "Fever": 3,
      "Chest pain": 3,
      "Shortness of breath": 3,
      "Severe headache": 3,
      "Confusion": 3,
      "Vomiting": 2,
      "Diarrhea": 2,
      "Fatigue": 1,
      "Cough": 1,
      "Runny nose": 1
    };

    let severityScore = 0;
    symptoms.forEach(symptom => {
      severityScore += severityFactors[symptom] || 1;
    });

    // Adjust based on user-reported severity
    switch(userSeverity) {
      case "mild":
        severityScore *= 0.7;
        break;
      case "moderate":
        severityScore *= 1;
        break;
      case "severe":
        severityScore *= 1.5;
        break;
    }

    if (severityScore >= 8) return "Severe";
    if (severityScore >= 5) return "Moderate";
    return "Mild";
  };

  const calculateConfidenceScore = (symptoms: string[], severityLevel: string) => {
    const baseScore = 70;
    const symptomCount = symptoms.length;
    const severityMultiplier = severityLevel === "Severe" ? 1.2 : severityLevel === "Moderate" ? 1 : 0.8;
    
    return Math.min(95, Math.round(baseScore + (symptomCount * 2) * severityMultiplier));
  };

  const generateRecommendations = (symptoms: string[], severity: string) => {
    const recommendations = new Set<string>();
    
    // Add base recommendations
    recommendations.add("Rest and stay hydrated");
    recommendations.add("Monitor symptoms for changes");
    
    // Add symptom-specific recommendations
    symptoms.forEach(symptom => {
      switch(symptom.toLowerCase()) {
        case 'fever':
          recommendations.add("Take fever-reducing medication as needed");
          recommendations.add("Use cool compresses");
          break;
        case 'cough':
          recommendations.add("Use a humidifier");
          recommendations.add("Consider over-the-counter cough medicine");
          break;
        case 'sore throat':
          recommendations.add("Gargle with warm salt water");
          recommendations.add("Use throat lozenges");
          break;
        case 'headache':
          recommendations.add("Rest in a dark, quiet room");
          recommendations.add("Take pain relievers as directed");
          break;
        case 'nausea':
          recommendations.add("Eat small, frequent meals");
          recommendations.add("Avoid spicy or greasy foods");
          break;
      }
    });

    // Add severity-based recommendations
    if (severity === 'severe') {
      recommendations.add("Seek medical attention if symptoms worsen");
      recommendations.add("Keep a symptom diary");
    }

    return Array.from(recommendations);
  };

  const determineUrgency = (symptoms: string[], severityLevel: string) => {
    const urgentSymptoms = ["Chest pain", "Shortness of breath", "Severe headache", "Confusion"];
    const hasUrgentSymptom = symptoms.some(symptom => urgentSymptoms.includes(symptom));
    
    if (hasUrgentSymptom || severityLevel === "Severe") {
      return "Seek immediate medical attention";
    } else if (severityLevel === "Moderate") {
      return "Schedule a doctor's appointment";
    }
    return "Monitor symptoms";
  };

  const generateEmergencyContacts = (symptoms: string[], severityLevel: string): EmergencyContact[] => {
    const contacts: EmergencyContact[] = [
      {
        type: "Emergency Services",
        number: "911",
        hours: "24/7",
        afterHours: "24/7",
        services: "Emergency medical care, Ambulance",
        whenToCall: "Life-threatening emergencies"
      },
      {
        type: "Poison Control",
        number: "1-800-222-1222",
        hours: "24/7",
        afterHours: "24/7",
        services: "Poison information, Emergency guidance",
        whenToCall: "Suspected poisoning or overdose"
      }
    ];

    if (severityLevel === "Severe") {
      contacts.push({
        type: "Local Hospital",
        number: "555-0123",
        hours: "24/7",
        afterHours: "24/7",
        services: "Emergency care, Specialized treatment",
        whenToCall: "Severe symptoms or complications"
      });
    }

    return contacts;
  };

  const generateNearbyFacilities = (symptoms: string[]) => {
    return [
      {
        name: "City General Hospital",
        distance: "2.5 miles",
        type: "Hospital",
        services: ["Emergency care", "Specialized treatment"],
        hours: "24/7"
      },
      {
        name: "Community Urgent Care",
        distance: "1.2 miles",
        type: "Urgent Care",
        services: ["Urgent care", "Basic treatment"],
        hours: "8 AM - 8 PM"
      }
    ];
  };

  const generateSimilarConditions = (primaryCondition: any, symptoms: string[]) => {
    return [
      {
        name: "Alternative Condition 1",
        probability: 0.3,
        symptoms: ["Symptom 1", "Symptom 2"],
        keyDifferences: ["Different symptom pattern", "Different severity"],
        treatment: "Alternative treatment approach"
      },
      {
        name: "Alternative Condition 2",
        probability: 0.2,
        symptoms: ["Symptom 3", "Symptom 4"],
        keyDifferences: ["Different onset", "Different duration"],
        treatment: "Different medication regimen"
      }
    ];
  };

  const generateRiskFactors = (primaryCondition: any, symptoms: string[]) => {
    return [
      {
        factor: "Age",
        level: "Moderate",
        description: "Age-related risk factor",
        impact: "Increases susceptibility",
        explanation: "Natural decline in immune function"
      },
      {
        factor: "Pre-existing conditions",
        level: "High",
        description: "Underlying health conditions",
        impact: "Complicates recovery",
        explanation: "May interfere with treatment"
      },
      {
        factor: "Lifestyle factors",
        level: "Low",
        description: "Daily habits and routines",
        impact: "Affects recovery rate",
        explanation: "Can be modified to improve outcomes"
      }
    ];
  };

  const generateTimeline = (primaryCondition: any, symptoms: string[]) => {
    return {
      onset: "2-3 days ago",
      progression: "Gradual",
      expectedDuration: "7-10 days",
      stages: [
        {
          day: 1,
          description: "Initial symptoms appear",
          symptoms: ["Fever", "Fatigue"],
          recommendations: ["Rest", "Stay hydrated"]
        },
        {
          day: 3,
          description: "Symptoms peak",
          symptoms: ["Fever", "Cough", "Body aches"],
          recommendations: ["Take medication", "Monitor temperature"]
        },
        {
          day: 7,
          description: "Recovery phase",
          symptoms: ["Mild cough", "Fatigue"],
          recommendations: ["Gradual return to activity", "Continue hydration"]
        }
      ]
    };
  };

  const generateSymptomAnalysis = (symptoms: string[], severity: string) => {
    return {
      primarySymptoms: symptoms.slice(0, 3).map(symptom => ({
        name: symptom,
        severity: severity,
        duration: "3-5 days",
        pattern: "Progressive",
        impact: "Moderate impact on daily activities",
        management: "Rest and medication as needed"
      })),
      secondarySymptoms: symptoms.slice(3).map(symptom => ({
        name: symptom,
        severity: "Mild",
        duration: "2-3 days",
        pattern: "Intermittent",
        impact: "Minimal impact on daily activities",
        management: "Monitor and treat as needed"
      })),
      symptomPattern: "Progressive",
      symptomSeverity: severity,
      symptomProgression: "Gradual",
      symptomInteractions: [
        {
          symptoms: ["Fever", "Fatigue"],
          interaction: "Fever may worsen fatigue",
          management: "Rest and stay hydrated"
        }
      ]
    };
  };

  const generateTreatmentOptions = (primaryCondition: any, symptoms: string[]) => {
    const medicationDatabase = {
      "Viral Upper Respiratory Infection": [
        {
          name: "Acetaminophen (Tylenol)",
          purpose: "Pain relief and fever reduction",
          dosage: "500-1000mg every 4-6 hours",
          maxDailyDose: "4000mg",
          precautions: "Do not exceed 4000mg per day, avoid alcohol",
          interactions: "May interact with blood thinners and alcohol",
          sideEffects: ["Nausea", "Liver problems in high doses"],
          whenToTake: "With or without food",
          storage: "Room temperature, away from moisture",
          brandNames: ["Tylenol", "Panadol"],
          category: "Analgesic/Antipyretic"
        },
        {
          name: "Ibuprofen (Advil)",
          purpose: "Anti-inflammatory and pain relief",
          dosage: "200-400mg every 4-6 hours",
          maxDailyDose: "3200mg",
          precautions: "Take with food, avoid if history of stomach ulcers",
          interactions: "May interact with blood pressure medications and aspirin",
          sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
          whenToTake: "With food",
          storage: "Room temperature",
          brandNames: ["Advil", "Motrin"],
          category: "NSAID"
        },
        {
          name: "Pseudoephedrine (Sudafed)",
          purpose: "Nasal decongestant",
          dosage: "30-60mg every 4-6 hours",
          maxDailyDose: "240mg",
          precautions: "Avoid if high blood pressure",
          interactions: "May interact with MAOIs and blood pressure medications",
          sideEffects: ["Insomnia", "Nervousness", "Increased heart rate"],
          whenToTake: "Morning and afternoon",
          storage: "Room temperature",
          brandNames: ["Sudafed"],
          category: "Decongestant"
        }
      ],
      "Seasonal Allergies": [
        {
          name: "Cetirizine (Zyrtec)",
          purpose: "Antihistamine for allergy relief",
          dosage: "10mg once daily",
          maxDailyDose: "10mg",
          precautions: "May cause drowsiness",
          interactions: "May interact with alcohol and sedatives",
          sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
          whenToTake: "Evening",
          storage: "Room temperature",
          brandNames: ["Zyrtec"],
          category: "Antihistamine"
        },
        {
          name: "Fluticasone (Flonase)",
          purpose: "Nasal steroid for allergy symptoms",
          dosage: "2 sprays each nostril once daily",
          maxDailyDose: "2 sprays per nostril",
          precautions: "Shake well before use",
          interactions: "Minimal drug interactions",
          sideEffects: ["Nasal irritation", "Headache"],
          whenToTake: "Morning",
          storage: "Room temperature",
          brandNames: ["Flonase"],
          category: "Nasal Corticosteroid"
        }
      ],
      "Gastroenteritis": [
        {
          name: "Loperamide (Imodium)",
          purpose: "Anti-diarrheal",
          dosage: "2mg after each loose stool",
          maxDailyDose: "16mg",
          precautions: "Not for use with bloody diarrhea",
          interactions: "May interact with certain antibiotics",
          sideEffects: ["Constipation", "Dizziness"],
          whenToTake: "As needed",
          storage: "Room temperature",
          brandNames: ["Imodium"],
          category: "Anti-diarrheal"
        },
        {
          name: "Bismuth Subsalicylate (Pepto-Bismol)",
          purpose: "Relieves nausea and diarrhea",
          dosage: "2 tablets every 30-60 minutes",
          maxDailyDose: "8 doses",
          precautions: "May cause black stools",
          interactions: "May interact with blood thinners",
          sideEffects: ["Black stools", "Constipation"],
          whenToTake: "As needed",
          storage: "Room temperature",
          brandNames: ["Pepto-Bismol"],
          category: "Antacid/Antidiarrheal"
        }
      ]
    };

    const defaultMedications = [
      {
        name: "Acetaminophen (Tylenol)",
        purpose: "Pain relief and fever reduction",
        dosage: "500-1000mg every 4-6 hours",
        maxDailyDose: "4000mg",
        precautions: "Do not exceed 4000mg per day",
        interactions: "May interact with blood thinners",
        sideEffects: ["Nausea", "Liver problems in high doses"],
        whenToTake: "With or without food",
        storage: "Room temperature",
        brandNames: ["Tylenol", "Panadol"],
        category: "Analgesic/Antipyretic"
      }
    ];

    return {
      medications: medicationDatabase[primaryCondition.name] || defaultMedications,
      homeRemedies: [
        {
          name: "Warm salt water gargle",
          purpose: "Soothe sore throat",
          instructions: "Mix 1/4 teaspoon salt in 8oz warm water",
          precautions: "Do not swallow",
          frequency: "Every 2-3 hours",
          duration: "30 seconds per gargle",
          benefits: "Reduces inflammation and kills bacteria"
        },
        {
          name: "Steam inhalation",
          purpose: "Relieve congestion",
          instructions: "Inhale steam from hot water for 5-10 minutes",
          precautions: "Be careful not to burn yourself",
          frequency: "2-3 times daily",
          duration: "5-10 minutes",
          benefits: "Loosens mucus and opens airways"
        },
        {
          name: "Honey and lemon tea",
          purpose: "Soothe throat and boost immunity",
          instructions: "Mix 1 tablespoon honey and lemon juice in warm water",
          precautions: "Not for children under 1 year",
          frequency: "2-3 times daily",
          duration: "As needed",
          benefits: "Antibacterial and soothing properties"
        }
      ],
      medicationSchedule: {
        morning: medicationDatabase[primaryCondition.name]?.filter(med => med.whenToTake === "Morning") || [],
        afternoon: medicationDatabase[primaryCondition.name]?.filter(med => med.whenToTake === "Afternoon") || [],
        evening: medicationDatabase[primaryCondition.name]?.filter(med => med.whenToTake === "Evening") || [],
        asNeeded: medicationDatabase[primaryCondition.name]?.filter(med => med.whenToTake === "As needed") || []
      }
    };
  };

  const generateEnvironmentalFactors = (primaryCondition: any) => {
    return {
      triggers: [
        {
          factor: "Cold air",
          impact: "Worsens respiratory symptoms",
          management: "Wear scarf over mouth in cold weather"
        },
        {
          factor: "Dry air",
          impact: "Irritates throat and nasal passages",
          management: "Use humidifier"
        }
      ],
      aggravatingFactors: [
        {
          factor: "Smoke exposure",
          impact: "Increases respiratory irritation",
          management: "Avoid smoking and secondhand smoke"
        },
        {
          factor: "Dust",
          impact: "Triggers allergic reactions",
          management: "Regular cleaning and air filtration"
        }
      ],
      relievingFactors: [
        {
          factor: "Humid environment",
          impact: "Soothes respiratory symptoms",
          management: "Maintain 40-60% humidity"
        },
        {
          factor: "Clean air",
          impact: "Reduces symptom severity",
          management: "Use air purifier"
        }
      ]
    };
  };

  const generateDietaryRecommendations = (primaryCondition: any) => {
    return {
      recommended: [
        {
          item: "Clear broths",
          benefit: "Hydration and electrolytes",
          examples: "Chicken soup, vegetable broth"
        },
        {
          item: "Soft foods",
          benefit: "Easy to digest",
          examples: "Bananas, rice, applesauce"
        }
      ],
      avoid: [
        {
          item: "Spicy foods",
          reason: "May irritate throat and digestive system",
          alternatives: "Mild seasonings, herbs"
        },
        {
          item: "Dairy products",
          reason: "May increase mucus production",
          alternatives: "Plant-based milk alternatives"
        }
      ],
      supplements: [
        {
          name: "Vitamin C",
          dosage: "500-1000mg daily",
          benefit: "Supports immune system",
          precautions: "May cause digestive upset in high doses"
        },
        {
          name: "Zinc",
          dosage: "15-30mg daily",
          benefit: "Supports immune function",
          precautions: "Take with food to prevent nausea"
        }
      ]
    };
  };

  const generateSymptomTrends = (symptoms: string[]) => {
    return {
      data: [
        {
          day: 1,
          severity: 3,
          symptoms: 2,
          fever: 38.5,
          energy: 2
        },
        {
          day: 2,
          severity: 4,
          symptoms: 3,
          fever: 39.0,
          energy: 1
        },
        {
          day: 3,
          severity: 3,
          symptoms: 3,
          fever: 38.0,
          energy: 2
        },
        {
          day: 4,
          severity: 2,
          symptoms: 2,
          fever: 37.5,
          energy: 3
        }
      ]
    };
  };

  const generateRecoveryMetrics = (primaryCondition: any) => {
    return {
      expectedRecoveryTime: "7-10 days",
      recoveryFactors: [
        {
          factor: "Rest",
          importance: "High",
          impact: "Significantly improves recovery",
          recommendations: "Get 8-10 hours of sleep daily"
        },
        {
          factor: "Hydration",
          importance: "High",
          impact: "Essential for recovery",
          recommendations: "Drink 2-3 liters of water daily"
        }
      ],
      potentialComplications: [
        {
          name: "Secondary infection",
          probability: "Low",
          warningSigns: ["Worsening symptoms", "New symptoms"],
          prevention: "Maintain good hygiene"
        },
        {
          name: "Dehydration",
          probability: "Medium",
          warningSigns: ["Dark urine", "Dizziness"],
          prevention: "Regular fluid intake"
        }
      ],
      recoveryIndicators: [
        {
          indicator: "Energy level",
          timeline: "Improves by day 5",
          significance: "Key indicator of recovery"
        },
        {
          indicator: "Symptom severity",
          timeline: "Decreases by day 3",
          significance: "Shows treatment effectiveness"
        }
      ]
    };
  };

  const generateExerciseGuidelines = (primaryCondition: any) => {
    return {
      recommended: [
        {
          activity: "Light walking",
          duration: "10-15 minutes",
          frequency: "2-3 times daily",
          benefits: "Improves circulation and energy"
        },
        {
          activity: "Gentle stretching",
          duration: "5-10 minutes",
          frequency: "Daily",
          benefits: "Maintains flexibility"
        }
      ],
      avoid: [
        {
          activity: "High-intensity exercise",
          reason: "May worsen symptoms",
          alternative: "Light walking"
        },
        {
          activity: "Contact sports",
          reason: "Risk of injury",
          alternative: "Individual exercises"
        }
      ],
      duration: "Start with 10 minutes, gradually increase",
      precautions: "Stop if symptoms worsen"
    };
  };

  const generateSleepRecommendations = (primaryCondition: any) => {
    return {
      duration: "7-9 hours",
      position: "Elevated head",
      environment: "Cool, dark, quiet",
      tips: ["Tip 1", "Tip 2"]
    };
  };

  const generateFollowUpSchedule = (primaryCondition: any, severityLevel: string) => {
    return {
      nextCheck: "24 hours",
      monitoringPoints: [
        {
          point: "Temperature",
          frequency: "Every 4 hours",
          normalRange: "36.1-37.2°C",
          action: "Seek medical help if above 38.5°C",
          scale: "Celsius",
          indicators: "Fever, chills"
        },
        {
          point: "Symptom severity",
          frequency: "Daily",
          action: "Track changes in severity",
          indicators: "Pain level, energy level"
        },
        {
          point: "Hydration",
          frequency: "Daily",
          action: "Monitor fluid intake",
          indicators: "Urine color, thirst level"
        }
      ]
    };
  };

  const generateSymptomTimeline = (symptoms: string[]) => {
    return {
      onset: "2-3 days ago",
      peak: "1-2 days ago",
      resolution: "Expected in 3-4 days",
      stages: [
        {
          day: 1,
          description: "Initial symptoms appear",
          symptoms: ["Fever", "Fatigue"],
          recommendations: ["Rest", "Stay hydrated"]
        },
        {
          day: 3,
          description: "Symptoms peak",
          symptoms: ["Fever", "Cough", "Body aches"],
          recommendations: ["Take medication", "Monitor temperature"]
        },
        {
          day: 7,
          description: "Recovery phase",
          symptoms: ["Mild cough", "Fatigue"],
          recommendations: ["Gradual return to activity", "Continue hydration"]
        }
      ]
    };
  };

  const generateRelatedConditions = (symptoms: string[]) => {
    return [
      {
        name: "Influenza",
        probability: 0.3,
        symptoms: ["Fever", "Cough", "Body aches"],
        riskFactors: ["Age", "Weakened immune system"]
      },
      {
        name: "Common Cold",
        probability: 0.2,
        symptoms: ["Runny nose", "Sore throat", "Cough"],
        riskFactors: ["Exposure to cold", "Stress"]
      }
    ];
  };

  const generateMedicationInteractions = (symptoms: string[]) => {
    return [
      {
        medication: "Acetaminophen",
        symptoms: ["Fever", "Pain"],
        interaction: "May interact with blood thinners",
        recommendation: "Consult doctor if taking blood thinners",
        severity: "moderate" as const
      },
      {
        medication: "Ibuprofen",
        symptoms: ["Fever", "Inflammation"],
        interaction: "May increase blood pressure",
        recommendation: "Monitor blood pressure",
        severity: "mild" as const
      }
    ];
  };

  const generateEnvironmentalTriggers = (symptoms: string[]) => {
    return [
      {
        trigger: "Cold air",
        symptoms: ["Cough", "Runny nose"],
        impact: "Worsens respiratory symptoms",
        avoidance: "Wear scarf over mouth",
        management: "Use humidifier indoors"
      },
      {
        trigger: "Dust",
        symptoms: ["Sneezing", "Runny nose"],
        impact: "Triggers allergic response",
        avoidance: "Regular cleaning",
        management: "Use air purifier"
      }
    ];
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    }
  };

  const analyzeSymptoms = () => {
    setLoading(true);
    setTimeout(() => {
      const primaryCondition = determinePrimaryCondition(selectedSymptoms);
      const severityLevel = determineSeverityLevel(selectedSymptoms, severity);
      const confidenceScore = calculateConfidenceScore(selectedSymptoms, severityLevel);
      
      const mockAnalysis: AnalysisData = {
        condition: primaryCondition.name,
        confidence: confidenceScore,
        severity: severityLevel,
        urgency: determineUrgency(selectedSymptoms, severityLevel),
        recommendations: generateRecommendations(selectedSymptoms, severityLevel),
        whenToSeekHelp: [...commonData.baseWarningSigns, ...(conditionSpecificData.warningSigns[primaryCondition.name] || [])],
        lifestyleAdjustments: conditionSpecificData.lifestyleAdjustments[primaryCondition.name] || commonData.baseLifestyleAdjustments,
        prevention: conditionSpecificData.preventionTips[primaryCondition.name] || commonData.basePreventionTips,
        emergencyContacts: generateEmergencyContacts(selectedSymptoms, severityLevel),
        nearbyFacilities: generateNearbyFacilities(selectedSymptoms),
        similarConditions: generateSimilarConditions(primaryCondition, selectedSymptoms),
        riskFactors: generateRiskFactors(primaryCondition, selectedSymptoms),
        timeline: generateTimeline(primaryCondition, selectedSymptoms),
        symptomAnalysis: generateSymptomAnalysis(selectedSymptoms, severity),
        treatmentOptions: generateTreatmentOptions(primaryCondition, selectedSymptoms),
        environmentalFactors: generateEnvironmentalFactors(primaryCondition),
        dietaryRecommendations: generateDietaryRecommendations(primaryCondition),
        symptomTrends: generateSymptomTrends(selectedSymptoms),
        recoveryMetrics: generateRecoveryMetrics(primaryCondition),
        exerciseGuidelines: generateExerciseGuidelines(primaryCondition),
        sleepRecommendations: generateSleepRecommendations(primaryCondition),
        followUpSchedule: generateFollowUpSchedule(primaryCondition, severityLevel),
        symptomSeverity: generateSymptomSeverity(selectedSymptoms),
        symptomTimeline: generateSymptomTimeline(selectedSymptoms),
        relatedConditions: generateRelatedConditions(selectedSymptoms),
        medicationInteractions: generateMedicationInteractions(selectedSymptoms),
        environmentalTriggers: generateEnvironmentalTriggers(selectedSymptoms)
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
      setSymptomHistory(prev => [...prev, mockAnalysis]);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Checker</h1>
        <p className="text-gray-600">Describe your symptoms for personalized health insights</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Select Your Symptoms</CardTitle>
            <CardDescription>Choose all symptoms you're currently experiencing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 sticky top-0 bg-white z-10">
                <TabsTrigger value="all">All</TabsTrigger>
                {Object.keys(symptomCategories || {}).map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="h-[400px] overflow-y-auto pr-2 mt-4">
                <TabsContent value="all" className="h-full">
                  <div className="space-y-4">
                    <div className="sticky top-0 bg-white pb-2 border-b">
                      <h3 className="text-lg font-semibold text-gray-900">All Symptoms</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(commonSymptoms || []).map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <Checkbox 
                            id={symptom}
                            checked={selectedSymptoms.includes(symptom)}
                            onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                          />
                          <Label htmlFor={symptom} className="text-sm cursor-pointer">{symptom}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                {Object.entries(symptomCategories || {}).map(([category, symptoms]) => (
                  <TabsContent key={category} value={category} className="h-full">
                    <div className="space-y-4">
                      <div className="sticky top-0 bg-white pb-2 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {(symptoms || []).map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <Checkbox 
                              id={symptom}
                              checked={selectedSymptoms.includes(symptom)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                            />
                            <Label htmlFor={symptom} className="text-sm cursor-pointer">{symptom}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
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
                  disabled={selectedSymptoms.length === 0 || loading}
                >
                  {loading ? "Analyzing..." : "Analyze Symptoms"}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI-powered health insights based on your symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg">Analyzing your symptoms...</p>
              </div>
            ) : analysis ? (
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-50 p-1 rounded-lg">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="risks" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Risks
                  </TabsTrigger>
                  <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trends
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{analysis.condition}</h3>
                        <p className="text-gray-500 mt-1">Based on your reported symptoms</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 px-4 py-1.5 text-sm font-medium">
                        {analysis.confidence}% Confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${
                            analysis.urgency === 'low' ? 'bg-green-500' : 
                            analysis.urgency === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="font-semibold text-gray-900">Severity Level</span>
                        </div>
                        <p className="text-lg font-medium text-gray-700">{analysis.severity}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center space-x-3 mb-2">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span className="font-semibold text-gray-900">Expected Duration</span>
                        </div>
                        <p className="text-lg font-medium text-gray-700">{analysis.timeline.expectedDuration}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                        Timeline
                      </h4>
                      <div className="space-y-3">
                        {analysis.timeline.stages.map((stage: any, index: number) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                              {stage.day}
                            </div>
                            <span className="text-gray-700">{stage.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <Activity className="w-5 h-5 mr-2 text-blue-600" />
                        Similar Conditions
                      </h4>
                      <div className="space-y-4">
                        {analysis.similarConditions.map((condition: any, index: number) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">{condition.name}</span>
                              <span className="text-sm font-medium text-gray-500">{condition.probability}%</span>
                            </div>
                            <Progress value={condition.probability} className="w-full h-2" />
                            <div className="mt-2 text-sm text-gray-600">
                              Common symptoms: {condition.symptoms.join(", ")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                        Risk Factors
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {analysis.riskFactors.map((risk: any, index: number) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-900">{risk.factor}</span>
                              <Badge variant={risk.level === 'Low' ? 'secondary' : risk.level === 'Medium' ? 'outline' : 'destructive'}>
                                {risk.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{risk.description}</p>
                            <p className="text-sm font-medium text-gray-500">Impact: {risk.impact}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                        When to Seek Medical Help
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {analysis.whenToSeekHelp.map((item: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg border border-red-100">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-red-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <Heart className="w-5 h-5 mr-2 text-blue-600" />
                        Treatment Recommendations
                      </h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Pill className="w-4 h-4 mr-2 text-blue-600" />
                            Medications
                          </h5>
                          <div className="space-y-4">
                            {analysis.treatmentOptions.medications.map((med: any, index: number) => (
                              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <span className="font-medium text-gray-900 block">{med.name}</span>
                                    <span className="text-sm text-gray-500">{med.category}</span>
                                  </div>
                                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                    {med.whenToTake}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{med.purpose}</p>
                                <div className="space-y-2">
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Dosage:</span>
                                    <span className="text-gray-600">{med.dosage}</span>
                                  </div>
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Max Daily:</span>
                                    <span className="text-gray-600">{med.maxDailyDose}</span>
                                  </div>
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Precautions:</span>
                                    <span className="text-gray-600">{med.precautions}</span>
                                  </div>
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Side Effects:</span>
                                    <span className="text-gray-600">{med.sideEffects.join(", ")}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="font-medium text-gray-700 w-24">Storage:</span>
                                    <span className="text-gray-600">{med.storage}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="font-medium text-gray-700 w-24">Brand Names:</span>
                                    <span className="text-gray-600">{med.brandNames.join(", ")}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Activity className="w-4 h-4 mr-2 text-blue-600" />
                            Home Remedies
                          </h5>
                          <div className="space-y-4">
                            {analysis.treatmentOptions.homeRemedies.map((remedy: any, index: number) => (
                              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="font-medium text-gray-900">{remedy.name}</span>
                                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    {remedy.frequency}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{remedy.purpose}</p>
                                <div className="space-y-2">
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Instructions:</span>
                                    <span className="text-gray-600">{remedy.instructions}</span>
                                  </div>
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Precautions:</span>
                                    <span className="text-gray-600">{remedy.precautions}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <span className="font-medium text-gray-700 w-24">Duration:</span>
                                    <span className="text-gray-600">{remedy.duration}</span>
                                  </div>
                                  <div className="flex items-start text-sm">
                                    <span className="font-medium text-gray-700 w-24">Benefits:</span>
                                    <span className="text-gray-600">{remedy.benefits}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        Medication Schedule
                      </h4>
                      <div className="grid grid-cols-4 gap-4">
                        {Object.entries(analysis.treatmentOptions.medicationSchedule).map(([time, medications]: [string, any[]]) => (
                          <div key={time} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <h5 className="font-medium text-gray-900 mb-3 capitalize">{time}</h5>
                            <div className="space-y-2">
                              {medications.map((med, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg border border-gray-200">
                                  <Pill className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm text-gray-700">{med.name}</span>
                                </div>
                              ))}
                              {medications.length === 0 && (
                                <p className="text-sm text-gray-500 italic">No medications scheduled</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <Brain className="w-5 h-5 mr-2 text-blue-600" />
                        Lifestyle Adjustments
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {analysis.lifestyleAdjustments.map((item: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center text-gray-900">
                        <ActivityIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Symptom Progression
                      </h4>
                      <div className="h-80 bg-gray-50 rounded-lg border border-gray-100 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={analysis.symptomTrends?.data || []}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                            <XAxis 
                              dataKey="day" 
                              stroke="#6B7280"
                              tick={{ fill: '#6B7280' }}
                            />
                            <YAxis 
                              stroke="#6B7280"
                              tick={{ fill: '#6B7280' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="severity" 
                              stroke="#3B82F6" 
                              strokeWidth={2}
                              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                              name="Severity" 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="symptoms" 
                              stroke="#10B981" 
                              strokeWidth={2}
                              dot={{ fill: '#10B981', strokeWidth: 2 }}
                              name="Number of Symptoms" 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Droplet className="w-4 h-4 mr-2 text-blue-600" />
                          Environmental Factors
                        </h5>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Triggers:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.environmentalFactors?.triggers?.map((trigger: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                                  {trigger.factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Aggravating Factors:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.environmentalFactors?.aggravatingFactors?.map((factor: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-red-50 text-red-700">
                                  {factor.factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Relieving Factors:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.environmentalFactors?.relievingFactors?.map((factor: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                                  {factor.factor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Pill className="w-4 h-4 mr-2 text-blue-600" />
                          Dietary Recommendations
                        </h5>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Recommended:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.dietaryRecommendations?.recommended?.map((item: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                                  {item.item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Avoid:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.dietaryRecommendations?.avoid?.map((item: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-red-50 text-red-700">
                                  {item.item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">Supplements:</p>
                            <div className="flex flex-wrap gap-2">
                              {analysis.dietaryRecommendations?.supplements?.map((item: any, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                                  {item.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-4 flex items-center">
                          <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
                          Emergency Contacts
                        </h5>
                        <div className="space-y-3">
                          {analysis.emergencyContacts.map((contact: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                              <span className="text-gray-900">{contact.type}</span>
                              <span className="font-medium text-blue-600">{contact.number}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-4 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                          Nearby Facilities
                        </h5>
                        <div className="space-y-3">
                          {analysis.nearbyFacilities.map((facility: any, index: number) => (
                            <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-900">{facility.name}</span>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                  {facility.distance}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{facility.type}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">Medical Disclaimer</h4>
                          <p className="text-sm text-yellow-800">
                            This analysis is for informational purposes only and should not replace professional medical advice. 
                            Please consult with a healthcare provider for proper diagnosis and treatment.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <Button variant="outline" className="w-full h-12">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save Report
                      </Button>
                      <Button className="w-full h-12 bg-green-600 hover:bg-green-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book Consultation
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
