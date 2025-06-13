import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIAnalysisResultsProps {
  analysis: {
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
  };
  onSymptomSelect: (symptom: string) => void;
}

const AIAnalysisResults: React.FC<AIAnalysisResultsProps> = ({ analysis, onSymptomSelect }) => {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <Info className="w-5 h-5" />;
      case 'low':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Level Alert */}
      <Alert className={getRiskLevelColor(analysis.riskLevel)}>
        <div className="flex items-center space-x-2">
          {getRiskLevelIcon(analysis.riskLevel)}
          <AlertTitle>Risk Level: {analysis.riskLevel.toUpperCase()}</AlertTitle>
        </div>
        <AlertDescription>
          {analysis.riskLevel === 'high' 
            ? 'Please seek medical attention immediately.'
            : analysis.riskLevel === 'medium'
            ? 'Monitor your symptoms and consider consulting a healthcare provider.'
            : 'Your symptoms appear to be mild. Continue monitoring your condition.'}
        </AlertDescription>
      </Alert>

      {/* Possible Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Possible Conditions</CardTitle>
          <CardDescription>Based on your reported symptoms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.possibleConditions.map((condition, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{condition.condition}</h3>
                <Badge variant="secondary">
                  {Math.round(condition.probability * 100)}% probability
                </Badge>
              </div>
              <Progress value={condition.probability * 100} className="h-2" />
              <p className="text-sm text-gray-600">{condition.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Personalized health advice based on your symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="immediate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="immediate">Immediate</TabsTrigger>
              <TabsTrigger value="shortTerm">Short Term</TabsTrigger>
              <TabsTrigger value="longTerm">Long Term</TabsTrigger>
            </TabsList>
            <TabsContent value="immediate" className="space-y-2">
              {analysis.recommendations.immediate.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="shortTerm" className="space-y-2">
              {analysis.recommendations.shortTerm.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="longTerm" className="space-y-2">
              {analysis.recommendations.longTerm.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Related Symptoms */}
      {analysis.relatedSymptoms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Symptoms</CardTitle>
            <CardDescription>Consider if you're experiencing any of these symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.relatedSymptoms.map((symptom, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => onSymptomSelect(symptom)}
                >
                  {symptom}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAnalysisResults; 