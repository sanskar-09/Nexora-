import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Video, FileText, BookMarked, Search, Clock, Award, X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";


interface EducationalResource {
  id: number;
  title: string;
  description: string;
  category: 'article' | 'video' | 'interactive';
  tags: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  source: string;
  datePublished: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  relatedResources?: number[];
}

const HealthEducation = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [bookmarkedResources, setBookmarkedResources] = useState<EducationalResource[]>([]);
  const [completedResources, setCompletedResources] = useState<EducationalResource[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<EducationalResource | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Sample educational resources data
  const [resources, setResources] = useState<EducationalResource[]>([
    {
      id: 1,
      title: "Understanding Blood Pressure: Causes and Management",
      description: "Learn about the factors that affect blood pressure and strategies for maintaining healthy levels.",
      category: 'article',
      tags: ['cardiovascular', 'prevention', 'lifestyle'],
      duration: '10 min read',
      level: 'beginner',
      source: 'American Heart Association',
      datePublished: '2024-01-15',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 2,
      title: "Diabetes Management: Nutrition and Exercise",
      description: "Comprehensive guide on how diet and physical activity can help manage diabetes effectively.",
      category: 'article',
      tags: ['diabetes', 'nutrition', 'exercise'],
      duration: '15 min read',
      level: 'intermediate',
      source: 'American Diabetes Association',
      datePublished: '2024-01-10',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 3,
      title: "How to Perform a Breast Self-Examination",
      description: "Step-by-step video guide on performing a thorough breast self-examination for early detection.",
      category: 'video',
      tags: ['women\'s health', 'cancer', 'prevention'],
      duration: '8 min video',
      level: 'beginner',
      videoUrl: '/videos/assets/sample-video.mp4',
      thumbnailUrl: '/videos/thumbnails/breast_exam.svg',
      source: 'National Cancer Institute',
      datePublished: '2023-12-05',
      isBookmarked: false,
      isCompleted: false,
      relatedResources: [5, 8, 11]
    },
    {
      id: 4,
      title: "Mental Health First Aid: Recognizing Signs of Depression",
      description: "Learn to identify symptoms of depression and how to provide initial support to someone in need.",
      category: 'interactive',
      tags: ['mental health', 'depression', 'first aid'],
      duration: '20 min course',
      level: 'intermediate',
      source: 'Mental Health America',
      datePublished: '2023-11-20',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 5,
      title: "Understanding Vaccines: How They Work and Why They Matter",
      description: "Comprehensive explanation of vaccine science, safety, and importance for public health.",
      category: 'article',
      tags: ['immunization', 'prevention', 'public health'],
      duration: '12 min read',
      level: 'beginner',
      source: 'CDC',
      datePublished: '2024-01-05',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 6,
      title: "Mindfulness Meditation for Stress Reduction",
      description: "Guided video session teaching mindfulness techniques to reduce stress and improve mental wellbeing.",
      category: 'video',
      tags: ['mental health', 'stress', 'meditation'],
      duration: '15 min video',
      level: 'beginner',
      videoUrl: '/videos/assets/sample-video.mp4',
      thumbnailUrl: '/videos/thumbnails/mindfulness.svg',
      source: 'National Center for Complementary and Integrative Health',
      datePublished: '2023-10-12',
      isBookmarked: false,
      isCompleted: false,
      relatedResources: [4, 9, 11]
    },
    {
      id: 7,
      title: "Advanced Cardiac Life Support (ACLS) Refresher",
      description: "Interactive course reviewing key ACLS protocols and emergency response procedures.",
      category: 'interactive',
      tags: ['emergency', 'cardiac', 'professional'],
      duration: '30 min course',
      level: 'advanced',
      source: 'American Heart Association',
      datePublished: '2023-09-28',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 8,
      title: "Nutrition Basics: Understanding Macronutrients",
      description: "Learn about proteins, carbohydrates, and fats, and their role in a balanced diet.",
      category: 'article',
      tags: ['nutrition', 'diet', 'wellness'],
      duration: '8 min read',
      level: 'beginner',
      source: 'Academy of Nutrition and Dietetics',
      datePublished: '2023-12-18',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 9,
      title: "Sleep Hygiene: Improving Your Sleep Quality",
      description: "Video guide on establishing healthy sleep habits and improving overall sleep quality.",
      category: 'video',
      tags: ['sleep', 'wellness', 'lifestyle'],
      duration: '12 min video',
      level: 'beginner',
      videoUrl: '/videos/assets/sample-video.mp4',
      thumbnailUrl: '/videos/thumbnails/mindfulness.svg',
      source: 'National Sleep Foundation',
      datePublished: '2023-11-05',
      isBookmarked: false,
      isCompleted: false,
      relatedResources: [6, 8, 11]
    },
    {
      id: 10,
      title: "Understanding Your Lab Results: Complete Blood Count",
      description: "Interactive guide to interpreting common blood test results and what they mean for your health.",
      category: 'interactive',
      tags: ['diagnostics', 'blood tests', 'patient education'],
      duration: '15 min course',
      level: 'intermediate',
      source: 'Lab Tests Online',
      datePublished: '2023-10-20',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 11,
      title: "Managing Chronic Pain: Non-Medication Approaches",
      description: "Evidence-based strategies for managing chronic pain without relying solely on medications.",
      category: 'article',
      tags: ['pain management', 'chronic conditions', 'alternative therapy'],
      duration: '14 min read',
      level: 'intermediate',
      source: 'American Chronic Pain Association',
      datePublished: '2023-12-10',
      isBookmarked: false,
      isCompleted: false
    },
    {
      id: 12,
      title: "Proper Lifting Techniques to Prevent Back Injury",
      description: "Video demonstration of correct lifting mechanics to avoid back strain and injury.",
      category: 'video',
      tags: ['ergonomics', 'injury prevention', 'back health'],
      duration: '7 min video',
      level: 'beginner',
      videoUrl: '/videos/assets/sample-video.mp4',
      thumbnailUrl: '/videos/thumbnails/lifting.svg',
      source: 'American Physical Therapy Association',
      datePublished: '2023-11-15',
      isBookmarked: false,
      isCompleted: false,
      relatedResources: [1, 11]
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: FileText },
    { id: 'article', name: 'Articles', icon: BookOpen },
    { id: 'video', name: 'Videos', icon: Video },
    { id: 'interactive', name: 'Interactive Courses', icon: Award }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? (selectedCategory === 'all' ? true : resource.category === selectedCategory) : true;
    const matchesLevel = selectedLevel ? (selectedLevel === 'all' ? true : resource.level === selectedLevel) : true;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const toggleBookmark = (id: number) => {
    const updatedResources = resources.map(resource => 
      resource.id === id ? { ...resource, isBookmarked: !resource.isBookmarked } : resource
    );
    setResources(updatedResources);
    
    // Update bookmarked resources list
    const bookmarked = updatedResources.filter(resource => resource.isBookmarked);
    setBookmarkedResources(bookmarked);
  };

  const markAsCompleted = (id: number) => {
    const updatedResources = resources.map(resource => 
      resource.id === id ? { ...resource, isCompleted: !resource.isCompleted } : resource
    );
    setResources(updatedResources);
    
    // Update completed resources list
    const completed = updatedResources.filter(resource => resource.isCompleted);
    setCompletedResources(completed);
  };

  const handleVideoComplete = () => {
    if (selectedVideo) {
      markAsCompleted(selectedVideo.id);
    }
  };

  const openVideoModal = (resource: EducationalResource) => {
    setSelectedVideo(resource);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  const getRelatedResources = (resourceIds: number[] = []) => {
    return resources.filter(resource => resourceIds.includes(resource.id));
  };

  const renderResourceCard = (resource: EducationalResource) => {
    const CategoryIcon = resource.category === 'article' ? BookOpen : 
                        resource.category === 'video' ? Video : Award;
    
    return (
      <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                resource.category === 'article' ? 'bg-blue-100 text-blue-600' : 
                resource.category === 'video' ? 'bg-red-100 text-red-600' : 
                'bg-purple-100 text-purple-600'
              }`}>
                <CategoryIcon className="w-4 h-4" />
              </div>
              <Badge variant="outline" className="text-xs">
                {resource.category === 'article' ? 'Article' : 
                 resource.category === 'video' ? 'Video' : 'Interactive'}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${resource.isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => toggleBookmark(resource.id)}
              >
                <BookMarked className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${resource.isCompleted ? 'text-green-500' : 'text-gray-400'}`}
                onClick={() => markAsCompleted(resource.id)}
              >
                <Clock className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
          <div className="flex flex-wrap gap-1 mt-1">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <CardDescription className="text-sm mb-3">
            {resource.description}
          </CardDescription>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{resource.duration}</span>
              <span className="capitalize">{resource.level}</span>
            </div>
            <span>{resource.source}</span>
          </div>
          <Button 
            className="w-full mt-3" 
            size="sm"
            onClick={() => {
              if (resource.category === 'video' && resource.videoUrl) {
                openVideoModal(resource);
              }
              // Handle other resource types here
            }}
          >
            {resource.category === 'article' ? 'Read Article' : 
             resource.category === 'video' ? 'Watch Video' : 'Start Course'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl">{selectedVideo?.title}</DialogTitle>
              <DialogClose onClick={closeVideoModal} className="h-8 w-8 rounded-full hover:bg-gray-100">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            {selectedVideo && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedVideo.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </DialogHeader>
          
          {selectedVideo && (
            <div className="p-0">
              <VideoPlayer 
                src={selectedVideo.videoUrl || ''} 
                title={selectedVideo.title}
                poster={selectedVideo.thumbnailUrl}
                onComplete={handleVideoComplete}
              />
              
              <div className="p-4">
                <DialogDescription className="text-base mb-4">
                  {selectedVideo.description}
                </DialogDescription>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{selectedVideo.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Level</p>
                    <p className="font-medium capitalize">{selectedVideo.level}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Source</p>
                    <p className="font-medium">{selectedVideo.source}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Published</p>
                    <p className="font-medium">{selectedVideo.datePublished}</p>
                  </div>
                </div>
                
                {selectedVideo.relatedResources && selectedVideo.relatedResources.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Related Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getRelatedResources(selectedVideo.relatedResources).map(related => (
                        <Card key={related.id} className="overflow-hidden transition-all hover:shadow-md">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${related.category === 'article' ? 'bg-blue-100 text-blue-600' : related.category === 'video' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'}`}>
                              {related.category === 'article' ? <BookOpen className="w-4 h-4" /> : related.category === 'video' ? <Video className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{related.title}</h4>
                              <p className="text-xs text-gray-500">{related.duration} • {related.level}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="ml-auto"
                              onClick={() => {
                                closeVideoModal();
                                if (related.category === 'video' && related.videoUrl) {
                                  setTimeout(() => openVideoModal(related), 100);
                                }
                                // Handle other resource types
                              }}
                            >
                              {related.category === 'article' ? 'Read' : related.category === 'video' ? 'Watch' : 'Start'}
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Education Center</h1>
        <p className="text-gray-600">Explore educational resources to better understand your health</p>
      </div>

      <Tabs defaultValue="discover" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Resources</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search for resources..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="article">Articles</option>
                <option value="video">Videos</option>
                <option value="interactive">Interactive</option>
              </select>
              <select 
                className="px-3 py-2 rounded-md border border-gray-300 text-sm"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Resource Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id === 'all' ? '' : category.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      category.id === 'article' ? 'bg-blue-100 text-blue-600' : 
                      category.id === 'video' ? 'bg-red-100 text-red-600' : 
                      category.id === 'interactive' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    } mb-3`}>
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => renderResourceCard(resource))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No resources found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedLevel('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.isBookmarked).length > 0 ? (
              resources.filter(r => r.isBookmarked).map(resource => renderResourceCard(resource))
            ) : (
              <div className="col-span-full text-center py-12">
                <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">You haven't bookmarked any resources yet.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Resources
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.filter(r => r.isCompleted).length > 0 ? (
              resources.filter(r => r.isCompleted).map(resource => renderResourceCard(resource))
            ) : (
              <div className="col-span-full text-center py-12">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">You haven't completed any resources yet.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('discover')}
                >
                  Discover Resources
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthEducation;