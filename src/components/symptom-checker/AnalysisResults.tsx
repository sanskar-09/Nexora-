
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  Lightbulb, 
  FileText, 
  ArrowRight 
} from 'lucide-react';
import { AnalysisResult } from './SymptomAnalysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'Severe': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': 
      case 'Severe': 
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'Moderate': 
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Mild': 
        return <Lightbulb className="w-5 h-5 text-green-600" />;
      default: 
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Severity and Urgency */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getSeverityIcon(result.severity)}
            <span>Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Severity Level:</span>
              <Badge className={`${getSeverityColor(result.severity)} font-semibold`}>
                {result.severity}
              </Badge>
            </div>
            <Alert className={result.severity === 'Critical' ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'}>
              <Clock className="w-4 h-4" />
              <AlertDescription className="font-medium">
                {result.urgency}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span>Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Possible Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Possible Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {result.possibleConditions.map((condition, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                {condition}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="w-5 h-5 text-purple-600" />
            <span>Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {result.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
