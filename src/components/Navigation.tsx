
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Heart, LogIn } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from "./auth/AuthModal";

interface NavigationProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Navigation = ({ onAuthChange, activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (onAuthChange) {
      onAuthChange(isAuthenticated);
    }
  }, [isAuthenticated, onAuthChange]);

  // Navigation items
  const navigationItems = [
    { path: "/", label: "Dashboard", tab: "dashboard" },
    { path: "/symptom-checker", label: "Symptom Checker", tab: "symptoms" },
    { path: "/medication", label: "Medication Manager", tab: "medication" },
    { path: "/health-monitoring", label: "Health Monitor", tab: "monitoring" },
    { path: "/telemedicine", label: "Telemedicine", tab: "telemedicine" },
    { path: "/education", label: "Health Education", tab: "education" },
    { path: "/about", label: "About", tab: "about" }
  ].filter(item => {
    // Filter out protected routes when not authenticated
    const protectedRoutes = ['/symptom-checker', '/medication', '/health-monitoring', '/telemedicine', '/education'];
    return !isAuthenticated ? item.path === '/' || item.path === '/about' : true;
  });

  const handleNavClick = (item: any) => {
    if (onTabChange && item.tab) {
      onTabChange(item.tab);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2" onClick={() => handleNavClick({ tab: "dashboard" })}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Nexora
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  location.pathname === item.path || activeTab === item.tab
                    ? "text-blue-600 bg-blue-50 shadow-sm"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                className="text-gray-600 hover:text-blue-600"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <span className="text-sm">Welcome!</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <LogIn className="w-4 h-4 mr-2 rotate-180" />
                  Sign out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
              {navigationItems.map((item) => (
                <div
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer ${
                    location.pathname === item.path || activeTab === item.tab
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </div>
              ))}
              
              {/* Mobile Auth Button */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                {!isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full justify-start text-gray-600 hover:text-blue-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign in
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                    >
                      <span className="text-sm">Welcome!</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="w-full justify-start text-gray-600 hover:text-blue-600"
                    >
                      <LogIn className="w-4 h-4 mr-2 rotate-180" />
                      Sign out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </nav>
  );
};

export default Navigation;
