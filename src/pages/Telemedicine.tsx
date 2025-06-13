import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import VideoCall from '@/components/VideoCall';
import { Chat } from '@/components/Chat';
import { MedicalRecords } from '@/components/MedicalRecords';

export default function Telemedicine() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as 'doctor' | 'patient';

  if (!id || !role) {
    return <div>Invalid consultation parameters</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <VideoCall appointmentId={id} role={role} />
          <MedicalRecords appointmentId={id} />
        </div>
        <div>
          <Chat appointmentId={id} role={role} />
        </div>
      </div>
    </div>
  );
} 