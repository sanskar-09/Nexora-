
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const HealthMonitoring = () => {
  const [vitals, setVitals] = useState({
    bloodPressure: { systolic: '', diastolic: '' },
    heartRate: '',
    weight: '',
    bloodSugar: '',
    temperature: ''
  });

  // Sample data for charts
  const bloodPressureData = [
    { date: '1/1', systolic: 120, diastolic: 80 },
    { date: '1/8', systolic: 118, diastolic: 78 },
    { date: '1/15', systolic: 122, diastolic: 82 },
    { date: '1/22', systolic: 115, diastolic: 75 },
    { date: '1/29', systolic: 119, diastolic: 79 }
  ];

  const weightData = [
    { date: '1/1', weight: 170 },
    { date: '1/8', weight: 169 },
    { date: '1/15', weight: 168 },
    { date: '1/22', weight: 167 },
    { date: '1/29', weight: 166 }
  ];

  const heartRateData = [
    { date: '1/1', rate: 72 },
    { date: '1/8', rate: 68 },
    { date: '1/15', rate: 74 },
    { date: '1/22', rate: 70 },
    { date: '1/29', rate: 69 }
  ];

  const recentReadings = [
    { type: 'Blood Pressure', value: '120/80 mmHg', date: '2024-01-29', status: 'normal' },
    { type: 'Heart Rate', value: '72 BPM', date: '2024-01-29', status: 'normal' },
    { type: 'Weight', value: '170 lbs', date: '2024-01-28', status: 'normal' },
    { type: 'Blood Sugar', value: '95 mg/dL', date: '2024-01-27', status: 'normal' }
  ];

  const logVitals = () => {
    console.log('Logging vitals:', vitals);
    // Reset form
    setVitals({
      bloodPressure: { systolic: '', diastolic: '' },
      heartRate: '',
      weight: '',
      bloodSugar: '',
      temperature: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Monitoring</h1>
        <p className="text-gray-600">Track your vital signs and health metrics over time</p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="log">Log Vitals</TabsTrigger>
          <TabsTrigger value="trends">View Trends</TabsTrigger>
          <TabsTrigger value="recent">Recent Readings</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log New Readings</CardTitle>
              <CardDescription>Enter your latest health measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Blood Pressure</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Systolic"
                      value={vitals.bloodPressure.systolic}
                      onChange={(e) => setVitals({
                        ...vitals, 
                        bloodPressure: {...vitals.bloodPressure, systolic: e.target.value}
                      })}
                    />
                    <span className="flex items-center">/</span>
                    <Input 
                      placeholder="Diastolic"
                      value={vitals.bloodPressure.diastolic}
                      onChange={(e) => setVitals({
                        ...vitals, 
                        bloodPressure: {...vitals.bloodPressure, diastolic: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                  <Input 
                    id="heartRate"
                    placeholder="72"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input 
                    id="weight"
                    placeholder="170"
                    value={vitals.weight}
                    onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input 
                    id="bloodSugar"
                    placeholder="95"
                    value={vitals.bloodSugar}
                    onChange={(e) => setVitals({...vitals, bloodSugar: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input 
                    id="temperature"
                    placeholder="98.6"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                  />
                </div>
              </div>

              <Button onClick={logVitals} className="w-full bg-blue-600 hover:bg-blue-700">
                Log Readings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="diastolic" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weight Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Average BP:</span>
                  <span className="font-medium">119/79 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Heart Rate:</span>
                  <span className="font-medium">70 BPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weight Change:</span>
                  <span className="font-medium text-green-600">-4 lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Health Score:</span>
                  <span className="font-medium text-blue-600">85/100</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
              <CardDescription>Your latest health measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReadings.map((reading, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{reading.type}</p>
                      <p className="text-sm text-gray-600">{reading.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{reading.value}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reading.status === 'normal' ? 'bg-green-100 text-green-800' :
                        reading.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reading.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" className="flex-1">Export Data</Button>
                <Button variant="outline" className="flex-1">Share with Doctor</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;
