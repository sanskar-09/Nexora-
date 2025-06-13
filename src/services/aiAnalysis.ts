import { symptoms } from '@/components/symptom-checker/SymptomData';

interface SymptomAnalysis {
  possibleConditions: {
    condition: string;
    probability: number;
    description: string;
    recommendations: string[];
  }[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  relatedSymptoms: string[];
}

interface HealthMetrics {
  bloodPressure?: { systolic: number; diastolic: number };
  heartRate?: number;
  temperature?: number;
  bloodSugar?: number;
  weight?: number;
}

interface MLInsightData {
  userId: string;
  symptomHistory: { date: string; symptoms: string[]; riskLevel: 'low' | 'medium' | 'high' }[];
}

interface MLInsights {
  patternDetected: boolean;
  commonSymptomCombinations: string[][];
  seasonalPattern: number[];
  riskTrend: { date: string; risk: number }[];
  personalizedRecommendations: string[];
  predictiveAlerts: string[];
  symptomOccurrenceByDay: number[];
}

export class AIAnalysisService {
  private static instance: AIAnalysisService;
  private symptomPatterns: Map<string, string[]>;
  private conditionDatabase: Map<string, any>;

  private constructor() {
    this.initializeSymptomPatterns();
    this.initializeConditionDatabase();
  }

  public static getInstance(): AIAnalysisService {
    if (!AIAnalysisService.instance) {
      AIAnalysisService.instance = new AIAnalysisService();
    }
    return AIAnalysisService.instance;
  }

  private initializeSymptomPatterns() {
    this.symptomPatterns = new Map([
      // Respiratory
      ['fever', ['flu', 'covid19', 'common_cold', 'pneumonia', 'bronchitis', 'sinusitis', 'strep_throat']],
      ['cough', ['flu', 'covid19', 'common_cold', 'bronchitis', 'pneumonia', 'asthma', 'allergies', 'gastroesophageal_reflux']],
      ['shortness_of_breath', ['covid19', 'asthma', 'anxiety', 'pneumonia', 'heart_failure', 'copd', 'anemia']],
      ['chest_pain', ['angina', 'anxiety', 'gastroesophageal_reflux', 'pneumonia', 'heart_attack', 'pleurisy']],
      ['runny_nose', ['common_cold', 'allergies', 'sinusitis', 'flu', 'bronchitis']],
      ['sore_throat', ['common_cold', 'flu', 'strep_throat', 'tonsillitis', 'mono']],
      ['wheezing', ['asthma', 'allergies', 'bronchitis', 'copd']],
      ['nasal_congestion', ['common_cold', 'allergies', 'sinusitis']],
      
      // Cardiovascular
      ['palpitations', ['anxiety', 'heart_condition', 'hyperthyroidism', 'anemia', 'arrhythmia']],
      ['chest_tightness', ['angina', 'anxiety', 'asthma', 'heart_condition', 'pericarditis']],
      ['swelling_legs', ['heart_failure', 'kidney_disease', 'venous_insufficiency', 'liver_disease']],
      ['dizziness', ['vertigo', 'anemia', 'low_blood_pressure', 'anxiety', 'stroke', 'arrhythmia']],
      ['fatigue', ['anemia', 'depression', 'thyroid_disorder', 'sleep_apnea', 'heart_failure', 'diabetes']],
      
      // Gastrointestinal
      ['nausea', ['gastroenteritis', 'food_poisoning', 'migraine', 'pregnancy', 'appendicitis', 'ulcer', 'gallstones']],
      ['vomiting', ['gastroenteritis', 'food_poisoning', 'migraine', 'appendicitis', 'gastritis']],
      ['abdominal_pain', ['gastroenteritis', 'appendicitis', 'irritable_bowel', 'ulcer', 'gallstones', 'kidney_stones', 'diverticulitis']],
      ['diarrhea', ['gastroenteritis', 'food_poisoning', 'irritable_bowel', 'celiac_disease', 'crohns_disease']],
      ['constipation', ['irritable_bowel', 'hypothyroidism', 'dehydration', 'medication_side_effect', 'bowel_obstruction']],
      ['heartburn', ['gastroesophageal_reflux', 'hiatal_hernia', 'ulcer']],
      ['blood_in_stool', ['hemorrhoids', 'diverticulitis', 'colitis', 'colon_cancer']],
      
      // Neurological
      ['headache', ['migraine', 'tension_headache', 'sinusitis', 'dehydration', 'hypertension', 'brain_tumor']],
      ['confusion', ['dehydration', 'infection', 'stroke', 'low_blood_sugar', 'dementia', 'medication_side_effect']],
      ['seizures', ['epilepsy', 'brain_injury', 'stroke', 'brain_tumor', 'electrolyte_imbalance']],
      ['numbness', ['nerve_damage', 'stroke', 'multiple_sclerosis', 'diabetes']],
      ['tingling', ['nerve_damage', 'diabetes', 'vitamin_deficiency']],
      
      // Musculoskeletal
      ['joint_pain', ['arthritis', 'gout', 'fibromyalgia', 'injury', 'lupus', 'lyme_disease']],
      ['muscle_aches', ['flu', 'fibromyalgia', 'dehydration', 'overexertion', 'lyme_disease', 'polymyalgia_rheumatica']],
      ['back_pain', ['muscle_strain', 'herniated_disc', 'arthritis', 'kidney_infection', 'sciatica']],
      ['neck_pain', ['muscle_strain', 'whiplash', 'arthritis', 'meningitis']],
      
      // Dermatological
      ['rash', ['allergic_reaction', 'eczema', 'psoriasis', 'infection', 'chickenpox', 'measles']],
      ['itching', ['allergic_reaction', 'eczema', 'psoriasis', 'liver_disease', 'dry_skin']],
      ['hives', ['allergic_reaction', 'infection', 'autoimmune_condition', 'stress']],
      
      // General & Other
      ['fatigue', ['anemia', 'depression', 'thyroid_disorder', 'sleep_apnea', 'chronic_fatigue_syndrome']],
      ['weight_loss', ['hyperthyroidism', 'diabetes', 'cancer', 'depression', 'crohns_disease']],
      ['weight_gain', ['hypothyroidism', 'depression', 'cushing_syndrome', 'pcos']],
      ['chills', ['infection', 'flu', 'malaria']],
      ['night_sweats', ['infection', 'menopause', 'cancer', 'hyperthyroidism', 'anxiety']],
      ['difficulty_swallowing', ['strep_throat', 'tonsillitis', 'gastroesophageal_reflux', 'stroke']],
      ['frequent_urination', ['diabetes', 'uti', 'overactive_bladder']],
      ['painful_urination', ['uti', 'kidney_stones', 'sti']],
      ['blurred_vision', ['diabetes', 'migraine', 'stroke', 'glaucoma', 'cataracts']]
    ]);
  }

  private initializeConditionDatabase() {
    this.conditionDatabase = new Map([
      ['flu', {
        symptoms: ['fever', 'cough', 'fatigue', 'muscle_aches', 'headache', 'sore_throat', 'runny_nose', 'chills'],
        riskLevel: 'medium',
        description: 'Influenza is a viral infection that attacks your respiratory system. It can cause mild to severe illness.',
        recommendations: {
          immediate: ['Rest and stay hydrated', 'Take over-the-counter fever reducers if needed', 'Avoid contact with others'],
          shortTerm: ['Monitor temperature and symptoms', 'Get plenty of rest', 'Consider antiviral medication if prescribed'],
          longTerm: ['Consider getting annual flu vaccine', 'Maintain good hand hygiene', 'Boost your immune system']
        }
      }],
      ['covid19', {
        symptoms: ['fever', 'cough', 'shortness_of_breath', 'loss_of_taste', 'loss_of_smell', 'fatigue', 'sore_throat', 'muscle_aches', 'headache'],
        riskLevel: 'high',
        description: 'COVID-19 is a highly contagious respiratory illness caused by the SARS-CoV-2 virus, with varying severity.',
        recommendations: {
          immediate: ['Self-isolate immediately', 'Contact healthcare provider for testing and guidance', 'Monitor oxygen levels with a pulse oximeter if available'],
          shortTerm: ['Get tested for COVID-19', 'Follow local public health guidelines', 'Rest and stay hydrated', 'Manage symptoms with over-the-counter medications'],
          longTerm: ['Get vaccinated and boosted', 'Wear a mask in crowded indoor spaces', 'Practice social distancing', 'Maintain good ventilation']
        }
      }],
      ['pneumonia', {
        symptoms: ['fever', 'cough', 'shortness_of_breath', 'chest_pain', 'fatigue', 'chills'],
        riskLevel: 'high',
        description: 'Pneumonia is an infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus.',
        recommendations: {
          immediate: ['Seek immediate medical attention, especially if shortness of breath is severe', 'Take prescribed antibiotics (if bacterial) or antivirals (if viral)', 'Follow doctor\'s orders for hospitalization if needed'],
          shortTerm: ['Complete full course of medication', 'Get plenty of rest', 'Stay hydrated', 'Avoid smoking'],
          longTerm: ['Consider pneumococcal vaccine', 'Practice good respiratory hygiene', 'Quit smoking if applicable', 'Manage chronic health conditions']
        }
      }],
      ['asthma', {
        symptoms: ['shortness_of_breath', 'wheezing', 'chest_tightness', 'cough', 'fatigue'],
        riskLevel: 'medium',
        description: 'Asthma is a chronic respiratory condition that causes airways to narrow and swell, making breathing difficult.',
        recommendations: {
          immediate: ['Use rescue inhaler as prescribed', 'Sit upright and try to relax', 'Seek emergency care if symptoms worsen'],
          shortTerm: ['Identify and avoid triggers (e.g., pollen, dust mites)', 'Take controller medications daily as prescribed', 'Monitor peak flow readings'],
          longTerm: ['Develop a personalized asthma action plan with your doctor', 'Get regular check-ups', 'Consider allergy testing', 'Maintain a clean living environment']
        }
      }],
      ['heart_failure', {
        symptoms: ['shortness_of_breath', 'fatigue', 'swelling_legs', 'chest_pain', 'palpitations', 'weight_gain'],
        riskLevel: 'high',
        description: 'Heart failure, also known as congestive heart failure, occurs when the heart muscle doesn\'t pump blood as well as it should.',
        recommendations: {
          immediate: ['Seek emergency medical care if experiencing severe chest pain or shortness of breath', 'Take prescribed medications (e.g., diuretics, ACE inhibitors)'],
          shortTerm: ['Monitor weight daily and report sudden increases', 'Limit salt intake', 'Adhere strictly to medication schedule'],
          longTerm: ['Regular cardiac check-ups and specialist consultations', 'Maintain a heart-healthy diet and regular, moderate exercise', 'Manage underlying conditions like high blood pressure or diabetes']
        }
      }],
      ['diabetes', {
        symptoms: ['increased_thirst', 'frequent_urination', 'fatigue', 'weight_loss', 'blurred_vision', 'numbness', 'tingling'],
        riskLevel: 'medium',
        description: 'Diabetes is a chronic metabolic disease characterized by high blood sugar levels, leading to serious health problems over time.',
        recommendations: {
          immediate: ['Check blood sugar levels immediately', 'Take insulin or oral medications as prescribed', 'Seek medical attention for dangerously high or low levels'],
          shortTerm: ['Monitor blood sugar regularly throughout the day', 'Follow a balanced meal plan with controlled carbohydrate intake', 'Engage in regular physical activity'],
          longTerm: ['Regular check-ups with an endocrinologist and other specialists', 'Maintain a healthy weight', 'Foot care and eye exams', 'Education on diabetes management']
        }
      }],
      ['migraine', {
        symptoms: ['headache', 'nausea', 'sensitivity_to_light', 'sensitivity_to_sound', 'vomiting', 'aura'],
        riskLevel: 'low',
        description: 'A migraine is a type of headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head, often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.',
        recommendations: {
          immediate: ['Take prescribed acute medication (e.g., triptans) at the first sign', 'Rest in a dark, quiet room', 'Apply a cold compress to your forehead'],
          shortTerm: ['Identify and avoid personal migraine triggers (e.g., certain foods, stress, lack of sleep)', 'Maintain regular sleep schedule and meal times', 'Practice stress management techniques'],
          longTerm: ['Consider preventive medications if migraines are frequent or severe', 'Regular exercise', 'Explore alternative therapies like acupuncture or biofeedback']
        }
      }],
      ['depression', {
        symptoms: ['fatigue', 'mood_changes', 'sleep_problems', 'weight_changes', 'loss_of_interest', 'difficulty_concentrating', 'feelings_of_worthlessness'],
        riskLevel: 'medium',
        description: 'Depression is a common and serious medical illness that negatively affects how you feel, the way you think, and how you act.',
        recommendations: {
          immediate: ['Contact a mental health professional (therapist, psychiatrist)', 'Reach out to a trusted friend or family member for support', 'If in crisis, seek immediate help from a helpline or emergency services'],
          shortTerm: ['Attend regular therapy sessions', 'Adhere to prescribed antidepressant medications if applicable', 'Establish a consistent daily routine'],
          longTerm: ['Continue therapy and medication management as needed', 'Incorporate regular physical activity', 'Participate in support groups', 'Develop coping strategies for stress and negative thoughts']
        }
      }],
      ['allergies', {
        symptoms: ['runny_nose', 'itching', 'sneezing', 'nasal_congestion', 'sore_throat', 'cough', 'hives'],
        riskLevel: 'low',
        description: 'Allergies are immune system reactions to substances that are usually harmless (allergens).',
        recommendations: {
          immediate: ['Take antihistamines or other prescribed allergy medication', 'Avoid contact with known allergens', 'Use saline nasal sprays for congestion'],
          shortTerm: ['Identify specific allergens through testing', 'Keep windows closed during high pollen seasons', 'Regularly clean and dust your living space'],
          longTerm: ['Consider allergy shots (immunotherapy) for severe allergies', 'Carry an EpiPen if severe reactions (anaphylaxis) are a risk', 'Consult an allergist for a comprehensive management plan']
        }
      }],
      ['common_cold', {
        symptoms: ['runny_nose', 'sore_throat', 'cough', 'nasal_congestion', 'sneezing', 'fatigue', 'headache'],
        riskLevel: 'low',
        description: 'The common cold is a viral infection of your nose and throat. It\'s generally harmless, though it might not feel that way.',
        recommendations: {
          immediate: ['Rest and stay hydrated', 'Gargle with salt water for sore throat', 'Use over-the-counter cold remedies to relieve symptoms'],
          shortTerm: ['Avoid close contact with others to prevent spread', 'Wash hands frequently', 'Get extra rest'],
          longTerm: ['Maintain a healthy lifestyle to boost immunity', 'Avoid touching your face', 'Consider a flu vaccine annually']
        }
      }],
      ['strep_throat', {
        symptoms: ['sore_throat', 'fever', 'difficulty_swallowing', 'headache', 'nausea', 'vomiting'],
        riskLevel: 'medium',
        description: 'Strep throat is a bacterial infection that can make your throat feel sore and scratchy.',
        recommendations: {
          immediate: ['See a doctor for diagnosis and antibiotic prescription', 'Start antibiotics immediately as prescribed', 'Isolate to prevent spread'],
          shortTerm: ['Complete the full course of antibiotics, even if you feel better', 'Gargle with salt water', 'Rest and stay hydrated'],
          longTerm: ['Practice good hygiene', 'Avoid sharing food and drinks', 'Seek prompt treatment for future sore throats to prevent complications']
        }
      }],
      ['anxiety', {
        symptoms: ['palpitations', 'shortness_of_breath', 'chest_tightness', 'dizziness', 'fatigue', 'mood_changes', 'sleep_problems', 'nausea'],
        riskLevel: 'medium',
        description: 'Anxiety is a feeling of worry, nervousness, or unease, typically about an event or something with an uncertain outcome.',
        recommendations: {
          immediate: ['Practice deep breathing exercises', 'Engage in mindfulness or meditation', 'Grounding techniques (e.g., 5-4-3-2-1 method)', 'Talk to a trusted person'],
          shortTerm: ['Identify anxiety triggers', 'Limit caffeine and alcohol', 'Engage in regular physical activity', 'Consider cognitive behavioral therapy (CBT)'],
          longTerm: ['Consult a mental health professional for personalized treatment', 'Develop a strong support system', 'Learn stress management techniques', 'Ensure adequate sleep']
        }
      }]
    ]);
  }

  public async analyzeSymptoms(
    selectedSymptoms: string[],
    healthMetrics?: HealthMetrics
  ): Promise<SymptomAnalysis> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const possibleConditions = this.findPossibleConditions(selectedSymptoms);
    const riskLevel = this.calculateRiskLevel(possibleConditions, healthMetrics);
    const recommendations = this.generateRecommendations(possibleConditions, riskLevel);
    const relatedSymptoms = this.findRelatedSymptoms(selectedSymptoms);

    return {
      possibleConditions,
      riskLevel,
      recommendations,
      relatedSymptoms
    };
  }

  private findPossibleConditions(selectedSymptoms: string[]): SymptomAnalysis['possibleConditions'] {
    const conditionScores = new Map<string, number>();
    const conditionDetails = new Map<string, any>();

    selectedSymptoms.forEach(symptom => {
      const relatedConditions = this.symptomPatterns.get(symptom) || [];
      relatedConditions.forEach(condition => {
        const currentScore = conditionScores.get(condition) || 0;
        conditionScores.set(condition, currentScore + 1);
        
        if (!conditionDetails.has(condition)) {
          conditionDetails.set(condition, this.conditionDatabase.get(condition));
        }
      });
    });

    return Array.from(conditionScores.entries())
      .map(([condition, score]) => ({
        condition,
        probability: score / selectedSymptoms.length,
        description: conditionDetails.get(condition)?.description || '',
        recommendations: conditionDetails.get(condition)?.recommendations.immediate || []
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3);
  }

  private calculateRiskLevel(
    conditions: SymptomAnalysis['possibleConditions'],
    healthMetrics?: HealthMetrics
  ): 'low' | 'medium' | 'high' {
    // Consider both conditions and health metrics
    const hasHighRiskCondition = conditions.some(c => 
      this.conditionDatabase.get(c.condition)?.riskLevel === 'high'
    );

    const hasAbnormalMetrics = healthMetrics && (
      (healthMetrics.bloodPressure && 
        (healthMetrics.bloodPressure.systolic > 140 || healthMetrics.bloodPressure.diastolic > 90)) ||
      (healthMetrics.heartRate && (healthMetrics.heartRate > 100 || healthMetrics.heartRate < 60)) ||
      (healthMetrics.temperature && healthMetrics.temperature > 100.4)
    );

    if (hasHighRiskCondition || hasAbnormalMetrics) {
      return 'high';
    } else if (conditions.length > 0) {
      return 'medium';
    }
    return 'low';
  }

  private generateRecommendations(
    conditions: SymptomAnalysis['possibleConditions'],
    riskLevel: 'low' | 'medium' | 'high'
  ): SymptomAnalysis['recommendations'] {
    const allRecommendations = {
      immediate: new Set<string>(),
      shortTerm: new Set<string>(),
      longTerm: new Set<string>()
    };

    conditions.forEach(condition => {
      const conditionData = this.conditionDatabase.get(condition.condition);
      if (conditionData) {
        conditionData.recommendations.immediate.forEach(rec => allRecommendations.immediate.add(rec));
        conditionData.recommendations.shortTerm.forEach(rec => allRecommendations.shortTerm.add(rec));
        conditionData.recommendations.longTerm.forEach(rec => allRecommendations.longTerm.add(rec));
      }
    });

    // Add risk-level specific recommendations
    if (riskLevel === 'high') {
      allRecommendations.immediate.add('Seek immediate medical attention');
    }

    return {
      immediate: Array.from(allRecommendations.immediate),
      shortTerm: Array.from(allRecommendations.shortTerm),
      longTerm: Array.from(allRecommendations.longTerm)
    };
  }

  private findRelatedSymptoms(selectedSymptoms: string[]): string[] {
    const related = new Set<string>();
    
    selectedSymptoms.forEach(symptom => {
      const relatedConditions = this.symptomPatterns.get(symptom) || [];
      relatedConditions.forEach(condition => {
        const conditionData = this.conditionDatabase.get(condition);
        if (conditionData) {
          conditionData.symptoms.forEach((s: string) => {
            if (!selectedSymptoms.includes(s)) {
              related.add(s);
            }
          });
        }
      });
    });

    return Array.from(related);
  }

  public async getMLInsights(data: MLInsightData): Promise<MLInsights> {
    // Simulate API call to a backend ML service
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network latency

    // This would ideally be computed by a real ML model on the backend
    const history = data.symptomHistory;

    const insights = {
      patternDetected: history.length > 5 && Math.random() > 0.4, // More likely with more data
      commonSymptomCombinations: this.findCommonSymptomCombinations(history),
      seasonalPattern: this.detectSeasonalPattern(history),
      riskTrend: this.calculateRiskTrend(history),
      personalizedRecommendations: this.generatePersonalizedRecommendations(history),
      predictiveAlerts: this.generatePredictiveAlerts(history),
      symptomOccurrenceByDay: this.calculateSymptomOccurrenceByDay(history)
    };
    
    return insights;
  }

  private findCommonSymptomCombinations = (history: MLInsightData['symptomHistory']) => {
    const combinations = new Map<string, number>();
    history.forEach(entry => {
      const symptoms = [...entry.symptoms].sort(); // Create a copy before sorting
      for (let i = 0; i < symptoms.length; i++) {
        for (let j = i + 1; j < symptoms.length; j++) {
          const key = `${symptoms[i]}-${symptoms[j]}`;
          combinations.set(key, (combinations.get(key) || 0) + 1);
        }
      }
    });
    return Array.from(combinations.entries())
      .filter(([, count]) => count > 1) // Only show combinations that appear more than once
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([combo]) => combo.split('-').map(s => s.replace(/_/g, ' '))); // Format for display
  };

  private detectSeasonalPattern = (history: MLInsightData['symptomHistory']) => {
    const monthlyCounts = new Array(12).fill(0);
    history.forEach(entry => {
      const month = new Date(entry.date).getMonth(); // 0-11 for Jan-Dec
      monthlyCounts[month]++;
    });
    return monthlyCounts;
  };

  private calculateRiskTrend = (history: MLInsightData['symptomHistory']) => {
    return history.map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      risk: entry.riskLevel === 'high' ? 3 : entry.riskLevel === 'medium' ? 2 : 1
    }));
  };

  private generatePersonalizedRecommendations = (history: MLInsightData['symptomHistory']): string[] => {
    const recommendations: Set<string> = new Set();
    const commonConditions = new Set<string>();

    history.forEach(entry => {
      if (entry.possibleConditions && entry.possibleConditions.length > 0) {
        commonConditions.add(entry.possibleConditions[0].condition);
      }
    });

    if (commonConditions.has('allergies')) {
      recommendations.add('Consider regular cleaning and air purification to reduce allergens.');
    }
    if (commonConditions.has('anxiety')) {
      recommendations.add('Explore mindfulness techniques and stress reduction exercises.');
    }
    if (commonConditions.has('diabetes')) {
      recommendations.add('Focus on a balanced diet and regular glucose monitoring.');
    }

    // Add more complex logic based on patterns
    if (this.detectSeasonalPattern(history)[0] > 0 && this.detectSeasonalPattern(history)[1] > 0) { // Jan & Feb high counts
      recommendations.add('You might experience more symptoms during winter months. Boost immunity with Vitamin D.');
    }
    
    return Array.from(recommendations);
  };

  private generatePredictiveAlerts = (history: MLInsightData['symptomHistory']): string[] => {
    const alerts: Set<string> = new Set();
    const currentRisk = history.length > 0 ? history[0].riskLevel : 'low';
    const previousRisk = history.length > 1 ? history[1].riskLevel : 'low';

    if (currentRisk === 'high' && previousRisk === 'medium') {
      alerts.add('Your risk level has increased significantly. Please review your recent symptoms.');
    }

    // More advanced predictive alerts
    const highRiskStreak = this.calculateRiskTrend(history).filter(t => t.risk === 3).length;
    if (highRiskStreak >= 2) {
      alerts.add('Multiple high-risk events detected in your recent history. It is highly recommended to consult a doctor soon.');
    }

    const increasingRiskTrend = this.calculateRiskTrend(history).slice(0, 3).every((_, i, arr) => {
      if (i === 0) return true;
      return arr[i].risk >= arr[i - 1].risk;
    });
    if (increasingRiskTrend && history.length >= 3 && currentRisk !== 'low') {
      alerts.add('Your risk level shows a consistent upward trend. Please pay close attention to your symptoms.');
    }

    const commonSeasonalSymptom = this.detectSeasonalPattern(history).findIndex(count => count > history.length / 3); // More than 1/3 of total entries
    if (commonSeasonalSymptom !== -1) {
      const monthName = new Date(0, commonSeasonalSymptom).toLocaleString('default', { month: 'long' });
      alerts.add(`You tend to experience more symptoms in ${monthName}. Be proactive with preventive measures during this period.`);
    }

    // Alert for frequently occurring symptoms
    const symptomFrequencyMap = new Map<string, number>();
    history.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        symptomFrequencyMap.set(symptom, (symptomFrequencyMap.get(symptom) || 0) + 1);
      });
    });

    for (const [symptom, count] of symptomFrequencyMap.entries()) {
      if (count >= history.length / 2 && history.length > 2) { // Symptom appears in at least half of recent entries
        alerts.add(`You are frequently experiencing \'${symptom.replace(/_/g, ' ')}\'. Consider discussing this persistent symptom with a healthcare professional.`);
      }
    }

    return Array.from(alerts);
  };

  private calculateSymptomOccurrenceByDay = (history: MLInsightData['symptomHistory']): number[] => {
    const dayCounts = new Array(7).fill(0); // 0 for Sunday, 6 for Saturday
    history.forEach(entry => {
      const date = new Date(entry.date);
      const dayOfWeek = date.getDay();
      dayCounts[dayOfWeek] += entry.symptoms.length;
    });
    return dayCounts;
  };
}

export const aiAnalysisService = AIAnalysisService.getInstance(); 