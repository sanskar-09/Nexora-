import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-6">About Our Website</h1>
            <p className="text-xl text-white text-center">
              Your trusted healthcare information platform
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Information</h3>
                <p className="text-gray-600">
                  Access comprehensive medical information about various health conditions, symptoms, and treatments.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Medication Guide</h3>
                <p className="text-gray-600">
                  Detailed information about medications, including uses, side effects, and interactions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Tips</h3>
                <p className="text-gray-600">
                  Practical health tips and advice from medical professionals to help you maintain a healthy lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical Resources</h3>
                <p className="text-gray-600">
                  Links to trusted medical resources and organizations for further information and support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-12 bg-white shadow">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Search</h3>
                <p className="text-gray-600">
                  Use our search function to find information about specific health topics, symptoms, or medications.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse</h3>
                <p className="text-gray-600">
                  Explore different categories of health information through our organized navigation menu.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn</h3>
                <p className="text-gray-600">
                  Read articles, watch videos, and access guides to better understand various health topics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy & Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Protection</h3>
                <p className="text-gray-600">
                  Your privacy is important to us. We do not collect or store personal health information.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Accuracy</h3>
                <p className="text-gray-600">
                  All medical information is reviewed by healthcare professionals to ensure accuracy and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;