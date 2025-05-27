import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SymptomChecker from '@/components/SymptomChecker';
import MedicationManager from '@/components/MedicationManager';
import HealthMonitoring from '@/components/HealthMonitoring';
import UserProfile from '@/components/UserProfile';
import Telemedicine from '@/components/Telemedicine';
import HealthEducation from '@/components/HealthEducation';

interface IndexProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Index = ({ activeTab: propActiveTab, onTabChange }: IndexProps) => {
  const [activeTab, setActiveTab] = useState(propActiveTab || 'dashboard');

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userRole="patient" onTabChange={handleTabChange} />;
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
      case 'profile':
        return <UserProfile userRole="patient" />;
      default:
        return <Dashboard userRole="patient" onTabChange={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
