// Bluetooth Service for Nexora Health Monitoring
// This service handles Bluetooth device connections and data retrieval

// Define device types and their characteristics
export interface BluetoothDeviceInfo {
  name: string;
  type: 'fitness_tracker' | 'blood_pressure' | 'glucose_monitor' | 'scale' | 'smartwatch' | 'thermometer' | 'other';
  services: BluetoothServiceInfo[];
  deviceId?: string;
  connected: boolean;
}

export interface BluetoothServiceInfo {
  name: string;
  uuid: string;
  characteristics: BluetoothCharacteristicInfo[];
}

export interface BluetoothCharacteristicInfo {
  name: string;
  uuid: string;
  properties: {
    read?: boolean;
    write?: boolean;
    notify?: boolean;
  };
}

// Define device data types
export interface DeviceReading {
  type: string;
  value: any;
  unit: string;
  timestamp: Date;
}

// Known device profiles with their service and characteristic UUIDs
const DEVICE_PROFILES = {
  HEART_RATE: {
    name: 'Heart Rate Monitor',
    services: [
      {
        name: 'Heart Rate Service',
        uuid: '0000180d-0000-1000-8000-00805f9b34fb',
        characteristics: [
          {
            name: 'Heart Rate Measurement',
            uuid: '00002a37-0000-1000-8000-00805f9b34fb',
            properties: { notify: true }
          },
          {
            name: 'Body Sensor Location',
            uuid: '00002a38-0000-1000-8000-00805f9b34fb',
            properties: { read: true }
          }
        ]
      }
    ]
  },
  BLOOD_PRESSURE: {
    name: 'Blood Pressure Monitor',
    services: [
      {
        name: 'Blood Pressure Service',
        uuid: '00001810-0000-1000-8000-00805f9b34fb',
        characteristics: [
          {
            name: 'Blood Pressure Measurement',
            uuid: '00002a35-0000-1000-8000-00805f9b34fb',
            properties: { notify: true }
          },
          {
            name: 'Blood Pressure Feature',
            uuid: '00002a49-0000-1000-8000-00805f9b34fb',
            properties: { read: true }
          }
        ]
      }
    ]
  },
  GLUCOSE: {
    name: 'Glucose Monitor',
    services: [
      {
        name: 'Glucose Service',
        uuid: '00001808-0000-1000-8000-00805f9b34fb',
        characteristics: [
          {
            name: 'Glucose Measurement',
            uuid: '00002a18-0000-1000-8000-00805f9b34fb',
            properties: { notify: true }
          },
          {
            name: 'Glucose Feature',
            uuid: '00002a51-0000-1000-8000-00805f9b34fb',
            properties: { read: true }
          }
        ]
      }
    ]
  },
  WEIGHT_SCALE: {
    name: 'Weight Scale',
    services: [
      {
        name: 'Weight Scale Service',
        uuid: '0000181d-0000-1000-8000-00805f9b34fb',
        characteristics: [
          {
            name: 'Weight Measurement',
            uuid: '00002a9d-0000-1000-8000-00805f9b34fb',
            properties: { indicate: true }
          },
          {
            name: 'Weight Scale Feature',
            uuid: '00002a9e-0000-1000-8000-00805f9b34fb',
            properties: { read: true }
          }
        ]
      }
    ]
  },
  TEMPERATURE: {
    name: 'Health Thermometer',
    services: [
      {
        name: 'Health Thermometer Service',
        uuid: '00001809-0000-1000-8000-00805f9b34fb',
        characteristics: [
          {
            name: 'Temperature Measurement',
            uuid: '00002a1c-0000-1000-8000-00805f9b34fb',
            properties: { indicate: true }
          },
          {
            name: 'Temperature Type',
            uuid: '00002a1d-0000-1000-8000-00805f9b34fb',
            properties: { read: true }
          }
        ]
      }
    ]
  }
};

// Active device connections
let connectedDevices: Map<string, {
  device: BluetoothDevice,
  gatt?: BluetoothRemoteGATTServer,
  services: Map<string, BluetoothRemoteGATTService>,
  characteristics: Map<string, BluetoothRemoteGATTCharacteristic>,
  listeners: Map<string, (event: Event) => void>
}> = new Map();

// Bluetooth service
const bluetoothService = {
  // Check if Web Bluetooth is supported
  isSupported(): boolean {
    return navigator.bluetooth !== undefined;
  },

  // Request a device with specific services
  async requestDevice(options: {
    services?: string[],
    filters?: BluetoothRequestDeviceFilter[],
    optionalServices?: string[]
  }): Promise<BluetoothDeviceInfo | null> {
    try {
      if (!this.isSupported()) {
        throw new Error('Web Bluetooth API is not supported in this browser');
      }

      // Default to common health services if none specified
      const defaultServices = [
        // Heart rate service
        '0000180d-0000-1000-8000-00805f9b34fb',
        // Blood pressure service
        '00001810-0000-1000-8000-00805f9b34fb',
        // Health thermometer service
        '00001809-0000-1000-8000-00805f9b34fb',
        // Glucose service
        '00001808-0000-1000-8000-00805f9b34fb',
        // Weight scale service
        '0000181d-0000-1000-8000-00805f9b34fb'
      ];

      // Request device with specified services
      const device = await navigator.bluetooth.requestDevice({
        filters: options.filters || [
          { services: options.services || defaultServices },
          { namePrefix: 'Fitbit' },
          { namePrefix: 'Omron' },
          { namePrefix: 'Withings' },
          { namePrefix: 'Dexcom' },
          { namePrefix: 'Apple Watch' }
        ],
        optionalServices: options.optionalServices || defaultServices
      });

      // Set up device disconnect listener
      device.addEventListener('gattserverdisconnected', () => {
        this.handleDisconnection(device.id);
      });

      // Determine device type based on name or services
      const deviceInfo: BluetoothDeviceInfo = {
        name: device.name || 'Unknown Device',
        type: this.determineDeviceType(device),
        services: [],
        deviceId: device.id,
        connected: false
      };

      return deviceInfo;
    } catch (error) {
      console.error('Error requesting Bluetooth device:', error);
      return null;
    }
  },

  // Connect to a device
  async connect(deviceId: string): Promise<boolean> {
    try {
      // Get device from navigator.bluetooth
      const devices = await navigator.bluetooth.getDevices();
      const device = devices.find(d => d.id === deviceId);
      
      if (!device) {
        throw new Error(`Device with ID ${deviceId} not found`);
      }

      // Connect to GATT server
      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error('Failed to connect to GATT server');
      }

      // Store connection
      connectedDevices.set(deviceId, {
        device,
        gatt: server,
        services: new Map(),
        characteristics: new Map(),
        listeners: new Map()
      });

      return true;
    } catch (error) {
      console.error('Error connecting to device:', error);
      return false;
    }
  },

  // Disconnect from a device
  async disconnect(deviceId: string): Promise<boolean> {
    try {
      const connection = connectedDevices.get(deviceId);
      if (!connection) {
        return false;
      }

      // Remove all listeners
      connection.listeners.forEach((listener, characteristicId) => {
        const characteristic = connection.characteristics.get(characteristicId);
        if (characteristic) {
          characteristic.removeEventListener('characteristicvaluechanged', listener);
        }
      });

      // Disconnect GATT
      if (connection.gatt?.connected) {
        connection.gatt.disconnect();
      }

      // Remove from connected devices
      connectedDevices.delete(deviceId);
      return true;
    } catch (error) {
      console.error('Error disconnecting from device:', error);
      return false;
    }
  },

  // Handle device disconnection
  handleDisconnection(deviceId: string): void {
    const connection = connectedDevices.get(deviceId);
    if (connection) {
      // Clean up resources
      connection.services.clear();
      connection.characteristics.clear();
      connection.listeners.clear();
      connectedDevices.delete(deviceId);
      
      // Dispatch event for UI to update
      window.dispatchEvent(new CustomEvent('bluetooth-device-disconnected', {
        detail: { deviceId }
      }));
    }
  },

  // Get all services for a connected device
  async getServices(deviceId: string): Promise<BluetoothServiceInfo[]> {
    try {
      const connection = connectedDevices.get(deviceId);
      if (!connection || !connection.gatt) {
        throw new Error('Device not connected');
      }

      // Discover all services
      const services = await connection.gatt.getPrimaryServices();
      const serviceInfos: BluetoothServiceInfo[] = [];

      for (const service of services) {
        // Store service
        connection.services.set(service.uuid, service);
        
        // Get characteristics for this service
        const characteristics = await service.getCharacteristics();
        const characteristicInfos: BluetoothCharacteristicInfo[] = [];

        for (const characteristic of characteristics) {
          // Store characteristic
          connection.characteristics.set(characteristic.uuid, characteristic);
          
          characteristicInfos.push({
            name: this.getCharacteristicName(service.uuid, characteristic.uuid),
            uuid: characteristic.uuid,
            properties: {
              read: characteristic.properties.read,
              write: characteristic.properties.write,
              notify: characteristic.properties.notify
            }
          });
        }

        serviceInfos.push({
          name: this.getServiceName(service.uuid),
          uuid: service.uuid,
          characteristics: characteristicInfos
        });
      }

      return serviceInfos;
    } catch (error) {
      console.error('Error getting services:', error);
      return [];
    }
  },

  // Read value from a characteristic
  async readValue(deviceId: string, serviceUuid: string, characteristicUuid: string): Promise<any> {
    try {
      const connection = connectedDevices.get(deviceId);
      if (!connection) {
        throw new Error('Device not connected');
      }

      // Get service
      let service = connection.services.get(serviceUuid);
      if (!service && connection.gatt) {
        service = await connection.gatt.getPrimaryService(serviceUuid);
        if (service) {
          connection.services.set(serviceUuid, service);
        }
      }

      if (!service) {
        throw new Error(`Service ${serviceUuid} not found`);
      }

      // Get characteristic
      let characteristic = connection.characteristics.get(characteristicUuid);
      if (!characteristic) {
        characteristic = await service.getCharacteristic(characteristicUuid);
        if (characteristic) {
          connection.characteristics.set(characteristicUuid, characteristic);
        }
      }

      if (!characteristic) {
        throw new Error(`Characteristic ${characteristicUuid} not found`);
      }

      // Read value
      const value = await characteristic.readValue();
      return this.parseCharacteristicValue(serviceUuid, characteristicUuid, value);
    } catch (error) {
      console.error('Error reading characteristic value:', error);
      return null;
    }
  },

  // Start notifications for a characteristic
  async startNotifications(
    deviceId: string, 
    serviceUuid: string, 
    characteristicUuid: string, 
    callback: (value: any) => void
  ): Promise<boolean> {
    try {
      const connection = connectedDevices.get(deviceId);
      if (!connection) {
        throw new Error('Device not connected');
      }

      // Get service
      let service = connection.services.get(serviceUuid);
      if (!service && connection.gatt) {
        service = await connection.gatt.getPrimaryService(serviceUuid);
        if (service) {
          connection.services.set(serviceUuid, service);
        }
      }

      if (!service) {
        throw new Error(`Service ${serviceUuid} not found`);
      }

      // Get characteristic
      let characteristic = connection.characteristics.get(characteristicUuid);
      if (!characteristic) {
        characteristic = await service.getCharacteristic(characteristicUuid);
        if (characteristic) {
          connection.characteristics.set(characteristicUuid, characteristic);
        }
      }

      if (!characteristic) {
        throw new Error(`Characteristic ${characteristicUuid} not found`);
      }

      // Start notifications
      await characteristic.startNotifications();

      // Set up listener
      const listener = (event: Event) => {
        const target = event.target as BluetoothRemoteGATTCharacteristic;
        const value = this.parseCharacteristicValue(serviceUuid, characteristicUuid, target.value);
        callback(value);
      };

      characteristic.addEventListener('characteristicvaluechanged', listener);
      connection.listeners.set(characteristicUuid, listener);

      return true;
    } catch (error) {
      console.error('Error starting notifications:', error);
      return false;
    }
  },

  // Stop notifications for a characteristic
  async stopNotifications(deviceId: string, serviceUuid: string, characteristicUuid: string): Promise<boolean> {
    try {
      const connection = connectedDevices.get(deviceId);
      if (!connection) {
        throw new Error('Device not connected');
      }

      const characteristic = connection.characteristics.get(characteristicUuid);
      if (!characteristic) {
        throw new Error(`Characteristic ${characteristicUuid} not found`);
      }

      // Stop notifications
      await characteristic.stopNotifications();

      // Remove listener
      const listener = connection.listeners.get(characteristicUuid);
      if (listener) {
        characteristic.removeEventListener('characteristicvaluechanged', listener);
        connection.listeners.delete(characteristicUuid);
      }

      return true;
    } catch (error) {
      console.error('Error stopping notifications:', error);
      return false;
    }
  },

  // Get all connected devices
  getConnectedDevices(): string[] {
    return Array.from(connectedDevices.keys());
  },

  // Check if a device is connected
  isConnected(deviceId: string): boolean {
    const connection = connectedDevices.get(deviceId);
    return connection?.gatt?.connected || false;
  },

  // Determine device type based on name or services
  determineDeviceType(device: BluetoothDevice): BluetoothDeviceInfo['type'] {
    const name = device.name?.toLowerCase() || '';
    
    if (name.includes('blood pressure') || name.includes('bp') || name.includes('omron')) {
      return 'blood_pressure';
    } else if (name.includes('glucose') || name.includes('dexcom')) {
      return 'glucose_monitor';
    } else if (name.includes('scale') || name.includes('weight') || name.includes('withings')) {
      return 'scale';
    } else if (name.includes('watch') || name.includes('apple')) {
      return 'smartwatch';
    } else if (name.includes('fitbit')) {
      return 'fitness_tracker';
    } else if (name.includes('thermometer') || name.includes('temp')) {
      return 'thermometer';
    } else {
      return 'other';
    }
  },

  // Get human-readable service name
  getServiceName(uuid: string): string {
    const services: Record<string, string> = {
      '0000180d-0000-1000-8000-00805f9b34fb': 'Heart Rate Service',
      '00001810-0000-1000-8000-00805f9b34fb': 'Blood Pressure Service',
      '00001809-0000-1000-8000-00805f9b34fb': 'Health Thermometer Service',
      '00001808-0000-1000-8000-00805f9b34fb': 'Glucose Service',
      '0000181d-0000-1000-8000-00805f9b34fb': 'Weight Scale Service',
      '0000180f-0000-1000-8000-00805f9b34fb': 'Battery Service',
      '00001800-0000-1000-8000-00805f9b34fb': 'Generic Access',
      '00001801-0000-1000-8000-00805f9b34fb': 'Generic Attribute'
    };
    
    return services[uuid] || `Unknown Service (${uuid})`;
  },

  // Get human-readable characteristic name
  getCharacteristicName(serviceUuid: string, characteristicUuid: string): string {
    const characteristics: Record<string, string> = {
      // Heart Rate Service characteristics
      '00002a37-0000-1000-8000-00805f9b34fb': 'Heart Rate Measurement',
      '00002a38-0000-1000-8000-00805f9b34fb': 'Body Sensor Location',
      
      // Blood Pressure Service characteristics
      '00002a35-0000-1000-8000-00805f9b34fb': 'Blood Pressure Measurement',
      '00002a49-0000-1000-8000-00805f9b34fb': 'Blood Pressure Feature',
      
      // Health Thermometer Service characteristics
      '00002a1c-0000-1000-8000-00805f9b34fb': 'Temperature Measurement',
      '00002a1d-0000-1000-8000-00805f9b34fb': 'Temperature Type',
      
      // Glucose Service characteristics
      '00002a18-0000-1000-8000-00805f9b34fb': 'Glucose Measurement',
      '00002a51-0000-1000-8000-00805f9b34fb': 'Glucose Feature',
      
      // Weight Scale Service characteristics
      '00002a9d-0000-1000-8000-00805f9b34fb': 'Weight Measurement',
      '00002a9e-0000-1000-8000-00805f9b34fb': 'Weight Scale Feature',
      
      // Battery Service characteristics
      '00002a19-0000-1000-8000-00805f9b34fb': 'Battery Level'
    };
    
    return characteristics[characteristicUuid] || `Unknown Characteristic (${characteristicUuid})`;
  },

  // Parse characteristic value based on type
  parseCharacteristicValue(serviceUuid: string, characteristicUuid: string, value: DataView | null): any {
    if (!value) return null;

    // Heart Rate Measurement
    if (characteristicUuid === '00002a37-0000-1000-8000-00805f9b34fb') {
      const flags = value.getUint8(0);
      const heartRateFormat = flags & 0x1;
      
      let heartRate;
      if (heartRateFormat === 0) {
        // Format is UINT8
        heartRate = value.getUint8(1);
      } else {
        // Format is UINT16
        heartRate = value.getUint16(1, true);
      }
      
      return {
        value: heartRate,
        unit: 'bpm'
      };
    }
    
    // Blood Pressure Measurement
    else if (characteristicUuid === '00002a35-0000-1000-8000-00805f9b34fb') {
      const flags = value.getUint8(0);
      
      // Units flag (bit 0): 0 = mmHg, 1 = kPa
      const unit = flags & 0x1 ? 'kPa' : 'mmHg';
      
      // Blood pressure values are IEEE-11073 16-bit SFLOAT
      const systolic = value.getUint16(1, true) / 10;
      const diastolic = value.getUint16(3, true) / 10;
      
      return {
        systolic: {
          value: systolic,
          unit
        },
        diastolic: {
          value: diastolic,
          unit
        }
      };
    }
    
    // Temperature Measurement
    else if (characteristicUuid === '00002a1c-0000-1000-8000-00805f9b34fb') {
      const flags = value.getUint8(0);
      
      // Units flag (bit 0): 0 = Celsius, 1 = Fahrenheit
      const unit = flags & 0x1 ? '°F' : '°C';
      
      // Temperature is IEEE-11073 32-bit FLOAT
      const temp = value.getFloat32(1, true);
      
      return {
        value: temp,
        unit
      };
    }
    
    // Weight Measurement
    else if (characteristicUuid === '00002a9d-0000-1000-8000-00805f9b34fb') {
      const flags = value.getUint8(0);
      
      // Units flag (bit 0): 0 = kg, 1 = lb
      const unit = flags & 0x1 ? 'lb' : 'kg';
      
      // Weight is IEEE-11073 16-bit SFLOAT
      const weight = value.getUint16(1, true) / 10;
      
      return {
        value: weight,
        unit
      };
    }
    
    // Glucose Measurement
    else if (characteristicUuid === '00002a18-0000-1000-8000-00805f9b34fb') {
      const flags = value.getUint8(0);
      
      // Concentration units (bit 2): 0 = kg/L, 1 = mol/L
      const unit = flags & 0x4 ? 'mmol/L' : 'mg/dL';
      
      // Glucose concentration is IEEE-11073 16-bit SFLOAT
      const glucose = value.getUint16(3, true) / 10;
      
      return {
        value: glucose,
        unit
      };
    }
    
    // Battery Level
    else if (characteristicUuid === '00002a19-0000-1000-8000-00805f9b34fb') {
      return {
        value: value.getUint8(0),
        unit: '%'
      };
    }
    
    // Default: return raw data as hex string
    else {
      const hexArray = new Uint8Array(value.buffer);
      let hexString = '';
      for (let i = 0; i < hexArray.length; i++) {
        const hex = hexArray[i].toString(16).padStart(2, '0');
        hexString += hex;
      }
      return { raw: hexString };
    }
  }
};

export default bluetoothService;
