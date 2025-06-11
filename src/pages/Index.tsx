import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import PatientProfile from '@/components/PatientProfile';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import MedicalRecords from '@/components/MedicalRecords';
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
      case 'profile':
        return <PatientProfile />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'records':
        return <MedicalRecords />;
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
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trusted by 50,000+ patients worldwide
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Your Health Journey,
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block">
                Simplified & Secure
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Experience the future of healthcare with our comprehensive digital platform. 
              AI-powered insights, seamless care coordination, and personalized health management 
              all in one secure ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsAuthenticated(true)}
              >
                Start Your Health Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of patients who trust Nexora for their health management</p>
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
              onClick={() => setIsAuthenticated(true)}
            >
              Get Started Today
            </Button>
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
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
