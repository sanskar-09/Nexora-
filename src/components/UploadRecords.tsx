import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface UploadRecordsProps {
  onUpload: (file: File, metadata: RecordMetadata) => void;
}

interface RecordMetadata {
  type: 'lab_result' | 'imaging' | 'visit_summary' | 'vaccination' | 'prescription';
  title: string;
  provider: string;
  date: Date;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const UploadRecords = ({ onUpload }: UploadRecordsProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [metadata, setMetadata] = useState<RecordMetadata>({
    type: 'lab_result',
    title: '',
    provider: '',
    date: new Date()
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPEG, or PNG file.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }

      setFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onUpload(file, metadata);
      setUploadProgress(100);
      setFile(null);
      setMetadata({
        type: 'lab_result',
        title: '',
        provider: '',
        date: new Date()
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Medical Record</CardTitle>
        <CardDescription>Upload your medical documents and records</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} disabled={isUploading} />
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            {file ? (
              <div className="flex items-center justify-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                {isDragActive
                  ? "Drop the file here"
                  : "Drag and drop a file here, or click to select"}
              </p>
            )}
            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="type">Record Type</Label>
              <Select
                value={metadata.type}
                onValueChange={(value: RecordMetadata['type']) =>
                  setMetadata({ ...metadata, type: value })
                }
                disabled={isUploading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab_result">Lab Result</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="visit_summary">Visit Summary</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={metadata.title}
                onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                placeholder="e.g., Complete Blood Count (CBC)"
                required
                disabled={isUploading}
              />
            </div>

            <div>
              <Label htmlFor="provider">Provider</Label>
              <Input
                id="provider"
                value={metadata.provider}
                onChange={(e) => setMetadata({ ...metadata, provider: e.target.value })}
                placeholder="e.g., Central Medical Lab"
                required
                disabled={isUploading}
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={metadata.date.toISOString().split('T')[0]}
                onChange={(e) => setMetadata({ ...metadata, date: new Date(e.target.value) })}
                required
                disabled={isUploading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!file || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload Record'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadRecords; 