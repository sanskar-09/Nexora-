
import React from 'react';
import { Heart } from 'lucide-react';

const LoginBranding = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-3xl mb-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-transparent animate-pulse"></div>
        <Heart className="w-10 h-10 text-white relative z-10" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-500">
          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">
        Nexora
      </h1>
      <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
        Your complete healthcare management platform
      </p>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200"></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  );
};

export default LoginBranding;