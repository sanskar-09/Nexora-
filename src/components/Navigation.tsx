import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Pill, 
  Activity, 
  User,
  Heart,
  Video,
  BookOpen
} from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 'symptoms',
    title: "Symptom Checker",
    icon: Stethoscope,
  },
  {
    id: 'medications',
    title: "Medications",
    icon: Pill,
  },
  {
    id: 'monitoring',
    title: "Health Monitoring",
    icon: Activity,
  },
  {
    id: 'education',
    title: "Health Education",
    icon: BookOpen,
  },
  {
    id: 'telemedicine',
    title: "Telemedicine",
    icon: Video,
  },
  {
    id: 'profile',
    title: "Profile",
    icon: User,
  },
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Nexora</span>
          </div>

          {/* Navigation Menu - Always visible */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange && onTabChange(item.id)}
                className="flex items-center space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>

          {/* Empty space where user actions used to be */}
          <div className="flex items-center space-x-4">
            {/* No login/register buttons needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
