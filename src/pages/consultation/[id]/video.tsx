import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import VideoCall from '@/components/VideoCall';

export default function VideoCallPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as 'doctor' | 'patient';

  if (!id || !role) {
    return <div>Invalid video call parameters</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <VideoCall appointmentId={id} role={role} />
      </div>
    </div>
  );
} 