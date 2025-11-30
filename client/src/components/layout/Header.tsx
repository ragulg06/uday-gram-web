import { useState } from "react";
import { Menu, User, ChevronDown, LogOut, Key, Settings, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuClick: () => void;
  userName: string;
  userRole: string;
  lastLogin?: string;
}

export function Header({ onMenuClick, userName, userRole, lastLogin }: HeaderProps) {
  const [language, setLanguage] = useState("English");

  const formatLastLogin = () => {
    if (!lastLogin) return "03-04-2024 2:40 pm";
    return lastLogin;
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 lg:px-6" data-testid="header">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="shrink-0"
          data-testid="button-menu-toggle"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Government of India" 
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-primary">PMAGY</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Adarsh Gram Component</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Last Login: {formatLastLogin()}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5" data-testid="button-language">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("English")} data-testid="menu-item-english">
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("हिंदी")} data-testid="menu-item-hindi">
              हिंदी
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-2 sm:px-3"
              data-testid="button-user-menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium leading-tight">{userName}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {userRole}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 md:hidden">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <DropdownMenuSeparator className="md:hidden" />
            <DropdownMenuItem data-testid="menu-item-profile">
              <Settings className="mr-2 h-4 w-4" />
              Update Profile
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-change-password">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" data-testid="menu-item-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
