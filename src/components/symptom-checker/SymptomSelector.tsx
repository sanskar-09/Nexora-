
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { symptoms, categoryLabels } from './SymptomData';

interface SymptomSelectorProps {
  selectedSymptoms: string[];
  onSymptomChange: (symptomId: string, checked: boolean) => void;
}

export const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  selectedSymptoms,
  onSymptomChange
}) => {
  // Group symptoms by category
  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as { [key: string]: typeof symptoms });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Select Your Symptoms</span>
          <Badge variant="outline" className="text-sm">
            {selectedSymptoms.length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
            <div key={category}>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                {categoryLabels[category]}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {categorySymptoms.filter(s => selectedSymptoms.includes(s.id)).length}
                </Badge>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categorySymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={(checked) => onSymptomChange(symptom.id, checked as boolean)}
                      className="text-blue-600"
                    />
                    <label
                      htmlFor={symptom.id}
                      className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                    >
                      {symptom.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
