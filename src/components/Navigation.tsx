
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Activity, 
  User,
  Heart,
  Video,
  LogOut,
  LucideProps,
  Menu,
  Pill
} from "lucide-react";
import { authService } from "@/services/api";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  onAuthChange: (isAuth: boolean) => void;
  isAuthenticated?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>>;
  href?: string;
}

// Simplified core navigation items
const coreMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 'profile',
    title: "Profile",
    icon: User,
  },
  {
    id: 'symptoms',
    title: "Symptoms",
    icon: Stethoscope,
  },
  {
    id: 'medications',
    title: "Medications",
    icon: Pill,
  },
  {
    id: 'monitoring',
    title: "Monitoring",
    icon: Activity,
  },
  {
    id: 'telemedicine',
    title: "Telemedicine",
    icon: Video,
  },
];

const Navigation = ({ onAuthChange, isAuthenticated = false, activeTab, onTabChange }: NavigationProps) => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const email = prompt("Enter your email");
      const password = prompt("Enter your password");
      if (email && password) {
        const userData = await authService.login(email, password);
        setUser(userData);
        onAuthChange(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    onAuthChange(false);
  };

  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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

          {/* Desktop Navigation - Only show when authenticated */}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all">
                      <User className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl border-gray-200">
                    <DropdownMenuLabel className="text-gray-900">John Doe</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-gray-50">Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-50">Medical Records</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-50">Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={handleLogin} className="text-gray-700 hover:bg-blue-50">
                  Sign In
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                  onClick={() => authService.register({
                    name: prompt("Enter your name"),
                    email: prompt("Enter your email"),
                    password: prompt("Enter your password"),
                    role: 'patient'
                  }).then(() => handleLogin())}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-2">
              {coreMenuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => handleTabChange(item.id)}
                  className={`justify-start ${
                    activeTab === item.id 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="justify-start text-gray-700 hover:bg-blue-50"
              >
                About
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
