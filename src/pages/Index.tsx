import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import SymptomChecker from '@/components/SymptomChecker';
import MedicationManager from '@/components/MedicationManager';
import HealthMonitoring from '@/components/HealthMonitoring';
import UserProfile from '@/components/UserProfile';
import Telemedicine from '@/components/Telemedicine';
import HealthEducation from '@/components/HealthEducation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin'>('patient');

  const renderContent = () => {
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
      case 'profile':
        return <UserProfile userRole={userRole} />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navigation onAuthChange={setIsAuthenticated} />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Health, <span className="text-blue-600">Our Priority</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive digital healthcare platform for managing your health journey with AI-powered insights, 
              medication tracking, and personalized care recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                onClick={() => setIsAuthenticated(true)}
              >
                Get Started Today
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Symptom Checker</h3>
                <p className="text-gray-600">
                  Get instant health insights with our AI-powered symptom analysis and personalized recommendations.
                </p>
              </div>
            </div>

            <div className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Medication Management</h3>
                <p className="text-gray-600">
                  Never miss a dose with smart reminders and comprehensive medication tracking.
                </p>
              </div>
            </div>

            <div className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow rounded-lg">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Analytics</h3>
                <p className="text-gray-600">
                  Track your progress with detailed health metrics and visual analytics.
                </p>
              </div>
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
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
