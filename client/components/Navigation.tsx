import { Link } from "react-router-dom";
import { Search, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { OktaLogo } from "./OktaLogo";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <OktaLogo className="text-okta-blue" size={32} />
            <span className="text-2xl font-bold text-foreground">
              Okta<span className="text-okta-blue">TV</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-okta-blue transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/trainings" 
              className="text-sm font-medium text-muted-foreground hover:text-okta-blue transition-colors"
            >
              Training
            </Link>
            <Link 
              to="/townhalls" 
              className="text-sm font-medium text-muted-foreground hover:text-okta-blue transition-colors"
            >
              Town Halls
            </Link>
            <Link 
              to="/onboarding" 
              className="text-sm font-medium text-muted-foreground hover:text-okta-blue transition-colors"
            >
              Onboarding
            </Link>
            <Link 
              to="/my-videos" 
              className="text-sm font-medium text-muted-foreground hover:text-okta-blue transition-colors"
            >
              My Videos
            </Link>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search videos..."
                className="w-64 pl-10 bg-muted/50 border-muted-foreground/20"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-okta-blue rounded-full"></span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
