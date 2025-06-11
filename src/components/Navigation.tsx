import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

interface NavigationProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
  isAuthenticated?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Navigation = ({ onAuthChange, isAuthenticated = true, activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Dashboard", tab: "dashboard" },
    { path: "/symptom-checker", label: "Symptom Checker", tab: "symptoms" },
    { path: "/medication", label: "Medication", tab: "medications" },
    { path: "/health-monitoring", label: "Health Monitoring", tab: "monitoring" },
    { path: "/telemedicine", label: "Telemedicine", tab: "telemedicine" },
    { path: "/education", label: "Health Education", tab: "education" },
    { path: "/about", label: "About", tab: "about" }
  ];

  const handleNavClick = (item: any) => {
    if (onTabChange && item.tab) {
      onTabChange(item.tab);
    }
    setIsMobileMenuOpen(false);
  };
>>>>>>> parent of e5b253c (Fix: Improve navbar UI and functionality)

const Navigation = () => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Nexora</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/symptom-checker" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Symptom Checker
            </Link>
            <Link to="/medication" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Medication
            </Link>
            <Link to="/health-monitoring" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Health Monitoring
            </Link>
            <Link to="/telemedicine" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Telemedicine
            </Link>
            <Link to="/education" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Health Education
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>
        </div>
=======
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
=======
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
>>>>>>> parent of e5b253c (Fix: Improve navbar UI and functionality)
          <div className="flex items-center">
            <Link to="/create-account" className="flex items-center" onClick={() => handleNavClick({ tab: "create-account" })}>
              <span className="text-xl font-bold text-gray-800">Nexora</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path || activeTab === item.tab
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path || activeTab === item.tab
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <Link to="/login" className="block">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
>>>>>>> parent of e5b253c (Fix: Improve navbar UI and functionality)
      </div>
    </nav>
  );
};

export default Navigation;
