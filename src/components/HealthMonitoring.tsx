
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bluetooth, Wifi, Smartphone, Activity, AlertCircle, RefreshCw, Check, X } from "lucide-react";
import { bluetoothService, healthDataService } from "@/services";

const HealthMonitoring = () => {
  const [vitals, setVitals] = useState({
    bloodPressure: { systolic: '', diastolic: '' },
    heartRate: '',
    weight: '',
    bloodSugar: '',
    temperature: ''
  });
  
  // Bluetooth state
  const [bluetoothSupported, setBluetoothSupported] = useState<boolean | null>(null);
  const [devices, setDevices] = useState<Array<{
    id: string;
    name: string;
    type: string;
    status: 'connected' | 'disconnected' | 'connecting' | 'error';
    connectionType: 'bluetooth' | 'wifi';
    lastSync?: Date;
    batteryLevel?: number;
    error?: string;
  }>>([]);
  
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    inProgress: boolean;
    deviceId?: string;
    progress?: number;
    message?: string;
  }>({ inProgress: false });
  const [bluetoothError, setBluetoothError] = useState<string | null>(null);

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
  
  // Check if Bluetooth is supported
  const checkBluetoothSupport = useCallback(async () => {
    try {
      const isSupported = bluetoothService.isSupported();
      setBluetoothSupported(isSupported);
      if (!isSupported) {
        setBluetoothError('Web Bluetooth is not supported in this browser. Try using Chrome, Edge, or Opera.');
      }
      return isSupported;
    } catch (error) {
      console.error('Error checking Bluetooth support:', error);
      setBluetoothSupported(false);
      setBluetoothError('Error checking Bluetooth support. Please ensure Bluetooth is enabled on your device.');
      return false;
    }
  }, []);

  // Request and connect to a Bluetooth device
  const scanForDevices = async () => {
    setBluetoothError(null);
    setScanning(true);
    
    try {
      // Check if Bluetooth is supported
      const isSupported = await checkBluetoothSupport();
      if (!isSupported) {
        setScanning(false);
        return;
      }
      
      // Request device
      const deviceInfo = await bluetoothService.requestDevice({});
      
      if (!deviceInfo) {
        setScanning(false);
        setBluetoothError('No device selected or device selection was canceled.');
        return;
      }
      
      // Add device to list if not already present
      setDevices(prevDevices => {
        const existingDevice = prevDevices.find(d => d.id === deviceInfo.deviceId);
        if (existingDevice) {
          return prevDevices;
        }
        
        return [
          ...prevDevices,
          {
            id: deviceInfo.deviceId!,
            name: deviceInfo.name,
            type: getDeviceTypeLabel(deviceInfo.type),
            status: 'disconnected',
            connectionType: 'bluetooth'
          }
        ];
      });
      
      setScanning(false);
    } catch (error) {
      console.error('Error scanning for devices:', error);
      setScanning(false);
      setBluetoothError(`Error scanning for devices: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Connect to a device
  const connectToDevice = async (deviceId: string) => {
    setBluetoothError(null);
    
    // Update device status to connecting
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId 
          ? { ...device, status: 'connecting' } 
          : device
      )
    );
    
    try {
      // Connect to the device
      const connected = await bluetoothService.connect(deviceId);
      
      if (!connected) {
        throw new Error('Failed to connect to device');
      }
      
      // Update device status
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { ...device, status: 'connected', lastSync: new Date() } 
            : device
        )
      );
      
      setSelectedDevice(deviceId);
      
      // Get device services
      const services = await bluetoothService.getServices(deviceId);
      console.log('Device services:', services);
      
      // Try to read battery level if available
      try {
        const batteryService = services.find(s => s.uuid === '0000180f-0000-1000-8000-00805f9b34fb');
        if (batteryService) {
          const batteryCharacteristic = batteryService.characteristics.find(
            c => c.uuid === '00002a19-0000-1000-8000-00805f9b34fb'
          );
          
          if (batteryCharacteristic) {
            const batteryLevel = await bluetoothService.readValue(
              deviceId, 
              batteryService.uuid, 
              batteryCharacteristic.uuid
            );
            
            if (batteryLevel && 'value' in batteryLevel) {
              setDevices(prevDevices => 
                prevDevices.map(device => 
                  device.id === deviceId 
                    ? { ...device, batteryLevel: batteryLevel.value } 
                    : device
                )
              );
            }
          }
        }
      } catch (error) {
        console.warn('Could not read battery level:', error);
      }
      
    } catch (error) {
      console.error('Error connecting to device:', error);
      setBluetoothError(`Error connecting to device: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Update device status to error
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { 
                ...device, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Unknown error' 
              } 
            : device
        )
      );
    }
  };
  
  // Disconnect from a device
  const disconnectDevice = async (deviceId: string) => {
    try {
      await bluetoothService.disconnect(deviceId);
      
      // Update device status
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { ...device, status: 'disconnected' } 
            : device
        )
      );
      
      if (selectedDevice === deviceId) {
        setSelectedDevice(null);
      }
    } catch (error) {
      console.error('Error disconnecting from device:', error);
      setBluetoothError(`Error disconnecting from device: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Sync data from a device
  const syncDeviceData = async (deviceId: string) => {
    setSyncStatus({
      inProgress: true,
      deviceId,
      progress: 0,
      message: 'Starting data sync...'
    });
    
    try {
      // Get device services
      const services = await bluetoothService.getServices(deviceId);
      
      // Find health-related services
      const healthServices = services.filter(service => {
        const uuid = service.uuid.toLowerCase();
        return (
          uuid.includes('180d') || // Heart rate
          uuid.includes('1810') || // Blood pressure
          uuid.includes('1809') || // Health thermometer
          uuid.includes('1808') || // Glucose
          uuid.includes('181d')    // Weight scale
        );
      });
      
      if (healthServices.length === 0) {
        setSyncStatus({
          inProgress: true,
          deviceId,
          progress: 100,
          message: 'No health services found on this device'
        });
        
        setTimeout(() => {
          setSyncStatus({ inProgress: false });
        }, 2000);
        
        return;
      }
      
      // Process each health service
      for (let i = 0; i < healthServices.length; i++) {
        const service = healthServices[i];
        const progress = Math.round((i / healthServices.length) * 100);
        
        setSyncStatus({
          inProgress: true,
          deviceId,
          progress,
          message: `Reading from ${service.name}...`
        });
        
        // Find measurement characteristics
        const measurementCharacteristics = service.characteristics.filter(c => 
          c.properties.read || c.properties.notify
        );
        
        for (const characteristic of measurementCharacteristics) {
          try {
            // Read value
            const value = await bluetoothService.readValue(
              deviceId,
              service.uuid,
              characteristic.uuid
            );
            
            if (value) {
              console.log(`Read ${characteristic.name}:`, value);
              
              // Save to health data service
              await saveDeviceReading(deviceId, service, characteristic, value);
            }
          } catch (error) {
            console.warn(`Error reading ${characteristic.name}:`, error);
          }
        }
      }
      
      // Update device last sync time
      const now = new Date();
      setDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { ...device, lastSync: now } 
            : device
        )
      );
      
      setSyncStatus({
        inProgress: true,
        deviceId,
        progress: 100,
        message: 'Sync completed successfully'
      });
      
      // Clear sync status after a delay
      setTimeout(() => {
        setSyncStatus({ inProgress: false });
      }, 2000);
      
    } catch (error) {
      console.error('Error syncing device data:', error);
      setSyncStatus({
        inProgress: true,
        deviceId,
        progress: 100,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
      
      // Clear sync status after a delay
      setTimeout(() => {
        setSyncStatus({ inProgress: false });
      }, 3000);
    }
  };
  
  // Save device reading to health data service
  const saveDeviceReading = async (deviceId: string, service: any, characteristic: any, value: any) => {
    if (!value) return;
    
    let healthData: any = null;
    
    // Heart Rate Measurement
    if (characteristic.uuid === '00002a37-0000-1000-8000-00805f9b34fb') {
      healthData = {
        type: 'heart_rate',
        value: value.value,
        unit: value.unit,
        timestamp: new Date(),
        source: 'device',
        metadata: { deviceId }
      };
    }
    
    // Blood Pressure Measurement
    else if (characteristic.uuid === '00002a35-0000-1000-8000-00805f9b34fb') {
      healthData = {
        type: 'blood_pressure',
        value: {
          systolic: value.systolic.value,
          diastolic: value.diastolic.value
        },
        unit: value.systolic.unit,
        timestamp: new Date(),
        source: 'device',
        metadata: { deviceId }
      };
    }
    
    // Temperature Measurement
    else if (characteristic.uuid === '00002a1c-0000-1000-8000-00805f9b34fb') {
      healthData = {
        type: 'temperature',
        value: value.value,
        unit: value.unit,
        timestamp: new Date(),
        source: 'device',
        metadata: { deviceId }
      };
    }
    
    // Weight Measurement
    else if (characteristic.uuid === '00002a9d-0000-1000-8000-00805f9b34fb') {
      healthData = {
        type: 'weight',
        value: value.value,
        unit: value.unit,
        timestamp: new Date(),
        source: 'device',
        metadata: { deviceId }
      };
    }
    
    // Glucose Measurement
    else if (characteristic.uuid === '00002a18-0000-1000-8000-00805f9b34fb') {
      healthData = {
        type: 'blood_glucose',
        value: value.value,
        unit: value.unit,
        timestamp: new Date(),
        source: 'device',
        metadata: { deviceId }
      };
    }
    
    // Save to health data service if we have valid data
    if (healthData) {
      try {
        await healthDataService.createHealthData(healthData);
        console.log('Saved health data:', healthData);
      } catch (error) {
        console.error('Error saving health data:', error);
      }
    }
  };
  
  // Get human-readable device type label
  const getDeviceTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      'fitness_tracker': 'Fitness Tracker',
      'blood_pressure': 'BP Monitor',
      'glucose_monitor': 'Glucose Monitor',
      'scale': 'Smart Scale',
      'smartwatch': 'Smartwatch',
      'thermometer': 'Thermometer',
      'other': 'Health Device'
    };
    
    return typeMap[type] || 'Health Device';
  };
  
  // Check Bluetooth support on component mount
  useEffect(() => {
    checkBluetoothSupport();
    
    // Set up event listener for device disconnection
    const handleDeviceDisconnected = (event: Event) => {
      const customEvent = event as CustomEvent<{deviceId: string}>;
      if (customEvent.detail && customEvent.detail.deviceId) {
        const { deviceId } = customEvent.detail;
        
        // Update device status
        setDevices(prevDevices => 
          prevDevices.map(device => 
            device.id === deviceId 
              ? { ...device, status: 'disconnected' } 
              : device
          )
        );
        
        if (selectedDevice === deviceId) {
          setSelectedDevice(null);
        }
      }
    };
    
    window.addEventListener('bluetooth-device-disconnected', handleDeviceDisconnected);
    
    return () => {
      window.removeEventListener('bluetooth-device-disconnected', handleDeviceDisconnected);
      
      // Disconnect all devices when component unmounts
      devices.forEach(device => {
        if (device.status === 'connected' && device.id) {
          bluetoothService.disconnect(device.id).catch(console.error);
        }
      });
    };
  }, [checkBluetoothSupport, devices, selectedDevice]);
  
  // Auto-sync effect
  useEffect(() => {
    if (autoSync) {
      const connectedDevices = devices.filter(d => d.status === 'connected');
      
      if (connectedDevices.length > 0) {
        const syncAll = async () => {
          for (const device of connectedDevices) {
            await syncDeviceData(device.id);
          }
        };
        
        syncAll();
      }
    }
  }, [autoSync, devices]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Monitoring</h1>
        <p className="text-gray-600">Track your vital signs and health metrics over time</p>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">View Trends</TabsTrigger>
          <TabsTrigger value="log">Log Vitals</TabsTrigger>
          <TabsTrigger value="recent">Recent Readings</TabsTrigger>
          <TabsTrigger value="goals">Health Goals</TabsTrigger>
          <TabsTrigger value="devices">Connect Devices</TabsTrigger>
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

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect Health Devices</CardTitle>
              <CardDescription>Connect and sync data from your health monitoring devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {bluetoothSupported === false && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Bluetooth Not Supported</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Web Bluetooth is not supported in this browser. Please use Chrome, Edge, or Opera to connect to Bluetooth devices.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {bluetoothError && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Connection Error</h4>
                        <p className="text-sm text-yellow-700 mt-1">{bluetoothError}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Health Devices</h3>
                    <p className="text-sm text-gray-500">
                      {devices.length === 0 
                        ? 'Click "Scan for Devices" to find nearby Bluetooth health devices' 
                        : `${devices.length} device${devices.length !== 1 ? 's' : ''} found`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={scanForDevices}
                      disabled={scanning || bluetoothSupported === false}
                    >
                      {scanning ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        'Scan for Devices'
                      )}
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="auto-sync" 
                        checked={autoSync}
                        onCheckedChange={setAutoSync}
                        disabled={devices.filter(d => d.status === 'connected').length === 0}
                      />
                      <Label htmlFor="auto-sync">Auto-sync</Label>
                    </div>
                  </div>
                </div>

                {devices.length === 0 && !scanning && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <Bluetooth className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-700 mb-1">No Devices Found</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                      Click the "Scan for Devices" button to search for nearby Bluetooth health devices. 
                      Make sure your devices are powered on and in pairing mode.
                    </p>
                    <Button 
                      onClick={scanForDevices}
                      disabled={scanning || bluetoothSupported === false}
                    >
                      Scan for Devices
                    </Button>
                  </div>
                )}

                {devices.length > 0 && (
                  <div className="space-y-3">
                    {devices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full ${
                            device.status === 'connected' ? 'bg-green-100' : 
                            device.status === 'connecting' ? 'bg-blue-100' :
                            device.status === 'error' ? 'bg-red-100' : 'bg-gray-100'
                          }`}>
                            {device.connectionType === 'bluetooth' ? (
                              <Bluetooth className={`h-5 w-5 ${
                                device.status === 'connected' ? 'text-green-600' : 
                                device.status === 'connecting' ? 'text-blue-600' :
                                device.status === 'error' ? 'text-red-600' : 'text-gray-600'
                              }`} />
                            ) : device.connectionType === 'wifi' ? (
                              <Wifi className={`h-5 w-5 ${
                                device.status === 'connected' ? 'text-green-600' : 
                                device.status === 'connecting' ? 'text-blue-600' :
                                device.status === 'error' ? 'text-red-600' : 'text-gray-600'
                              }`} />
                            ) : (
                              <Smartphone className={`h-5 w-5 ${
                                device.status === 'connected' ? 'text-green-600' : 
                                device.status === 'connecting' ? 'text-blue-600' :
                                device.status === 'error' ? 'text-red-600' : 'text-gray-600'
                              }`} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{device.name || 'Unknown Device'}</p>
                            <p className="text-sm text-gray-600">{device.type}</p>
                            {device.lastSync && (
                              <p className="text-xs text-gray-500">
                                Last synced: {device.lastSync.toLocaleString()}
                              </p>
                            )}
                            {device.batteryLevel !== undefined && (
                              <p className="text-xs text-gray-500">
                                Battery: {device.batteryLevel}%
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            device.status === 'connected' ? 'bg-green-100 text-green-800' : 
                            device.status === 'connecting' ? 'bg-blue-100 text-blue-800' :
                            device.status === 'error' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {device.status === 'connected' ? 'Connected' : 
                             device.status === 'connecting' ? 'Connecting...' :
                             device.status === 'error' ? 'Error' : 'Disconnected'}
                          </span>
                          {device.status === 'connected' ? (
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => syncDeviceData(device.id)}
                                disabled={syncStatus.inProgress && syncStatus.deviceId === device.id}
                              >
                                {syncStatus.inProgress && syncStatus.deviceId === device.id ? (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Syncing...
                                  </>
                                ) : (
                                  'Sync Data'
                                )}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => disconnectDevice(device.id)}
                              >
                                Disconnect
                              </Button>
                            </div>
                          ) : device.status === 'connecting' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={true}
                            >
                              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                              Connecting...
                            </Button>
                          ) : device.status === 'error' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => connectToDevice(device.id)}
                              disabled={scanning}
                            >
                              Retry
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => connectToDevice(device.id)}
                              disabled={scanning}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {syncStatus.inProgress && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-blue-800">Syncing Data</h4>
                        <span className="text-sm text-blue-700">{syncStatus.progress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${syncStatus.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-blue-700">{syncStatus.message}</p>
                    </div>
                  </div>
                )}

                {selectedDevice && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Device Settings</CardTitle>
                      <CardDescription>
                        Configure your connected device
                        {devices.find(d => d.id === selectedDevice)?.name && (
                          <>: {devices.find(d => d.id === selectedDevice)?.name}</>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="sync-frequency">Sync Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="sync-frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">Real-time</SelectItem>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="manual">Manual only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="data-types">Data to Sync</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Switch id="sync-heartrate" defaultChecked />
                              <Label htmlFor="sync-heartrate">Heart Rate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="sync-steps" defaultChecked />
                              <Label htmlFor="sync-steps">Steps</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="sync-sleep" defaultChecked />
                              <Label htmlFor="sync-sleep">Sleep</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch id="sync-activity" defaultChecked />
                              <Label htmlFor="sync-activity">Activity</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button className="w-full">Save Settings</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">About Bluetooth Health Devices</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Connect your Bluetooth health monitoring devices to automatically sync your health data. 
                        This allows for more accurate tracking and better health insights. Make sure your 
                        devices are powered on and in pairing mode before connecting.
                      </p>
                      <p className="text-sm text-blue-700 mt-2">
                        Supported devices include heart rate monitors, blood pressure monitors, 
                        glucose monitors, smart scales, and fitness trackers that use Bluetooth Low Energy (BLE).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;
