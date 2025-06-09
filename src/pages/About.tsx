
import React from 'react';
import { Heart, Shield, Users, Award, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative py-16 mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-2xl transform -skew-y-1 rounded-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-8 text-center">
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-white mb-6">About HealthCare Plus</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Your comprehensive digital health companion, empowering you to take control of your wellness journey through cutting-edge technology and personalized care.
            </p>
            <div className="flex justify-center items-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2" />
                <span className="font-semibold">50,000+ Users</span>
              </div>
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-2" />
                <span className="font-semibold">Medical Grade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe healthcare should be accessible, personalized, and empowering. Our platform bridges the gap between patients and healthcare providers, offering intelligent symptom analysis, comprehensive health monitoring, and seamless telemedicine experiences.
          </p>
        </div>

        {/* Key Features */}
        <div className="py-16 bg-white rounded-3xl shadow-lg mb-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Comprehensive Health Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Symptom Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced AI-powered symptom checker that analyzes your symptoms and provides preliminary health insights based on medical databases.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Monitoring</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track vital signs, medication schedules, and health metrics with intuitive dashboards and personalized insights.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Telemedicine</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with certified healthcare professionals through secure video consultations and digital prescriptions.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Round-the-clock access to health information, emergency guidance, and medical support when you need it most.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Records</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure digital storage and management of your medical history, test results, and treatment plans.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certified Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  HIPAA-compliant platform with medical-grade security and privacy standards for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl mb-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign Up</h3>
                <p className="text-gray-600">Create your secure health profile with basic information and preferences.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Symptoms</h3>
                <p className="text-gray-600">Describe your symptoms using our intuitive interface and AI-guided questions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Analysis</h3>
                <p className="text-gray-600">Receive AI-powered health insights and recommendations for next steps.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">4</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Take Action</h3>
                <p className="text-gray-600">Connect with healthcare providers or monitor your health based on recommendations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Your Health, Your Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">HIPAA Compliant</h3>
                <p className="text-gray-600">Full compliance with healthcare privacy regulations and data protection standards.</p>
              </div>
              <div className="p-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Grade Security</h3>
                <p className="text-gray-600">End-to-end encryption and secure data handling with regular security audits.</p>
              </div>
              <div className="p-6">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Validated</h3>
                <p className="text-gray-600">All medical content reviewed and validated by licensed healthcare professionals.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              We never share your personal health information without your explicit consent. Your data is encrypted, secure, and used solely to provide you with the best possible healthcare experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
