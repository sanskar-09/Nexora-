import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Maximize2 } from "lucide-react";
import wsService from '@/services/websocketService';

interface VideoCallProps {
  appointmentId: string;
  role: 'doctor' | 'patient';
}

const VideoCall: React.FC<VideoCallProps> = ({ appointmentId, role }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    wsService.connect();

    // Subscribe to WebSocket events
    wsService.subscribe('offer', handleOffer);
    wsService.subscribe('answer', handleAnswer);
    wsService.subscribe('ice-candidate', handleIceCandidate);

    return () => {
      // Cleanup when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      wsService.disconnect();
    };
  }, []);

  const createPeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ]
    };

    const pc = new RTCPeerConnection(configuration);
    
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        wsService.send('ice-candidate', {
          candidate: event.candidate,
          appointmentId,
          role
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        pc.addTrack(track, streamRef.current);
      });
    }

    return pc;
  };

  const handleOffer = async (data: any) => {
    if (data.appointmentId !== appointmentId) return;

    try {
      if (!peerConnection.current) {
        peerConnection.current = createPeerConnection();
      }

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      wsService.send('answer', {
        answer,
        appointmentId,
        role
      });
    } catch (error) {
      console.error('Error handling offer:', error);
      toast.error('Failed to establish video connection.');
    }
  };

  const handleAnswer = async (data: any) => {
    if (data.appointmentId !== appointmentId) return;

    try {
      if (peerConnection.current) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleIceCandidate = async (data: any) => {
    if (data.appointmentId !== appointmentId) return;

    try {
      if (peerConnection.current) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  };

  const startCall = async () => {
    try {
      setIsConnecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setIsCallActive(true);
      setIsConnecting(false);
      toast.success('Call started successfully');

      // Create and send offer if doctor
      if (role === 'doctor') {
        peerConnection.current = createPeerConnection();
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        wsService.send('offer', {
          offer,
          appointmentId,
          role
        });
      }
    } catch (error) {
      console.error('Error starting call:', error);
      setIsConnecting(false);
      toast.error('Failed to start call. Please check your camera and microphone permissions.');
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setIsCallActive(false);
    setIsMuted(false);
    setIsVideoOff(false);
    toast.info('Call ended');
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const openInNewTab = () => {
    const url = `/consultation/${appointmentId}/video?role=${role}`;
    const newWindow = window.open(url, 'video-call', 'width=800,height=600');
    if (newWindow) {
      newWindow.focus();
    } else {
      toast.error('Please allow popups for this website');
    }
  };

  if (role === 'doctor') {
    return (
      <Card className="p-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Video Consultation</h3>
          {isConnecting ? (
            <div className="space-y-4">
              <div className="animate-pulse text-blue-500">Connecting...</div>
              <Button variant="outline" onClick={endCall}>Cancel</Button>
            </div>
          ) : !isCallActive ? (
            <Button onClick={startCall}>Start Video Call</Button>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  Connecting to patient...
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleMute}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  variant={isVideoOff ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleVideo}
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={endCall}
                >
                  <PhoneOff className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={openInNewTab}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Video Consultation</h3>
        {isConnecting ? (
          <div className="space-y-4">
            <div className="animate-pulse text-blue-500">Connecting...</div>
            <Button variant="outline" onClick={endCall}>Cancel</Button>
          </div>
        ) : !isCallActive ? (
          <Button onClick={startCall}>Start Video Call</Button>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="icon"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="icon"
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={endCall}
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={openInNewTab}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoCall; 