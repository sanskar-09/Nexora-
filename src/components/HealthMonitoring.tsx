
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const HealthMonitoring = () => {
  const [vitals, setVitals] = useState({
    bloodPressure: { systolic: '', diastolic: '' },
    heartRate: '',
    weight: '',
    bloodSugar: '',
    temperature: ''
  });

  // Enhanced sample data for charts
  const bloodPressureData = [
    { date: '12/1', systolic: 125, diastolic: 82, time: 'Morning' },
    { date: '12/8', systolic: 120, diastolic: 80, time: 'Morning' },
    { date: '12/15', systolic: 118, diastolic: 78, time: 'Morning' },
    { date: '12/22', systolic: 122, diastolic: 82, time: 'Morning' },
    { date: '12/29', systolic: 115, diastolic: 75, time: 'Morning' },
    { date: '1/5', systolic: 119, diastolic: 79, time: 'Morning' },
    { date: '1/12', systolic: 117, diastolic: 77, time: 'Morning' },
    { date: '1/19', systolic: 121, diastolic: 81, time: 'Morning' },
    { date: '1/26', systolic: 116, diastolic: 76, time: 'Morning' }
  ];

  const weightData = [
    { date: '12/1', weight: 175, bmi: 25.2 },
    { date: '12/8', weight: 174, bmi: 25.0 },
    { date: '12/15', weight: 172, bmi: 24.7 },
    { date: '12/22', weight: 171, bmi: 24.6 },
    { date: '12/29', weight: 170, bmi: 24.4 },
    { date: '1/5', weight: 169, bmi: 24.3 },
    { date: '1/12', weight: 168, bmi: 24.1 },
    { date: '1/19', weight: 167, bmi: 24.0 },
    { date: '1/26', weight: 166, bmi: 23.9 }
  ];

  const heartRateData = [
    { date: '12/1', resting: 75, active: 145, recovery: 90 },
    { date: '12/8', resting: 72, active: 142, recovery: 88 },
    { date: '12/15', resting: 74, active: 148, recovery: 92 },
    { date: '12/22', resting: 70, active: 140, recovery: 85 },
    { date: '12/29', resting: 69, active: 138, recovery: 83 },
    { date: '1/5', resting: 71, active: 141, recovery: 87 },
    { date: '1/12', resting: 68, active: 136, recovery: 82 },
    { date: '1/19', resting: 73, active: 144, recovery: 89 },
    { date: '1/26', resting: 70, active: 139, recovery: 85 }
  ];

  const bloodSugarData = [
    { date: '12/1', fasting: 95, postMeal: 140 },
    { date: '12/8', fasting: 92, postMeal: 135 },
    { date: '12/15', fasting: 97, postMeal: 145 },
    { date: '12/22', fasting: 89, postMeal: 130 },
    { date: '12/29', fasting: 93, postMeal: 138 },
    { date: '1/5', fasting: 91, postMeal: 132 },
    { date: '1/12', fasting: 94, postMeal: 141 },
    { date: '1/19', fasting: 88, postMeal: 128 },
    { date: '1/26', fasting: 90, postMeal: 134 }
  ];

  const sleepData = [
    { date: '12/1', hours: 7.5, quality: 8.2, deep: 1.8, rem: 1.5 },
    { date: '12/8', hours: 8.0, quality: 8.5, deep: 2.0, rem: 1.7 },
    { date: '12/15', hours: 7.2, quality: 7.8, deep: 1.6, rem: 1.4 },
    { date: '12/22', hours: 8.3, quality: 8.7, deep: 2.2, rem: 1.8 },
    { date: '12/29', hours: 7.8, quality: 8.3, deep: 1.9, rem: 1.6 },
    { date: '1/5', hours: 7.6, quality: 8.1, deep: 1.7, rem: 1.5 },
    { date: '1/12', hours: 8.1, quality: 8.6, deep: 2.1, rem: 1.7 },
    { date: '1/19', hours: 7.4, quality: 7.9, deep: 1.7, rem: 1.4 },
    { date: '1/26', hours: 7.9, quality: 8.4, deep: 1.9, rem: 1.6 }
  ];

  const recentReadings = [
    { type: 'Blood Pressure', value: '116/76 mmHg', date: '2024-01-26', time: '8:30 AM', status: 'normal' },
    { type: 'Heart Rate', value: '70 BPM', date: '2024-01-26', time: '8:30 AM', status: 'normal' },
    { type: 'Weight', value: '166 lbs', date: '2024-01-25', time: '7:00 AM', status: 'normal' },
    { type: 'Blood Sugar', value: '90 mg/dL', date: '2024-01-26', time: '7:45 AM', status: 'normal' },
    { type: 'Temperature', value: '98.4°F', date: '2024-01-25', time: '6:00 PM', status: 'normal' },
    { type: 'Sleep Quality', value: '8.4/10', date: '2024-01-25', time: 'Night', status: 'good' },
    { type: 'Steps', value: '8,750 steps', date: '2024-01-25', time: 'All day', status: 'good' },
    { type: 'Water Intake', value: '68 oz', date: '2024-01-25', time: 'All day', status: 'normal' }
  ];

  const healthGoals = [
    { metric: 'Weight Loss', target: '165 lbs', current: '166 lbs', progress: 80, unit: 'lbs' },
    { metric: 'Blood Pressure', target: '<120/80', current: '116/76', progress: 95, unit: 'mmHg' },
    { metric: 'Daily Steps', target: '10,000', current: '8,750', progress: 87, unit: 'steps' },
    { metric: 'Sleep Quality', target: '8.5/10', current: '8.4/10', progress: 95, unit: '/10' },
    { metric: 'Exercise', target: '5 days/week', current: '4 days', progress: 80, unit: 'days' }
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

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">View Trends</TabsTrigger>
          <TabsTrigger value="log">Log Vitals</TabsTrigger>
          <TabsTrigger value="recent">Recent Readings</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure Trends</CardTitle>
                <CardDescription>Systolic and diastolic readings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[60, 140]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} name="Systolic" />
                    <Line type="monotone" dataKey="diastolic" stroke="#10b981" strokeWidth={2} name="Diastolic" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weight & BMI Trends</CardTitle>
                <CardDescription>Weight loss progress and BMI tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="weight" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Weight (lbs)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heart Rate Analysis</CardTitle>
                <CardDescription>Resting, active, and recovery heart rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="resting" fill="#10b981" name="Resting" />
                    <Bar dataKey="active" fill="#f59e0b" name="Active" />
                    <Bar dataKey="recovery" fill="#ef4444" name="Recovery" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blood Sugar Levels</CardTitle>
                <CardDescription>Fasting and post-meal glucose readings</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={bloodSugarData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 160]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="fasting" stroke="#06b6d4" strokeWidth={2} name="Fasting" />
                    <Line type="monotone" dataKey="postMeal" stroke="#ec4899" strokeWidth={2} name="Post-Meal" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sleep Quality Analysis</CardTitle>
                <CardDescription>Sleep duration, quality score, and sleep phases</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="hours" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Total Hours" />
                    <Area type="monotone" dataKey="deep" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} name="Deep Sleep" />
                    <Area type="monotone" dataKey="rem" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} name="REM Sleep" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
                <CardDescription>Key metrics overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Average BP:</span>
                  <span className="font-medium">118/78 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Heart Rate:</span>
                  <span className="font-medium">71 BPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weight Change:</span>
                  <span className="font-medium text-green-600">-9 lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Sleep:</span>
                  <span className="font-medium">7.8 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Health Score:</span>
                  <span className="font-medium text-blue-600">87/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Trend:</span>
                  <span className="font-medium text-green-600">↗ Improving</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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
                      <p className="text-sm text-gray-600">{reading.date} at {reading.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{reading.value}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reading.status === 'normal' || reading.status === 'good' ? 'bg-green-100 text-green-800' :
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

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Goals</CardTitle>
              <CardDescription>Track your progress towards health objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthGoals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{goal.metric}</h3>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Current: {goal.current}</span>
                      <span>Target: {goal.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;
