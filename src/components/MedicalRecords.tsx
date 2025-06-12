import { useState, useEffect } from 'react';
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

interface RecordMetadata {
  type: 'lab_result' | 'imaging' | 'visit_summary' | 'vaccination' | 'prescription';
  title: string;
  provider: string;
  date: Date;
}

interface MedicalRecord {
  id: number;
  type: 'lab_result' | 'imaging' | 'visit_summary' | 'vaccination' | 'prescription';
  title: string;
  date: Date;
  provider: string;
  status: 'normal' | 'abnormal' | 'critical' | 'completed';
  details: string;
  attachmentUrl?: string;
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

const MedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await healthDataService.getHealthData();
        const fetchedRecords: MedicalRecord[] = response.data
          .filter((item: any) => item.type === 'medical_record')
          .map((item: any) => ({
            id: item._id,
            type: item.value.type,
            title: item.value.title,
            date: new Date(item.date),
            provider: item.value.provider,
            status: item.value.status || 'completed',
            details: item.notes,
            attachmentUrl: item.fileUrl
          }));
        console.log("Fetched Medical Records:", fetchedRecords);
        setRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching medical records:", error);
        toast({
          title: "Error",
          description: "Failed to load medical records. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchRecords();
  }, []);

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

  const handleFileUpload = async (file: File, metadata: RecordMetadata) => {
    try {
      // Create FormData to send file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('metadata', JSON.stringify(metadata));

      // Upload file and get URL
      const response = await healthDataService.addHealthData(formData);
      const fileUrl = response.data.fileUrl;

      const newRecord: MedicalRecord = {
        id: records.length + 1,
        type: metadata.type,
        title: metadata.title,
        date: metadata.date,
        provider: metadata.provider,
        status: 'normal',
        details: `Uploaded via app. File: ${file.name}`,
        attachmentUrl: fileUrl
      };

      setRecords(prev => [...prev, newRecord]);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been successfully uploaded as a ${metadata.type} record.`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (record: MedicalRecord) => {
    if (record.attachmentUrl) {
      const link = document.createElement('a');
      link.href = record.attachmentUrl;
      link.download = record.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewAttachment = (record: MedicalRecord) => {
    if (record.attachmentUrl) {
      window.open(record.attachmentUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">View and manage your health records and test results</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload New Record</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload Medical Record</DialogTitle>
              <DialogDescription>
                Upload your medical documents and records. Supported formats: PDF, JPEG, PNG
              </DialogDescription>
            </DialogHeader>
            <UploadRecords onUpload={handleFileUpload} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
          <TabsTrigger value="documents">Documents & Files</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {records
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map(record => (
                <Card key={record.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{getRecordTypeIcon(record.type)}</span>
                        <div>
                          <CardTitle>{record.title}</CardTitle>
                          <CardDescription>{format(record.date, 'MMMM d, yyyy')} • {record.provider}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeColor(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">{record.details}</p>
                    <div className="flex justify-end mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => viewRecordDetails(record)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{record.title}</DialogTitle>
                            <DialogDescription>
                              {format(record.date, 'MMMM d, yyyy')} • {record.provider}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Status:</span>
                              <Badge className={getStatusBadgeColor(record.status)}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </Badge>
                            </div>
                            <div>
                              <span className="font-medium">Details:</span>
                              <p className="mt-1 text-gray-700">{record.details}</p>
                            </div>
                            {record.attachmentUrl && (
                              <div>
                                <span className="font-medium">Attachments:</span>
                                <div className="mt-2 space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handleViewAttachment(record)}>
                                    View
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDownload(record)}>
                                    Download
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
};

export default MedicalRecords;