import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  onComplete?: () => void;
}

const VideoPlayer = ({ src, title, poster, onComplete }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime >= video.duration * 0.9 && onComplete) {
        onComplete();
      }
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 1;
      video.muted = false;
    } else {
      video.volume = 0;
      video.muted = true;
    }
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    if (!isFullscreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      id="video-container" 
      className="relative w-full rounded-lg overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        onClick={togglePlay}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Title */}
      <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-16 w-16 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}

      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              {/* Time Display */}
              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-20 cursor-pointer"
                />
              </div>
              
              {/* Fullscreen Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;