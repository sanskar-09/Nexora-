
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import PatientProfile from '@/components/PatientProfile';
import SymptomChecker from '@/components/SymptomChecker';
import MedicationManager from '@/components/MedicationManager';
import HealthMonitoring from '@/components/HealthMonitoring';
import HealthEducation from '@/components/HealthEducation';
import Telemedicine from '@/components/Telemedicine';
import { useAuth } from '@/contexts/AuthContext';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { CTASection } from '@/components/landing/CTASection';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, user } = useAuth();

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
        return <Dashboard userRole={user?.role || 'patient'} />;
      case 'profile':
        return <PatientProfile />;
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
        return <Dashboard userRole={user?.role || 'patient'} />;
    }
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleWatchDemo = () => {
    // Placeholder for demo functionality
    console.log('Watch demo clicked');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navigation onAuthChange={() => {}} />
        
        <HeroSection 
          onGetStarted={handleGetStarted}
          onWatchDemo={handleWatchDemo}
        />
        
        <div className="container mx-auto px-4">
          <FeatureGrid />
          <CTASection onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onAuthChange={() => {}}
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
