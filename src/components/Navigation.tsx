import { useState } from "react";
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
  Pill, 
  Activity, 
  User,
  Heart,
  Video,
  BookOpen
} from "lucide-react";

interface NavigationProps {
  onAuthChange: (isAuth: boolean) => void;
  onLogin?: (email: string, password: string) => Promise<boolean>;
  isAuthenticated?: boolean;
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

const Navigation = ({ onAuthChange, onLogin, isAuthenticated = false, activeTab, onTabChange }: NavigationProps) => {
  // State for login form
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    try {
      if (onLogin) {
        const success = await onLogin(email, password);
        if (success) {
          setShowLoginForm(false);
          setEmail('');
          setPassword('');
        } else {
          setLoginError('Invalid email or password');
        }
      } else {
        // Fallback if onLogin not provided
        onAuthChange(true);
        setShowLoginForm(false);
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // For demo purposes - quick login with demo account
  const handleQuickLogin = async () => {
    if (onLogin) {
      setIsLoggingIn(true);
      try {
        await onLogin('demo@example.com', 'password');
        setShowLoginForm(false);
      } catch (error) {
        console.error('Quick login failed:', error);
      } finally {
        setIsLoggingIn(false);
      }
    } else {
      onAuthChange(true);
      setShowLoginForm(false);
    }
  };
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

          {/* Navigation Menu - Only show when authenticated */}
          {isAuthenticated && onTabChange && (
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Button>
              ))}
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Patient Account
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 rounded-full bg-blue-600 text-white">
                      JD
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      // Always log out
                      onAuthChange(false);
                    }}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {showLoginForm ? (
                  <div className="relative">
                    <form onSubmit={handleLoginSubmit} className="absolute right-0 top-10 bg-white p-4 rounded-md shadow-lg border border-gray-200 w-80 z-50">
                      <h3 className="text-lg font-medium mb-4">Sign In</h3>
                      {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            required 
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                            required 
                          />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <Button type="button" variant="ghost" size="sm" onClick={() => setShowLoginForm(false)}>Cancel</Button>
                          <Button type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Signing in...' : 'Sign In'}
                          </Button>
                        </div>
                        <div className="pt-2 border-t border-gray-200 mt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="w-full" 
                            onClick={handleQuickLogin}
                            disabled={isLoggingIn}
                          >
                            Demo Login
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
                <Button variant="ghost" onClick={() => setShowLoginForm(true)}>
                  Sign In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleQuickLogin}>
                  Demo Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
