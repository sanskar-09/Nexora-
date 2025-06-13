import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format, parseISO } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import UploadRecords from './UploadRecords';
import { healthDataService } from '@/services/api';
import { medicalRecordService } from '@/services/medicalRecordService';
import { Input } from "@/components/ui/input";
import { Upload, File, Trash2, Download } from "lucide-react";

interface RecordMetadata {
  type: 'lab_result' | 'imaging' | 'visit_summary' | 'vaccination' | 'prescription';
  title: string;
  provider: string;
  date: Date;
}

interface MedicalRecord {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  url: string;
}

interface HealthMetric {
  id: number;
  name: string;
  value: string;
  unit: string;
  date: Date;
  normalRange?: string;
  status: 'normal' | 'abnormal' | 'critical';
}

interface MedicalRecordState {
  isLoading: boolean;
  error: string | null;
  records: MedicalRecord[];
}

interface MedicalRecordsProps {
  appointmentId: string;
}

export function MedicalRecords({ appointmentId }: MedicalRecordsProps) {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchRecords = async () => {
    try {
      const data = await medicalRecordService.getRecords(appointmentId);
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
      toast.error('Failed to fetch medical records');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [appointmentId]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsLoading(true);
    try {
      await medicalRecordService.uploadRecord(appointmentId, selectedFile);
      toast.success('File uploaded successfully');
      setSelectedFile(null);
      fetchRecords();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (recordId: string) => {
    try {
      await medicalRecordService.deleteRecord(appointmentId, recordId);
      toast.success('File deleted successfully');
      fetchRecords();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleDownload = async (record: MedicalRecord) => {
    try {
      const response = await fetch(record.url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = record.fileName; // Use original filename
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      id: 1,
      name: 'Blood Pressure (Systolic)',
      value: '120',
      unit: 'mmHg',
      date: parseISO('2023-12-15'),
      normalRange: '90-120',
      status: 'normal'
    },
    {
      id: 2,
      name: 'Blood Pressure (Diastolic)',
      value: '80',
      unit: 'mmHg',
      date: parseISO('2023-12-15'),
      normalRange: '60-80',
      status: 'normal'
    },
    {
      id: 3,
      name: 'Total Cholesterol',
      value: '210',
      unit: 'mg/dL',
      date: parseISO('2023-10-05'),
      normalRange: '<200',
      status: 'abnormal'
    },
    {
      id: 4,
      name: 'LDL Cholesterol',
      value: '140',
      unit: 'mg/dL',
      date: parseISO('2023-10-05'),
      normalRange: '<100',
      status: 'abnormal'
    },
    {
      id: 5,
      name: 'HDL Cholesterol',
      value: '45',
      unit: 'mg/dL',
      date: parseISO('2023-10-05'),
      normalRange: '>40',
      status: 'normal'
    },
    {
      id: 6,
      name: 'Triglycerides',
      value: '150',
      unit: 'mg/dL',
      date: parseISO('2023-10-05'),
      normalRange: '<150',
      status: 'normal'
    },
    {
      id: 7,
      name: 'Fasting Blood Glucose',
      value: '95',
      unit: 'mg/dL',
      date: parseISO('2023-10-05'),
      normalRange: '70-100',
      status: 'normal'
    },
    {
      id: 8,
      name: 'Hemoglobin',
      value: '14.2',
      unit: 'g/dL',
      date: parseISO('2023-12-15'),
      normalRange: '13.5-17.5',
      status: 'normal'
    }
  ]);

  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'abnormal':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_result':
        return '🧪';
      case 'imaging':
        return '📷';
      case 'visit_summary':
        return '📋';
      case 'vaccination':
        return '💉';
      case 'prescription':
        return '💊';
      default:
        return '📄';
    }
  };

  const viewRecordDetails = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleViewAttachment = (record: MedicalRecord) => {
    if (record.url) {
      window.open(record.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">View and manage your health records and test results</p>
        </div>
        <div className="flex gap-2">
          <Input
            type="file"
            onChange={handleFileSelect}
            className="flex-1"
          />
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isLoading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="documents">Documents & Files</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <div className="space-y-2">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{record.fileName}</span>
                  <span className="text-xs text-gray-500">
                    ({Math.round(record.fileSize / 1024)} KB)
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDownload(record)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {records.length === 0 && (
              <div className="text-center text-gray-500 py-4">
                No medical records uploaded yet
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>Track your key health indicators over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Normal Range</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthMetrics.map(metric => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">{metric.name}</TableCell>
                      <TableCell>
                        {metric.value} {metric.unit}
                      </TableCell>
                      <TableCell>{metric.normalRange || 'N/A'}</TableCell>
                      <TableCell>{format(metric.date, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(metric.status)}>
                          {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Files</CardTitle>
              <CardDescription>Access your medical documents and uploaded files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-2">Medical Reports</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">📄</span>
                        <div>
                          <p className="font-medium">Annual Physical Report</p>
                          <p className="text-sm text-gray-500">October 5, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">📄</span>
                        <div>
                          <p className="font-medium">Lipid Panel Results</p>
                          <p className="text-sm text-gray-500">October 5, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">📄</span>
                        <div>
                          <p className="font-medium">CBC Lab Report</p>
                          <p className="text-sm text-gray-500">December 15, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-2">Imaging & Scans</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">📷</span>
                        <div>
                          <p className="font-medium">Chest X-Ray Images</p>
                          <p className="text-sm text-gray-500">November 20, 2023</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button>
                    Upload New Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MedicalRecords;