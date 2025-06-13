
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Users, Award, Clock } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onWatchDemo }) => {
  const stats = [
    { icon: Users, label: "Active Patients", value: "50K+" },
    { icon: Award, label: "Success Rate", value: "98%" },
    { icon: Clock, label: "Response Time", value: "<2min" }
  ];

  return (
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
            onClick={onGetStarted}
          >
            Start Your Health Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all"
            onClick={onWatchDemo}
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
    </div>
  );
};
