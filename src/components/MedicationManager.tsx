import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X, Edit, History, Pill, Clock, AlertCircle } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  refillDate: string;
  instructions: string;
  status: 'active' | 'paused' | 'completed';
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  category: string;
  taken: boolean;
  takenHistory: Array<{
    date: string;
    time: string;
    taken: boolean;
  }>;
}

const MedicationManager = () => {
  const { toast } = useToast();
  
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      nextDose: "Today, 8:00 PM",
      refillDate: "2024-02-15",
      instructions: "Take with or without food. Monitor blood pressure regularly.",
      status: 'active',
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "2023-12-01",
      category: "Blood Pressure",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "8:00 PM", taken: true },
        { date: "2024-01-09", time: "8:00 PM", taken: true },
        { date: "2024-01-08", time: "8:00 PM", taken: false },
      ]
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      nextDose: "Tomorrow, 9:00 AM",
      refillDate: "2024-02-10",
      instructions: "Take with meals to reduce stomach upset. Monitor blood sugar levels.",
      status: 'active',
      prescribedBy: "Dr. Michael Chen",
      startDate: "2023-11-15",
      category: "Diabetes",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "9:00 AM", taken: true },
        { date: "2024-01-10", time: "9:00 PM", taken: true },
        { date: "2024-01-09", time: "9:00 AM", taken: true },
      ]
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily (evening)",
      nextDose: "Today, 10:00 PM",
      refillDate: "2024-02-20",
      instructions: "Take in the evening. Avoid grapefruit juice.",
      status: 'active',
      prescribedBy: "Dr. Sarah Johnson",
      startDate: "2023-10-01",
      category: "Cholesterol",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "10:00 PM", taken: true },
        { date: "2024-01-09", time: "10:00 PM", taken: true },
        { date: "2024-01-08", time: "10:00 PM", taken: false },
      ]
    },
    {
      id: 4,
      name: "Vitamin D3",
      dosage: "2000 IU",
      frequency: "Once daily",
      nextDose: "Tomorrow, 8:00 AM",
      refillDate: "2024-03-01",
      instructions: "Take with a meal for better absorption.",
      status: 'active',
      prescribedBy: "Dr. Lisa Thompson",
      startDate: "2023-09-01",
      category: "Supplement",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "8:00 AM", taken: true },
        { date: "2024-01-09", time: "8:00 AM", taken: true },
        { date: "2024-01-08", time: "8:00 AM", taken: false },
      ]
    },
    {
      id: 5,
      name: "Omega-3 Fish Oil",
      dosage: "1000mg",
      frequency: "Once daily",
      nextDose: "Today, 6:00 PM",
      refillDate: "2024-02-25",
      instructions: "Take with food to reduce fishy aftertaste.",
      status: 'active',
      prescribedBy: "Dr. Emily Rodriguez",
      startDate: "2023-08-15",
      category: "Supplement",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "6:00 PM", taken: true },
        { date: "2024-01-09", time: "6:00 PM", taken: true },
        { date: "2024-01-08", time: "6:00 PM", taken: false },
      ]
    },
    {
      id: 6,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      nextDose: "As needed",
      refillDate: "2024-04-01",
      instructions: "Take with food. Do not exceed 1200mg per day.",
      status: 'active',
      prescribedBy: "Dr. James Wilson",
      startDate: "2024-01-10",
      category: "Pain Relief",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "As needed", taken: true },
        { date: "2024-01-09", time: "As needed", taken: true },
        { date: "2024-01-08", time: "As needed", taken: false },
      ]
    },
    {
      id: 7,
      name: "Levothyroxine",
      dosage: "75mcg",
      frequency: "Once daily (morning)",
      nextDose: "Tomorrow, 7:00 AM",
      refillDate: "2024-02-28",
      instructions: "Take on empty stomach, 30-60 minutes before breakfast.",
      status: 'active',
      prescribedBy: "Dr. Lisa Thompson",
      startDate: "2023-07-01",
      category: "Thyroid",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "7:00 AM", taken: true },
        { date: "2024-01-09", time: "7:00 AM", taken: true },
        { date: "2024-01-08", time: "7:00 AM", taken: false },
      ]
    },
    {
      id: 8,
      name: "Prednisone",
      dosage: "5mg",
      frequency: "Once daily (morning)",
      nextDose: "Tomorrow, 8:00 AM",
      refillDate: "2024-01-30",
      instructions: "Take with food. Do not stop abruptly - taper as directed.",
      status: 'paused',
      prescribedBy: "Dr. Emily Rodriguez",
      startDate: "2024-01-05",
      endDate: "2024-01-20",
      category: "Anti-inflammatory",
      taken: false,
      takenHistory: [
        { date: "2024-01-10", time: "8:00 AM", taken: true },
        { date: "2024-01-09", time: "8:00 AM", taken: true },
        { date: "2024-01-08", time: "8:00 AM", taken: false },
      ]
    }
  ]);

  const [isAddingMed, setIsAddingMed] = useState(false);
  const [editingMed, setEditingMed] = useState<Medication | null>(null);
  const [viewingHistory, setViewingHistory] = useState<Medication | null>(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
    prescribedBy: '',
    category: ''
  });

  const medicationCategories = [
    "Blood Pressure", "Diabetes", "Cholesterol", "Pain Relief", 
    "Supplement", "Thyroid", "Anti-inflammatory", "Antibiotic", "Other"
  ];

  const markAsTaken = (id: number) => {
    setMedications(prev => 
      prev.map(med => {
        if (med.id === id) {
          const now = new Date();
          const updatedHistory = [
            ...med.takenHistory,
            {
              date: now.toISOString().split('T')[0],
              time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              taken: true
            }
          ];
          
          return {
            ...med,
            taken: true,
            takenHistory: updatedHistory,
            nextDose: calculateNextDose(med.frequency)
          };
        }
        return med;
      })
    );
    
    toast({
      title: "Medication taken",
      description: "Successfully marked as taken and logged in your history.",
    });
  };

  const calculateNextDose = (frequency: string): string => {
    const now = new Date();
    let nextDose = new Date(now);
    
    switch (frequency.toLowerCase()) {
      case 'once daily':
        nextDose.setDate(nextDose.getDate() + 1);
        break;
      case 'twice daily':
        nextDose.setHours(nextDose.getHours() + 12);
        break;
      case 'three times daily':
        nextDose.setHours(nextDose.getHours() + 8);
        break;
      case 'four times daily':
        nextDose.setHours(nextDose.getHours() + 6);
        break;
      case 'weekly':
        nextDose.setDate(nextDose.getDate() + 7);
        break;
      default:
        return "As needed";
    }
    
    const isToday = nextDose.toDateString() === now.toDateString();
    const dayLabel = isToday ? "Today" : "Tomorrow";
    return `${dayLabel}, ${nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const removeMedication = (id: number) => {
    const medication = medications.find(med => med.id === id);
    if (medication) {
      setMedications(prev => prev.filter(med => med.id !== id));
      toast({
        title: "Medication removed",
        description: `${medication.name} has been removed from your list.`,
      });
    }
  };

  const updateMedication = (updatedMed: Medication) => {
    setMedications(prev => 
      prev.map(med => med.id === updatedMed.id ? updatedMed : med)
    );
    setEditingMed(null);
    toast({
      title: "Medication updated",
      description: "Your medication details have been successfully updated.",
    });
  };

  const orderRefill = (medication: Medication) => {
    toast({
      title: "Refill ordered",
      description: `Refill request for ${medication.name} has been sent to your pharmacy.`,
    });
  };

  const addMedication = () => {
    const medication: Medication = {
      id: Date.now(),
      ...newMedication,
      nextDose: "Today, 9:00 AM",
      refillDate: "2024-03-01",
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      taken: false,
      takenHistory: []
    };
    setMedications([...medications, medication]);
    setNewMedication({ name: '', dosage: '', frequency: '', instructions: '', prescribedBy: '', category: '' });
    setIsAddingMed(false);
    toast({
      title: "Medication added",
      description: "New medication has been added to your list.",
    });
  };

  const activeMedications = medications.filter(med => med.status === 'active');
  const todaysMedications = medications.filter(med => med.nextDose.includes('Today'));
  const upcomingRefills = medications.filter(med => 
    new Date(med.refillDate) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medication Manager</h1>
          <p className="text-gray-600 mt-1">Track your medications and never miss a dose</p>
        </div>
        <Dialog open={isAddingMed} onOpenChange={setIsAddingMed}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">Add Medication</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>Enter your medication details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medName">Medication Name</Label>
                <Input 
                  id="medName"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  placeholder="e.g., Aspirin"
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input 
                  id="dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  placeholder="e.g., 100mg"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={newMedication.category} onValueChange={(value) => setNewMedication({...newMedication, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicationCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Frequency</Label>
                <Select value={newMedication.frequency} onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prescribedBy">Prescribed By</Label>
                <Input 
                  id="prescribedBy"
                  value={newMedication.prescribedBy}
                  onChange={(e) => setNewMedication({...newMedication, prescribedBy: e.target.value})}
                  placeholder="e.g., Dr. Smith"
                />
              </div>
              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea 
                  id="instructions"
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                  placeholder="Special instructions..."
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsAddingMed(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={addMedication} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Add Medication
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{activeMedications.length}</div>
            <p className="text-sm text-gray-600">Active Medications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{todaysMedications.length}</div>
            <p className="text-sm text-gray-600">Due Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{upcomingRefills.length}</div>
            <p className="text-sm text-gray-600">Refills Needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <p className="text-sm text-gray-600">Adherence Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Medications */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Medications due today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysMedications.map((med) => (
              <div key={med.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Pill className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{med.name}</h3>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                    <p className="text-sm text-blue-600 font-medium">{med.nextDose}</p>
                    <p className="text-xs text-gray-500">{med.category}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => markAsTaken(med.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={med.taken}
                >
                  {med.taken ? "Taken" : "Mark as Taken"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Medications */}
      <Card>
        <CardHeader>
          <CardTitle>All Medications</CardTitle>
          <CardDescription>Complete list of your medications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <Card key={med.id} className="border-gray-200 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                  onClick={() => removeMedication(med.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between pr-8">
                    <CardTitle className="text-lg">{med.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="text-xs">{med.category}</Badge>
                      <Badge 
                        variant={med.status === 'active' ? 'default' : 'secondary'}
                        className={med.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {med.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dosage:</span>
                    <span className="text-sm font-medium">{med.dosage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Frequency:</span>
                    <span className="text-sm font-medium">{med.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Dose:</span>
                    <span className="text-sm font-medium text-blue-600">{med.nextDose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Prescribed by:</span>
                    <span className="text-sm font-medium">{med.prescribedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Start Date:</span>
                    <span className="text-sm font-medium">{med.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Refill Date:</span>
                    <span className="text-sm font-medium">{med.refillDate}</span>
                  </div>
                  {med.instructions && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600">{med.instructions}</p>
                    </div>
                  )}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setEditingMed(med)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setViewingHistory(med)}
                    >
                      <History className="w-3 h-3 mr-1" />
                      History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refill Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Refill Alerts</CardTitle>
          <CardDescription>Medications that need refilling soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingRefills.map((med) => (
              <div key={med.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-600">Refill needed by {med.refillDate}</p>
                    <p className="text-xs text-gray-500">Prescribed by {med.prescribedBy}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => orderRefill(med)}
                >
                  Order Refill
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Medication Dialog */}
      <Dialog open={!!editingMed} onOpenChange={() => setEditingMed(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Medication</DialogTitle>
            <DialogDescription>Update your medication details</DialogDescription>
          </DialogHeader>
          {editingMed && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Medication Name</Label>
                <Input 
                  id="editName"
                  value={editingMed.name}
                  onChange={(e) => setEditingMed({...editingMed, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editDosage">Dosage</Label>
                <Input 
                  id="editDosage"
                  value={editingMed.dosage}
                  onChange={(e) => setEditingMed({...editingMed, dosage: e.target.value})}
                />
              </div>
              <div>
                <Label>Frequency</Label>
                <Select value={editingMed.frequency} onValueChange={(value) => setEditingMed({...editingMed, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editInstructions">Instructions</Label>
                <Textarea 
                  id="editInstructions"
                  value={editingMed.instructions}
                  onChange={(e) => setEditingMed({...editingMed, instructions: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setEditingMed(null)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => updateMedication(editingMed)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Update
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={!!viewingHistory} onOpenChange={() => setViewingHistory(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Medication History</DialogTitle>
            <DialogDescription>
              {viewingHistory?.name} - Taking history
            </DialogDescription>
          </DialogHeader>
          {viewingHistory && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {viewingHistory.takenHistory.length > 0 ? (
                <div className="space-y-2">
                  {viewingHistory.takenHistory.reverse().map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${entry.taken ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="text-sm font-medium">{entry.date}</p>
                          <p className="text-xs text-gray-600">{entry.time}</p>
                        </div>
                      </div>
                      <Badge variant={entry.taken ? "default" : "destructive"}>
                        {entry.taken ? "Taken" : "Missed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No history available</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicationManager;
