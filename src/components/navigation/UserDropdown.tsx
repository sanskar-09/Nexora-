
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User,
  LogOut,
  FileText,
  Settings,
  Heart
} from "lucide-react";

interface UserDropdownProps {
  userName: string;
  onProfileSettings: () => void;
  onMedicalRecords: () => void;
  onAccountSettings: () => void;
  onSupport: () => void;
  onLogout: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({
  userName,
  onProfileSettings,
  onMedicalRecords,
  onAccountSettings,
  onSupport,
  onLogout
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all">
          <User className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl border-gray-200">
        <DropdownMenuLabel className="text-gray-900">
          {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onProfileSettings}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <User className="w-4 h-4 mr-2" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onMedicalRecords}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2" />
          Medical Records
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onAccountSettings}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <Settings className="w-4 h-4 mr-2" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={onSupport}
          className="hover:bg-gray-50 cursor-pointer"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600 hover:bg-red-50 cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
