import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative py-12 sm:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white text-center mb-6">About Nexora</h1>
            <p className="text-xl text-white text-center">
              Your trusted healthcare platform for modern, secure, and efficient medical solutions
            </p>
          </div>
        </div>

        {/* Company Overview */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2023, Nexora is a cutting-edge healthcare technology company dedicated to revolutionizing the way healthcare is delivered and managed. Our mission is to make healthcare more accessible, efficient, and personalized through innovative digital solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To empower individuals and healthcare providers with state-of-the-art technology solutions that enhance patient care, streamline medical processes, and improve health outcomes. We strive to create meaningful connections between technology and healthcare, making medical care accessible to all.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Patient-Centered Care</li>
                  <li>Innovation and Excellence</li>
                  <li>Privacy and Security</li>
                  <li>Collaboration and Partnership</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="py-12 bg-white shadow">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Symptom Checker</h3>
                <p className="text-gray-600">
                  Advanced AI-powered symptom analysis that helps users quickly identify potential health issues and provides appropriate next steps.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Medication Management</h3>
                <p className="text-gray-600">
                  Comprehensive medication tracking system that ensures users take their medications on time and provides important drug interaction warnings.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Monitoring</h3>
                <p className="text-gray-600">
                  Real-time health data tracking and analysis that helps users monitor their vitals and receive personalized health insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
            <p className="text-lg text-gray-600 mb-6">
              Nexora is built by a passionate team of healthcare professionals, engineers, and designers dedicated to creating meaningful solutions for the healthcare industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical Experts</h3>
                <p className="text-gray-600">
                  Board-certified physicians and healthcare professionals who ensure our solutions meet the highest medical standards.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technology Innovators</h3>
                <p className="text-gray-600">
                  Experienced engineers and developers who create cutting-edge technology solutions for healthcare.
                </p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Thinkers</h3>
                <p className="text-gray-600">
                  User experience designers focused on creating intuitive and accessible healthcare applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br/>
                  Saturday: 10:00 AM - 2:00 PM<br/>
                  Sunday: Closed
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-gray-600">
                  Email: support@nexora.com<br/>
                  Phone: +1 (555) 123-4567<br/>
                  Address: 123 Medical Tech Street, Health Valley, CA
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