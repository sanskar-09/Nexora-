import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract authentication data from URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const name = params.get('name');
    const email = params.get('email');
    const role = params.get('role');
    const error = params.get('error');

    if (error) {
      console.error('Authentication error:', error);
      navigate('/');
      return;
    }

    if (token && userId && name && email && role) {
      // Store authentication data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        _id: userId,
        name,
        email,
        role
      }));

      // Redirect to the dashboard
      navigate('/');
    } else {
      // If authentication failed, redirect to home
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Processing Authentication</h1>
        <p className="text-gray-600 mb-4">Please wait while we complete your login...</p>
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback;
