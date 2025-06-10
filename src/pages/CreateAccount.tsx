
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn, Shield, Heart, Users } from 'lucide-react';

const CreateAccount = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header with Logo */}
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-6">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Nexora
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Health Journey Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who trust Nexora for comprehensive health management and AI-powered insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Health Insights</h3>
              <p className="text-gray-600">Get personalized health recommendations powered by advanced AI</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your health data is protected with military-grade encryption</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Care</h3>
              <p className="text-gray-600">Connect with certified healthcare professionals anytime</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="text-center max-w-md mx-auto mb-16">
          <div className="space-y-4">
            <Link to="/signup" className="block">
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                <UserPlus className="w-5 h-5 mr-2" />
                Create Free Account
              </Button>
            </Link>
            
            <Link to="/login" className="block">
              <Button variant="outline" size="lg" className="w-full border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 py-4 text-lg font-semibold transition-all">
                <LogIn className="w-5 h-5 mr-2" />
                Sign In to Existing Account
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="text-center border-t border-gray-200 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
