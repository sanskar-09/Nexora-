import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Nexora Classic</h1>
        <p className="text-xl text-gray-300 mb-8">
          Your trusted healthcare companion
        </p>
        <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>24/7 Telemedicine</CardTitle>
            <CardDescription>Connect with doctors anytime, anywhere</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Schedule Appointment</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Tracking</CardTitle>
            <CardDescription>Monitor your health metrics in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Metrics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medication Management</CardTitle>
            <CardDescription>Keep track of your medications and dosages</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Manage Medications</Button>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose Nexora Classic?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Badge variant="secondary">Secure</Badge>
            <p className="mt-2 text-gray-300">End-to-end encryption for your medical data</p>
          </div>
          <div>
            <Badge variant="secondary">Accessible</Badge>
            <p className="mt-2 text-gray-300">Available on all devices, anytime</p>
          </div>
          <div>
            <Badge variant="secondary">Professional</Badge>
            <p className="mt-2 text-gray-300">Trusted healthcare professionals</p>
          </div>
          <div>
            <Badge variant="secondary">Modern</Badge>
            <p className="mt-2 text-gray-300">Cutting-edge healthcare technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
