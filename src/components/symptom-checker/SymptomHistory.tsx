
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { History, Info } from 'lucide-react';

interface HistoryEntry {
  severity?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  symptoms: string[];
  date: string;
  urgency?: string;
  possibleConditions?: { condition: string; probability: number; description: string }[];
}

interface SymptomHistoryProps {
  history: HistoryEntry[];
  onSelectSymptom: (symptom: string) => void;
}

export const SymptomHistory: React.FC<SymptomHistoryProps> = ({ history, onSelectSymptom }) => {
  if (history.length === 0) return null;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Recent Symptom Analysis History</span>
        </CardTitle>
        <CardDescription>Review your past symptom analysis results and click symptoms to add them.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.slice(0, 5).map((entry, index) => (
            <Alert key={index} variant={getRiskLevelColor(entry.severity || entry.riskLevel || 'low')}>
              <Info className="w-4 h-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold">
                        {entry.severity || (entry.riskLevel ? entry.riskLevel.charAt(0).toUpperCase() + entry.riskLevel.slice(1) : 'Unknown')} Risk
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.symptoms.map((symptom, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectSymptom(symptom)}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                  {entry.urgency && (
                    <p className="text-sm text-gray-600">{entry.urgency}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
