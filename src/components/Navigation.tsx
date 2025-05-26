
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

const Navigation = ({ onAuthChange, isAuthenticated = false, activeTab, onTabChange }: NavigationProps) => {
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
                    <DropdownMenuItem onClick={() => onAuthChange(false)}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => onAuthChange(true)}>
                  Sign In
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => onAuthChange(true)}>
                  Sign Up
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
