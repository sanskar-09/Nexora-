
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { coreMenuItems } from './NavigationData';

interface MobileMenuProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAbout: () => void;
  onLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onAbout,
  onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4 border-t border-gray-200 bg-white">
      <div className="flex flex-col space-y-2">
        {coreMenuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            onClick={() => onTabChange(item.id)}
            className={`justify-start ${
              activeTab === item.id 
                ? "bg-blue-600 text-white" 
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
          onClick={onAbout}
          className="text-gray-700 hover:bg-blue-50"
        >
          About
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="justify-start text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );
};
