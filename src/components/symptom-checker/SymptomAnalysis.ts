
import { symptoms } from './SymptomData';

export interface AnalysisResult {
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  recommendations: string[];
  possibleConditions: string[];
  urgency: string;
  nextSteps: string[];
}

export const getSymptomAnalysis = (selectedSymptomIds: string[]): AnalysisResult => {
  const selectedSymptomLabels = selectedSymptomIds.map(id => 
    symptoms.find(s => s.id === id)?.label
  ).filter(Boolean);

  // Critical symptoms that require immediate attention
  const criticalSymptoms = ['chest_pain', 'shortness_of_breath', 'confusion', 'blood_in_urine'];
  const severeSymptoms = ['fever', 'severe_headache', 'difficulty_swallowing', 'palpitations'];
  
  const hasCritical = selectedSymptomIds.some(id => criticalSymptoms.includes(id));
  const hasSevere = selectedSymptomIds.some(id => severeSymptoms.includes(id));
  const symptomCount = selectedSymptomIds.length;

  let severity: AnalysisResult['severity'];
  let urgency: string;
  let recommendations: string[];
  let possibleConditions: string[];
  let nextSteps: string[];

  if (hasCritical) {
    severity = 'Critical';
    urgency = 'Seek immediate medical attention';
    recommendations = [
      'Go to the emergency room immediately',
      'Call 911 if symptoms are severe',
      'Do not drive yourself to the hospital',
      'Have someone accompany you if possible'
    ];
    possibleConditions = ['Heart attack', 'Stroke', 'Pulmonary embolism', 'Severe infection'];
    nextSteps = [
      'Emergency room visit',
      'Immediate medical evaluation',
      'Possible hospitalization',
      'Follow emergency protocols'
    ];
  } else if (hasSevere || symptomCount >= 5) {
    severity = 'Severe';
    urgency = 'See a doctor within 24 hours';
    recommendations = [
      'Schedule an urgent appointment with your doctor',
      'Monitor symptoms closely',
      'Rest and stay hydrated',
      'Avoid strenuous activities'
    ];
    possibleConditions = ['Viral infection', 'Bacterial infection', 'Flu', 'COVID-19'];
    nextSteps = [
      'Doctor appointment within 24 hours',
      'Possible diagnostic tests',
      'Prescription medication may be needed',
      'Follow-up care'
    ];
  } else if (symptomCount >= 3) {
    severity = 'Moderate';
    urgency = 'Consider seeing a doctor within 2-3 days';
    recommendations = [
      'Monitor symptoms for 24-48 hours',
      'Rest and maintain good hydration',
      'Take over-the-counter medications as needed',
      'Schedule a doctor appointment if symptoms worsen'
    ];
    possibleConditions = ['Common cold', 'Minor viral infection', 'Allergies', 'Stress-related symptoms'];
    nextSteps = [
      'Self-care and monitoring',
      'Doctor visit if symptoms persist',
      'Over-the-counter treatment',
      'Preventive measures'
    ];
  } else {
    severity = 'Mild';
    urgency = 'Monitor symptoms and consider self-care';
    recommendations = [
      'Rest and stay hydrated',
      'Monitor symptoms for changes',
      'Practice good hygiene',
      'Consider over-the-counter remedies'
    ];
    possibleConditions = ['Minor illness', 'Temporary discomfort', 'Lifestyle factors', 'Environmental factors'];
    nextSteps = [
      'Self-care measures',
      'Monitor for 24-48 hours',
      'See a doctor if symptoms worsen',
      'Maintain healthy habits'
    ];
  }

  // Add specific recommendations based on symptom combinations
  if (selectedSymptomIds.includes('fever') && selectedSymptomIds.includes('cough')) {
    possibleConditions.push('Respiratory infection', 'COVID-19', 'Flu');
  }
  
  if (selectedSymptomIds.includes('headache') && selectedSymptomIds.includes('fever')) {
    possibleConditions.push('Viral infection', 'Migraine', 'Sinusitis');
  }

  if (selectedSymptomIds.includes('nausea') && selectedSymptomIds.includes('vomiting')) {
    possibleConditions.push('Gastroenteritis', 'Food poisoning', 'Viral infection');
  }

  return {
    severity,
    recommendations,
    possibleConditions: [...new Set(possibleConditions)], // Remove duplicates
    urgency,
    nextSteps
  };
};
