import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface SymptomTrendsProps {
  history: {
    date: string;
    symptoms: string[];
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  seasonalPattern?: number[];
  riskTrend?: { date: string; risk: number }[];
  symptomOccurrenceByDay?: number[];
}

const SymptomTrends: React.FC<SymptomTrendsProps> = ({ history, seasonalPattern, riskTrend, symptomOccurrenceByDay }) => {
  // Process data for charts
  const processData = () => {
    const symptomFrequency: { [key: string]: number } = {};
    const riskLevelData = history.map(entry => ({
      date: new Date(entry.date).toLocaleDateString(),
      riskLevel: entry.riskLevel === 'high' ? 3 : entry.riskLevel === 'medium' ? 2 : 1,
      symptoms: entry.symptoms.length
    }));

    history.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        symptomFrequency[symptom] = (symptomFrequency[symptom] || 0) + 1;
      });
    });

    return {
      riskLevelData,
      symptomFrequency
    };
  };

  const { riskLevelData, symptomFrequency } = processData();

  const getRiskLevelColor = (level: number) => {
    switch (level) {
      case 3:
        return '#ef4444';
      case 2:
        return '#f59e0b';
      case 1:
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const seasonalData = seasonalPattern ? months.map((month, index) => ({
    month,
    count: seasonalPattern[index]
  })) : [];

  const dailyOccurrenceData = symptomOccurrenceByDay ? daysOfWeek.map((day, index) => ({
    day,
    count: symptomOccurrenceByDay[index]
  })) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Trends</CardTitle>
        <CardDescription>Track your symptom patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="risk" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="risk">Risk Level Trend</TabsTrigger>
            <TabsTrigger value="frequency">Symptom Frequency</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
            <TabsTrigger value="daily">Daily Occurrence</TabsTrigger>
          </TabsList>
          
          <TabsContent value="risk" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskLevelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 3]} ticks={[1, 2, 3]} />
                  <Tooltip
                    formatter={(value: number) => {
                      const level = value === 3 ? 'High' : value === 2 ? 'Medium' : 'Low';
                      return [level, 'Risk Level'];
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="riskLevel"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ fill: (data) => getRiskLevelColor(data.riskLevel) }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="frequency" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(symptomFrequency)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 6)
                .map(([symptom, frequency]) => (
                  <div key={symptom} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{symptom}</span>
                    <Badge variant="secondary">{frequency} times</Badge>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-4">
            {seasonalData.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-500">Not enough data to detect seasonal patterns.</p>
            )}
          </TabsContent>

          {riskTrend && riskTrend.length > 0 && (
            <TabsContent value="risk-trend" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 3]} ticks={[1, 2, 3]} />
                    <Tooltip
                      formatter={(value: number) => {
                        const level = value === 3 ? 'High' : value === 2 ? 'Medium' : 'Low';
                        return [level, 'Predicted Risk'];
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#ff7300"
                      strokeWidth={2}
                      dot={{ fill: (data) => getRiskLevelColor(data.risk) }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          )}

          {symptomOccurrenceByDay && symptomOccurrenceByDay.length > 0 && (
            <TabsContent value="daily" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyOccurrenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4299e1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SymptomTrends; 