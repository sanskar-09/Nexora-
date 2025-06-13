
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { History, Info } from 'lucide-react';

interface HistoryEntry {
  severity: string;
  symptoms: string[];
  date: string;
  urgency: string;
}

interface SymptomHistoryProps {
  history: HistoryEntry[];
}

export const SymptomHistory: React.FC<SymptomHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
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
          {history.slice(0, 5).map((entry, index) => (
            <Alert key={index} variant={entry.severity === 'Critical' ? 'destructive' : 'default'}>
              <Info className="w-4 h-4" />
              <AlertDescription className="font-medium">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{entry.severity}</span> - {entry.symptoms.join(', ')}
                  </div>
                  <span className="text-xs text-gray-500">{entry.date}</span>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
