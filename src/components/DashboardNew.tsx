import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DashboardProps {
  userRole: 'patient' | 'doctor' | 'admin';
  onTabChange?: (tab: string) => void;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: string;
  notes: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  nextDose: string;
  status: string;
  instructions: string;
  sideEffects: string[];
}

interface HealthMetric {
  title: string;
  value: string;
  lastUpdated: string;
}

export default function Dashboard({ onTabChange }: DashboardProps) {
  const upcomingAppointments: Appointment[] = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Main Clinic",
      status: "upcoming",
      notes: "Initial consultation for chest pain"
    }
  ];

  const recentMedications: Medication[] = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      nextDose: "10:00 AM",
      status: "active",
      instructions: "Take one tablet daily with water",
      sideEffects: ["Dizziness", "Headache", "Fatigue"]
    }
  ];

  const healthMetrics: HealthMetric[] = [
    {
      title: "Blood Pressure",
      value: "120/80 mmHg",
      lastUpdated: "5 hours ago"
    }
  ];

  const [isAppointmentsDialogOpen, setIsAppointmentsDialogOpen] = useState(false);
  const [isMedicationDetailsDialogOpen, setIsMedicationDetailsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Appointments */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.specialty}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment.id);
                              setIsAppointmentsDialogOpen(true);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Medications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Your current medications</CardDescription>
              </CardHeader>
              <CardContent>
                {recentMedications.map((medication) => (
                  <div key={medication.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage}
                        </p>
                      </div>
                      <Badge variant="outline">{medication.status}</Badge>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm">Next dose: {medication.nextDose}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedMedication(medication.id);
                          setIsMedicationDetailsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Health Metrics */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your latest health measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {healthMetrics.map((metric) => (
                    <div key={metric.title} className="space-y-2">
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">Last updated {metric.lastUpdated}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Appointment Details Dialog */}
        <Dialog open={isAppointmentsDialogOpen} onOpenChange={setIsAppointmentsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Doctor</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.doctor}</p>
                <p className="text-sm font-medium">Specialty</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.specialty}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.date}</p>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.time}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.location}</p>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.status}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Notes</p>
                <p className="text-sm">{upcomingAppointments.find(a => a.id === selectedAppointment)?.notes}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsAppointmentsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Medication Details Dialog */}
        <Dialog open={isMedicationDetailsDialogOpen} onOpenChange={setIsMedicationDetailsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Medication Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm">{recentMedications.find(m => m.id === selectedMedication)?.name}</p>
                <p className="text-sm font-medium">Dosage</p>
                <p className="text-sm">{recentMedications.find(m => m.id === selectedMedication)?.dosage}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Next Dose</p>
                <p className="text-sm">{recentMedications.find(m => m.id === selectedMedication)?.nextDose}</p>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm">{recentMedications.find(m => m.id === selectedMedication)?.status}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Instructions</p>
                <p className="text-sm">{recentMedications.find(m => m.id === selectedMedication)?.instructions}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium">Side Effects</p>
                <p className="text-sm">
                  {recentMedications.find(m => m.id === selectedMedication)?.sideEffects?.join(', ')}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsMedicationDetailsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Telemedicine Button */}
        {onTabChange && (
          <Button
            variant="outline"
            onClick={() => {
              if (onTabChange) {
                onTabChange('telemedicine');
              }
            }}
            className="fixed bottom-4 right-4"
          >
            Go to Telemedicine
          </Button>
        )}
      </div>
    </div>
  );
}
