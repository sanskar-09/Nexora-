
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SymptomChecker from '@/components/SymptomChecker';
import MedicationManager from '@/components/MedicationManager';
import HealthMonitoring from '@/components/HealthMonitoring';
import Telemedicine from '@/components/Telemedicine';
import HealthEducation from '@/components/HealthEducation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Stethoscope, 
  Shield, 
  Activity, 
  Users, 
  Award, 
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for testing
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin'>('patient');

  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveTab('about');
    }
  }, [location]);

  const renderContent = () => {
    if (location.pathname === '/about') {
      return null; // About page is handled by the About component
    }
    
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'medications':
        return <MedicationManager />;
      case 'monitoring':
        return <HealthMonitoring />;
      case 'education':
        return <HealthEducation />;
      case 'telemedicine':
        return <Telemedicine />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  const features = [
    {
      icon: Stethoscope,
      title: "AI-Powered Diagnostics",
      description: "Advanced symptom analysis with machine learning algorithms for accurate health insights and personalized recommendations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Health Records",
      description: "Military-grade encryption ensures your medical data is protected with HIPAA-compliant storage and access controls.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with smart alerts and comprehensive analytics to keep you informed about your wellness journey.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Patients", value: "50K+" },
    { icon: Award, label: "Success Rate", value: "98%" },
    { icon: Clock, label: "Response Time", value: "<2min" }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navigation onAuthChange={setIsAuthenticated} />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to Nexora Health
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Personalized Healthcare Companion
            </p>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg shadow-lg bg-white"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r ${feature.gradient} text-white`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        onAuthChange={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
