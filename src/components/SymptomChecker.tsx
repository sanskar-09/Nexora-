import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, Brain } from 'lucide-react';
import { SymptomSelector } from './symptom-checker/SymptomSelector';
import AIAnalysisResults from './symptom-checker/AIAnalysisResults';
import { SymptomHistory } from './symptom-checker/SymptomHistory';
import SymptomTrends from './symptom-checker/SymptomTrends';
import { aiAnalysisService } from '@/services/aiAnalysis';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symptomHistory, setSymptomHistory] = useState<any[]>([]);
  const [mlInsights, setMlInsights] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadHistoryAndInsights = async () => {
      const savedHistory = localStorage.getItem('symptomHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setSymptomHistory(parsedHistory);
          if (parsedHistory.length >= 3) {
            setLoading(true);
            const insights = await aiAnalysisService.getMLInsights({
              userId: user?.id || 'guest',
              symptomHistory: parsedHistory
            });
            setMlInsights(insights);
            setLoading(false);
          }
        } catch (err) {
          console.error('Failed to parse symptom history or generate insights:', err);
          setLoading(false);
        }
      }
    };
    loadHistoryAndInsights();
  }, [user]);

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
      setError('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await aiAnalysisService.analyzeSymptoms(selectedSymptoms);
      setAnalysisResult(result);

      const historyEntry = {
        ...result,
        symptoms: selectedSymptoms,
        date: new Date().toISOString(),
        userId: user?.id || 'guest'
      };

      const updatedHistory = [historyEntry, ...symptomHistory].slice(0, 10);
      setSymptomHistory(updatedHistory);
      localStorage.setItem('symptomHistory', JSON.stringify(updatedHistory));

      if (updatedHistory.length >= 3) {
        const insights = await aiAnalysisService.getMLInsights({
          userId: user?.id || 'guest',
          symptomHistory: updatedHistory
        });
        setMlInsights(insights);
      }

    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRelatedSymptomSelect = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => [...prev, symptom]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Symptom Checker</CardTitle>
          <CardDescription>
            Select your symptoms to get AI-powered health analysis and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SymptomSelector
            selectedSymptoms={selectedSymptoms}
            onSymptomChange={handleSymptomChange}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-2">
            <Button
              onClick={analyzeSymptoms}
              disabled={loading || selectedSymptoms.length === 0}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
        </CardContent>
      </Card>

      {analysisResult && (
        <AIAnalysisResults
          analysis={analysisResult}
          onSymptomSelect={handleRelatedSymptomSelect}
        />
      )}

      {symptomHistory.length > 0 && (
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">ML Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <SymptomHistory
              history={symptomHistory}
              onSelectSymptom={handleRelatedSymptomSelect}
            />
          </TabsContent>
          
          <TabsContent value="trends">
            <SymptomTrends 
              history={symptomHistory} 
              seasonalPattern={mlInsights?.seasonalPattern} 
              riskTrend={mlInsights?.riskTrend}
              symptomOccurrenceByDay={mlInsights?.symptomOccurrenceByDay}
            />
          </TabsContent>
          
          <TabsContent value="insights">
            {loading ? (
              <Card>
                <CardContent className="flex items-center justify-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <p className="ml-2 text-gray-500">Generating ML Insights...</p>
                </CardContent>
              </Card>
            ) : mlInsights ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    Machine Learning Insights
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of your symptom patterns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mlInsights.predictiveAlerts && mlInsights.predictiveAlerts.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-red-600">Predictive Alerts</h3>
                      {mlInsights.predictiveAlerts.map((alert: string, index: number) => (
                        <Alert key={index} variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{alert}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  {mlInsights.patternDetected && (
                    <Alert>
                      <AlertDescription>
                        We've detected a pattern in your symptoms. Consider discussing this with your healthcare provider.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {mlInsights.commonSymptomCombinations && mlInsights.commonSymptomCombinations.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Common Symptom Combinations</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mlInsights.commonSymptomCombinations.map((combo: string[], index: number) => (
                          <div key={index} className="p-2 bg-gray-50 rounded-lg">
                            <p className="text-sm">
                              {combo.join(' + ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mlInsights.personalizedRecommendations && mlInsights.personalizedRecommendations.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {mlInsights.personalizedRecommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-gray-700">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Alert>
                <AlertDescription>
                  We need more symptom history to generate insights. Keep using the symptom checker to build up your history.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SymptomChecker;
