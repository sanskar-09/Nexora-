
import React from 'react';
import LoginBackground from './LoginBackground';
import LoginBranding from './LoginBranding';
import LoginForm from './LoginForm';
import LoginFeatures from './LoginFeatures';
import LoginStats from './LoginStats';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <LoginBackground />
      <div className="w-full max-w-md relative z-10">
        <LoginBranding />
        <LoginForm />
        <LoginFeatures />
        <LoginStats />
      </div>
    </div>
  );
};

export default Login;