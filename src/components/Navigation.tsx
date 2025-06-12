
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { coreMenuItems } from './navigation/NavigationData';
import { UserDropdown } from './navigation/UserDropdown';
import { MobileMenu } from './navigation/MobileMenu';

interface NavigationProps {
  onAuthChange: (isAuth: boolean) => void;
  isAuthenticated?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Navigation = ({ onAuthChange, isAuthenticated = false, activeTab, onTabChange }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await logout();
      onAuthChange(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (onTabChange) {
      onTabChange('dashboard');
    }
  };

  const handleProfileSettings = () => {
    if (onTabChange) {
      onTabChange('profile');
    }
  };

  const handleMedicalRecords = () => {
    if (onTabChange) {
      onTabChange('telemedicine');
      setTimeout(() => {
        const recordsTab = document.querySelector('[data-value="records"]') as HTMLElement;
        if (recordsTab) {
          recordsTab.click();
        }
      }, 100);
    }
  };

  const handleAccountSettings = () => {
    if (onTabChange) {
      onTabChange('profile');
    }
  };

  const handleSupport = () => {
    window.open('mailto:support@nexora.com?subject=Support Request', '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Nexora
              </span>
              <p className="text-xs text-gray-500 -mt-1">Healthcare Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && onTabChange && (
            <div className="hidden md:flex items-center space-x-2">
              {coreMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/about')}
                className="text-gray-700 hover:bg-blue-50"
              >
                About
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 hidden sm:flex">
                  Patient Portal
                </Badge>
                <UserDropdown
                  userName={authUser?.name || 'John Doe'}
                  onProfileSettings={handleProfileSettings}
                  onMedicalRecords={handleMedicalRecords}
                  onAccountSettings={handleAccountSettings}
                  onSupport={handleSupport}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={handleLogin} className="text-gray-700 hover:bg-blue-50">
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          activeTab={activeTab || ''}
          onTabChange={handleTabChange}
          onAbout={() => navigate('/about')}
          onLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navigation;
