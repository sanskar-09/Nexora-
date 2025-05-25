
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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
}

const MedicationManager = () => {
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
      category: "Blood Pressure"
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
      category: "Diabetes"
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
      category: "Cholesterol"
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
      category: "Supplement"
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
      category: "Supplement"
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
      category: "Pain Relief"
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
      category: "Thyroid"
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
      category: "Anti-inflammatory"
    }
  ]);

  const [isAddingMed, setIsAddingMed] = useState(false);
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

  const addMedication = () => {
    const medication: Medication = {
      id: Date.now(),
      ...newMedication,
      nextDose: "Today, 9:00 AM",
      refillDate: "2024-03-01",
      status: 'active',
      startDate: new Date().toISOString().split('T')[0]
    };
    setMedications([...medications, medication]);
    setNewMedication({ name: '', dosage: '', frequency: '', instructions: '', prescribedBy: '', category: '' });
    setIsAddingMed(false);
  };

  const markAsTaken = (id: number) => {
    console.log(`Marked medication ${id} as taken`);
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
                    <SelectItem value="once">Once daily</SelectItem>
                    <SelectItem value="twice">Twice daily</SelectItem>
                    <SelectItem value="three">Three times daily</SelectItem>
                    <SelectItem value="four">Four times daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="asneeded">As needed</SelectItem>
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
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
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
                >
                  Mark as Taken
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
              <Card key={med.id} className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
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
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="outline" size="sm" className="flex-1">History</Button>
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
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-sm text-gray-600">Refill needed by {med.refillDate}</p>
                  <p className="text-xs text-gray-500">Prescribed by {med.prescribedBy}</p>
                </div>
                <Button size="sm" variant="outline">
                  Order Refill
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationManager;
