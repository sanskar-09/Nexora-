import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookMarked, Clock } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface VideoDetailProps {
  onBack: () => void;
  onBookmark?: (id: number) => void;
  onComplete?: (id: number) => void;
}

interface VideoResource {
  id: number;
  title: string;
  description: string;
  category: 'article' | 'video' | 'interactive';
  tags: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  videoUrl: string;
  thumbnailUrl: string;
  source: string;
  datePublished: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  relatedResources?: number[];
}

const VideoDetail = ({ onBack, onBookmark, onComplete }: VideoDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real application, this would fetch from an API
    // For now, we'll simulate with a timeout
    setLoading(true);
    
    // Simulated video data - in a real app, this would come from an API
    setTimeout(() => {
      if (id) {
        const videoId = parseInt(id);
        // This is sample data - in a real app, you would fetch this from an API
        const sampleVideo: VideoResource = {
          id: videoId,
          title: "How to Perform a Breast Self-Examination",
          description: "Step-by-step video guide on performing a thorough breast self-examination for early detection. This comprehensive guide covers all the essential techniques and what to look for during your monthly self-exam. Regular self-examinations are a crucial part of early breast cancer detection.",
          category: 'video',
          tags: ['women\'s health', 'cancer', 'prevention', 'self-examination'],
          duration: '8 min video',
          level: 'beginner',
          videoUrl: '/videos/assets/sample-video.mp4', // This would be a real video URL in production
          thumbnailUrl: '/videos/thumbnails/breast_exam.svg',
          source: 'National Cancer Institute',
          datePublished: '2023-12-05',
          isBookmarked: false,
          isCompleted: false,
          relatedResources: [5, 8, 11]
        };
        
        setVideo(sampleVideo);
        setLoading(false);
      } else {
        setError('Video not found');
        setLoading(false);
      }
    }, 500);
  }, [id]);
  
  const handleBookmark = () => {
    if (video && onBookmark) {
      onBookmark(video.id);
      setVideo({ ...video, isBookmarked: !video.isBookmarked });
    }
  };
  
  const handleComplete = () => {
    if (video && onComplete) {
      onComplete(video.id);
      setVideo({ ...video, isCompleted: true });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !video) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Video not found'}</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Videos
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Videos
      </Button>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <VideoPlayer 
            src={video.videoUrl} 
            title={video.title} 
            poster={video.thumbnailUrl}
            onComplete={handleComplete}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl">{video.title}</CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${video.isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={handleBookmark}
              >
                <BookMarked className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${video.isCompleted ? 'text-green-500' : 'text-gray-400'}`}
                onClick={handleComplete}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {video.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base mb-4">
            {video.description}
          </CardDescription>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Duration</p>
              <p className="font-medium">{video.duration}</p>
            </div>
            <div>
              <p className="text-gray-500">Level</p>
              <p className="font-medium capitalize">{video.level}</p>
            </div>
            <div>
              <p className="text-gray-500">Source</p>
              <p className="font-medium">{video.source}</p>
            </div>
            <div>
              <p className="text-gray-500">Published</p>
              <p className="font-medium">{video.datePublished}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoDetail;