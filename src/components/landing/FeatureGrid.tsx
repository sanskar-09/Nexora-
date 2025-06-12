
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope, Shield, Activity } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "AI-Powered Diagnostics",
      description: "Advanced symptom analysis with machine learning algorithms for accurate health insights and personalized recommendations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Health Records",
      description: "Military-grade encryption ensures your medical data is protected with HIPAA-compliant storage and access controls.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Continuous health tracking with smart alerts and comprehensive analytics to keep you informed about your wellness journey.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
              <feature.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
