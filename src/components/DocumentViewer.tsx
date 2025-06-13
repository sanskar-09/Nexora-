
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Download, X, FileText, Image, File } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: number;
    title: string;
    type: string;
    provider: string;
    date: string;
    status: string;
    attachmentUrl?: string;
  };
}

const DocumentViewer = ({ isOpen, onClose, document: documentData }: DocumentViewerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      // Create a blob with sample content for demonstration
      const sampleContent = `Medical Record: ${documentData.title}
Provider: ${documentData.provider}
Date: ${documentData.date}
Type: ${documentData.type}
Status: ${documentData.status}

This is a sample medical document. In a real application, this would contain the actual medical data and reports.

Patient Information:
- Document ID: ${documentData.id}
- Generated: ${new Date().toISOString()}

Note: This is a demonstration document created for the Nexora Healthcare platform.`;

      const blob = new Blob([sampleContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${documentData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setIsLoading(false);
      toast({
        title: "Download completed",
        description: `${documentData.title} has been downloaded successfully.`,
      });
    }, 1000);
  };

  const getDocumentIcon = (type: string) => {
    if (type.toLowerCase().includes('imaging') || type.toLowerCase().includes('x-ray')) {
      return <Image className="w-8 h-8 text-blue-600" />;
    } else if (type.toLowerCase().includes('lab')) {
      return <FileText className="w-8 h-8 text-green-600" />;
    } else {
      return <File className="w-8 h-8 text-gray-600" />;
    }
  };

  const renderDocumentPreview = () => {
    if (documentData.type.toLowerCase().includes('imaging') || documentData.type.toLowerCase().includes('x-ray')) {
      return (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Image className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-semibold mb-2">Chest X-Ray Image</p>
          <p className="text-gray-600 mb-4">High-resolution medical imaging</p>
          <div className="bg-white rounded border-2 border-dashed border-gray-300 p-8">
            <div className="text-gray-400 text-sm">
              📷 Medical imaging preview would appear here
              <br />
              Resolution: 2048x1536
              <br />
              Format: DICOM/PNG
            </div>
          </div>
        </div>
      );
    } else if (documentData.type.toLowerCase().includes('lab')) {
      return (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="bg-white rounded border p-6">
            <h3 className="font-bold text-lg mb-4">Laboratory Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Hemoglobin</span>
                <span className="text-green-600 font-semibold">14.2 g/dL</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">White Blood Cells</span>
                <span className="text-green-600 font-semibold">6,800 /μL</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Platelets</span>
                <span className="text-green-600 font-semibold">275,000 /μL</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Glucose</span>
                <span className="text-yellow-600 font-semibold">105 mg/dL</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
              <p className="text-sm text-green-800">
                <strong>Overall Assessment:</strong> Results within normal range. Continue current treatment plan.
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="bg-white rounded border p-6">
            <h3 className="font-bold text-lg mb-4">Visit Summary</h3>
            <div className="space-y-4 text-sm">
              <div>
                <strong>Chief Complaint:</strong> Annual physical examination
              </div>
              <div>
                <strong>Assessment:</strong> Patient in good overall health
              </div>
              <div>
                <strong>Vital Signs:</strong>
                <ul className="ml-4 mt-2 space-y-1">
                  <li>• Blood Pressure: 120/80 mmHg</li>
                  <li>• Heart Rate: 72 bpm</li>
                  <li>• Temperature: 98.6°F</li>
                  <li>• Weight: 165 lbs</li>
                </ul>
              </div>
              <div>
                <strong>Recommendations:</strong> Continue current diet and exercise routine. Schedule follow-up in 12 months.
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getDocumentIcon(documentData.type)}
              <div>
                <DialogTitle className="text-xl">{documentData.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {documentData.type} • {documentData.provider} • {documentData.date}
                </DialogDescription>
              </div>
            </div>
            <Badge variant="outline" className="ml-4">
              {documentData.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="mt-6">
          {renderDocumentPreview()}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
          <Button onClick={handleDownload} disabled={isLoading}>
            <Download className="w-4 h-4 mr-2" />
            {isLoading ? 'Downloading...' : 'Download'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
