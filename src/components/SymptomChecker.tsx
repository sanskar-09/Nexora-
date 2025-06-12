
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle } from 'lucide-react';
import { SymptomSelector } from './symptom-checker/SymptomSelector';
import { AnalysisResults } from './symptom-checker/AnalysisResults';
import { SymptomHistory } from './symptom-checker/SymptomHistory';
import { getSymptomAnalysis, AnalysisResult } from './symptom-checker/SymptomAnalysis';

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
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
      checked 
        ? [...prev, symptomId]
        : prev.filter(id => id !== symptomId)
    );
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setAnalysisResult(null);
    setError(null);
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom to analyze.");
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
        symptoms: selectedSymptoms.map(id => 
          // Get symptom labels from the symptoms data
          id === 'fever' ? 'Fever' :
          id === 'headache' ? 'Headache' :
          id === 'cough' ? 'Cough' :
          id === 'sore_throat' ? 'Sore Throat' :
          id === 'runny_nose' ? 'Runny Nose' :
          id === 'shortness_of_breath' ? 'Shortness of Breath' :
          id === 'chest_pain' ? 'Chest Pain' :
          id === 'fatigue' ? 'Fatigue' :
          id === 'muscle_aches' ? 'Muscle Aches' :
          id === 'joint_pain' ? 'Joint Pain' :
          id === 'nausea' ? 'Nausea' :
          id === 'vomiting' ? 'Vomiting' :
          id === 'diarrhea' ? 'Diarrhea' :
          id === 'abdominal_pain' ? 'Abdominal Pain' :
          id === 'dizziness' ? 'Dizziness' :
          id === 'confusion' ? 'Confusion' :
          id === 'rash' ? 'Rash' :
          id === 'itching' ? 'Itching' :
          id === 'swelling' ? 'Swelling' :
          id === 'loss_of_taste' ? 'Loss of Taste' :
          id === 'loss_of_smell' ? 'Loss of Smell' :
          id === 'chills' ? 'Chills' :
          id === 'night_sweats' ? 'Night Sweats' :
          id === 'weight_loss' ? 'Unexplained Weight Loss' :
          id === 'weight_gain' ? 'Rapid Weight Gain' :
          id === 'palpitations' ? 'Heart Palpitations' :
          id === 'back_pain' ? 'Back Pain' :
          id === 'neck_pain' ? 'Neck Pain' :
          id === 'eye_pain' ? 'Eye Pain' :
          id === 'blurred_vision' ? 'Blurred Vision' :
          id === 'ear_pain' ? 'Ear Pain' :
          id === 'hearing_loss' ? 'Hearing Loss' :
          id === 'frequent_urination' ? 'Frequent Urination' :
          id === 'painful_urination' ? 'Painful Urination' :
          id === 'blood_in_urine' ? 'Blood in Urine' :
          id === 'constipation' ? 'Constipation' :
          id === 'heartburn' ? 'Heartburn' :
          id === 'difficulty_swallowing' ? 'Difficulty Swallowing' :
          id === 'sleep_problems' ? 'Sleep Problems' :
          id === 'memory_problems' ? 'Memory Problems' :
          id === 'mood_changes' ? 'Mood Changes' :
          id === 'anxiety' ? 'Anxiety' :
          id === 'depression' ? 'Depression' :
          id
        ).filter(Boolean),
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">AI Symptom Checker</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get preliminary health insights based on your symptoms. Our AI analyzes your input to provide recommendations and guidance.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Symptom Selection */}
        <div className="space-y-6">
          {/* Error Display */}
          {error && (
            <Alert className="border-red-300 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          
          <SymptomSelector 
            selectedSymptoms={selectedSymptoms}
            onSymptomChange={handleSymptomChange}
          />

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={analyzeSymptoms}
              disabled={loading || selectedSymptoms.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Symptoms'
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={clearAll}
              disabled={loading}
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {analysisResult ? (
            <AnalysisResults result={analysisResult} />
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <p className="text-gray-500">Select symptoms and click "Analyze Symptoms" to see results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Symptom History */}
      <SymptomHistory history={symptomHistory} />

      {/* Medical Disclaimer */}
      <Card className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-yellow-800 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Important Medical Disclaimer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-yellow-700 leading-relaxed">
            This AI symptom checker is for informational purposes only and should not replace professional medical advice, 
            diagnosis, or treatment. Always consult with a qualified healthcare provider for accurate diagnosis and appropriate 
            treatment options. In case of emergency, call your local emergency number immediately.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;
