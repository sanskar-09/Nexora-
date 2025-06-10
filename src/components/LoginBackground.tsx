import React from 'react';
import { Stethoscope, Pill, Calendar, TrendingUp, Clock, Users } from 'lucide-react';

const LoginBackground = () => {
  return (
    <>
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/15 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-300/15 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-16 text-slate-400/30 animate-pulse">
          <Stethoscope className="w-8 h-8" />
        </div>
        <div className="absolute top-32 right-24 text-blue-400/30 animate-pulse delay-1000">
          <Pill className="w-6 h-6" />
        </div>
        <div className="absolute bottom-32 left-32 text-indigo-400/30 animate-pulse delay-500">
          <Calendar className="w-7 h-7" />
        </div>
        <div className="absolute bottom-20 right-16 text-slate-500/30 animate-pulse delay-700">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 left-8 text-blue-300/25 animate-pulse delay-300">
          <Clock className="w-5 h-5" />
        </div>
        <div className="absolute top-1/3 right-8 text-indigo-300/25 animate-pulse delay-800">
          <Users className="w-6 h-6" />
        </div>
      </div>
    </>
  );
};

export default LoginBackground;
