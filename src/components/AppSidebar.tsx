
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Pill, 
  Activity, 
  User,
  Heart,
  Video
} from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    title: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview of your health"
  },
  {
    id: 'symptoms',
    title: "Symptom Checker",
    icon: Stethoscope,
    description: "AI-powered health analysis"
  },
  {
    id: 'medications',
    title: "Medications",
    icon: Pill,
    description: "Manage your medications"
  },
  {
    id: 'monitoring',
    title: "Health Monitoring",
    icon: Activity,
    description: "Track vital signs"
  },
  {
    id: 'telemedicine',
    title: "Telemedicine",
    icon: Video,
    description: "Virtual doctor consultations"
  },
  {
    id: 'profile',
    title: "Profile",
    icon: User,
    description: "Your account settings"
  },
];

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Nexora</span>
        </div>
        <div className="px-4">
          <SidebarTrigger className="w-full" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                  >
                    <button className="w-full flex items-center space-x-3 p-2 rounded-lg transition-colors">
                      <item.icon className="w-5 h-5" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          © 2024 Nexora Health Platform
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
