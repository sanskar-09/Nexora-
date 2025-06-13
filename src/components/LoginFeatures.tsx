
import React from 'react';
import { Shield, Activity, Heart } from 'lucide-react';

const LoginFeatures = () => {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-in delay-200">
      <div className="flex flex-col items-center space-y-3 group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
          <Shield className="w-6 h-6 text-slate-600" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Secure & Private</span>
      </div>
      <div className="flex flex-col items-center space-y-3 group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Health Monitoring</span>
      </div>
      <div className="flex flex-col items-center space-y-3 group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
          <Heart className="w-6 h-6 text-indigo-600" />
        </div>
        <span className="text-sm text-slate-600 font-medium">Comprehensive Care</span>
      </div>
    </div>
  );
};

export default LoginFeatures;