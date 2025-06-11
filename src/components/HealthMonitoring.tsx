import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { healthDataService } from '@/services/api';

const HealthMonitoring = () => {
  interface Vitals {
    bloodPressure: { systolic: string; diastolic: string };
    heartRate: string;
    weight: string;
    bloodSugar: string;
    temperature: string;
  }

  const [vitals, setVitals] = useState<Vitals>({
    bloodPressure: { systolic: '', diastolic: '' },
    heartRate: '',
    weight: '',
    bloodSugar: '',
    temperature: ''
  });

  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);

  const handleScanDevices = async () => {
    try {
      // Simulated device scanning (replace with actual implementation)
      const devices = [
        { id: '1', name: 'Smart Watch Pro', type: 'wearable' },
        { id: '2', name: 'Blood Pressure Monitor', type: 'medical' },
        { id: '3', name: 'Smart Scale', type: 'medical' }
      ];
      setAvailableDevices(devices);
    } catch (error) {
      console.error('Error scanning devices:', error);
    }
  };

  const handleConnectDevice = async (deviceId) => {
    try {
      // Simulated device connection (replace with actual implementation)
      const device = availableDevices.find(d => d.id === deviceId);
      if (device) {
        setConnectedDevice(device);
        setIsConnected(true);
        // Start receiving data from device
        startListeningToDevice(device);
      }
    } catch (error) {
      console.error('Error connecting device:', error);
    }
  };

  const startListeningToDevice = (device) => {
    // Simulated data listening (replace with actual implementation)
    const interval = setInterval(() => {
      if (device.type === 'wearable') {
        // Simulate heart rate data
        const heartRate = Math.floor(Math.random() * 20 + 60);
        setVitals(prev => ({ ...prev, heartRate: heartRate.toString() }));
      } else if (device.type === 'medical') {
        // Simulate medical device data
        if (device.name === 'Blood Pressure Monitor') {
          const systolic = Math.floor(Math.random() * 20 + 110);
          const diastolic = Math.floor(Math.random() * 10 + 70);
          setVitals(prev => ({ ...prev, bloodPressure: { systolic: systolic.toString(), diastolic: diastolic.toString() } }));
        } else if (device.name === 'Smart Scale') {
          const weight = Math.floor(Math.random() * 5 + 160);
          setVitals(prev => ({ ...prev, weight: weight.toString() }));
        }
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  };

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

  const logVitals = async () => {
    console.log('Logging vitals:', vitals);
    try {
      await healthDataService.addHealthData({ type: "Vitals", data: vitals, timestamp: new Date().toISOString() });
      // Optionally, fetch updated data or show a success toast
      console.log("Vitals logged successfully!");
    } catch (error) {
      console.error("Failed to log vitals:", error);
      // Optionally, show an error toast
    }
    // Reset form
    setVitals({
      bloodPressure: { systolic: '', diastolic: '', },
      heartRate: '',
      weight: '',
      bloodSugar: '',
      temperature: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Device Connection Section */}
      <Card>
        <CardHeader>
          <CardTitle>Device Connection</CardTitle>
          <CardDescription>Connect your health monitoring devices</CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <Button onClick={handleScanDevices}>
                {availableDevices.length > 0 ? 'Connect Device' : 'Scan Devices'}
              </Button>
              {availableDevices.length > 0 && (
                <div className="space-y-2">
                  <Label>Available Devices</Label>
                  {availableDevices.map(device => (
                    <Button
                      key={device.id}
                      variant="outline"
                      onClick={() => handleConnectDevice(device.id)}
                      className="w-full justify-between"
                    >
                      {device.name}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Device</CardTitle>
                  <CardDescription>
                    {connectedDevice.name} is connected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsConnected(false);
                      setConnectedDevice(null);
                    }}
                  >
                    Disconnect
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Readings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Readings</CardTitle>
          <CardDescription>View your latest health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReadings.map((reading, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{reading.type}</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reading.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {reading.date} at {reading.time}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Monitoring Trends Section */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">View Trends</TabsTrigger>
          <TabsTrigger value="log">View Log</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
          <TabsTrigger value="recent">Recent Readings</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Trends</CardTitle>
              <CardDescription>Track your vital signs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blood Pressure Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Pressure</CardTitle>
                    <CardDescription>Systolic and Diastolic Pressure</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={bloodPressureData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="systolic" stroke="#2563eb" />
                        <Line type="monotone" dataKey="diastolic" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Heart Rate Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Heart Rate</CardTitle>
                    <CardDescription>Resting, Active, and Recovery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={heartRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="resting" fill="#2563eb" />
                        <Bar dataKey="active" fill="#10b981" />
                        <Bar dataKey="recovery" fill="#f97316" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weight and Blood Sugar</CardTitle>
              <CardDescription>Track your weight and blood sugar levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weight Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weight</CardTitle>
                    <CardDescription>Weight and BMI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#2563eb" />
                        <Line type="monotone" dataKey="bmi" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Blood Sugar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Blood Sugar</CardTitle>
                    <CardDescription>Fasting and Post-Meal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={bloodSugarData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="fasting" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                        <Area type="monotone" dataKey="postMeal" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Log</CardTitle>
              <CardDescription>Your health measurements history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReadings.map((reading, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{reading.type}</h3>
                      <span className="text-sm text-gray-600">{reading.date} at {reading.time}</span>
                    </div>
                    <div className="text-2xl font-bold mb-2">{reading.value}</div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Status:</span>
                      <span className={`font-medium ${
                        reading.status === 'normal' || reading.status === 'good' ? 'text-green-600' :
                        reading.status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {reading.status}
                      </span>
                    </div>
                  </div>
                ))}
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
                <Button onClick={logVitals} className="w-full bg-blue-600 hover:bg-blue-700">
                  Log Readings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;
