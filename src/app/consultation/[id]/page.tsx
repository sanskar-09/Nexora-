import { VideoCall } from "@/components/VideoCall";
import { Chat } from "@/components/Chat";

interface ConsultationPageProps {
  params: {
    id: string;
  };
  searchParams: {
    role: 'doctor' | 'patient';
  };
}

export default function ConsultationPage({ params, searchParams }: ConsultationPageProps) {
  const { id } = params;
  const { role } = searchParams;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <VideoCall appointmentId={id} role={role} />
          <Chat appointmentId={id} role={role} />
        </div>
      </div>
    </div>
  );
} 