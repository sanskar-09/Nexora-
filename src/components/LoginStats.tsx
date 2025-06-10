
import React from 'react';
import { Users, Shield, Clock } from 'lucide-react';

const LoginStats = () => {
  return (
    <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-slate-500 animate-fade-in delay-300">
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4" />
        <span>10K+ Users</span>
      </div>
      <div className="flex items-center space-x-2">
        <Shield className="w-4 h-4" />
        <span>HIPAA Compliant</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4" />
        <span>24/7 Support</span>
      </div>
    </div>
  );
};

export default LoginStats;