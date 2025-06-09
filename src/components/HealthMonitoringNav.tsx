import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Pill, 
  Activity, 
  User,
  Heart,
  Video,
  BookOpen,
  LogOut,
  LucideProps
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>>;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: "Dashboard",
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  {
    id: 'symptoms',
    title: "Symptom Checker",
    icon: Stethoscope,
    href: '/symptoms'
  },
  {
    id: 'medications',
    title: "Medications",
    icon: Pill,
    href: '/medications'
  },
  {
    id: 'activity',
    title: "Activity",
    icon: Activity,
    href: '/activity'
  },
  {
    id: 'profile',
    title: "Profile",
    icon: User,
    href: '/profile'
  },
  {
    id: 'health',
    title: "Health Monitoring",
    icon: Heart,
    href: '/health'
  },
  {
    id: 'videos',
    title: "Educational Videos",
    icon: Video,
    href: '/videos'
  },
  {
    id: 'resources',
    title: "Health Resources",
    icon: BookOpen,
    href: '/resources'
  }
];

const HealthMonitoringNav = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('health');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(tab);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => handleTabChange(item.href)}
                className="flex items-center space-x-2"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
          <Button variant="outline">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoringNav;
