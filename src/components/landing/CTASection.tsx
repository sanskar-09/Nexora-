
import React from 'react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
      <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
      <p className="text-xl mb-8 opacity-90">Join thousands of patients who trust Nexora for their health management</p>
      <Button 
        size="lg"
        variant="secondary"
        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
        onClick={onGetStarted}
      >
        Get Started Today
      </Button>
    </div>
  );
};
