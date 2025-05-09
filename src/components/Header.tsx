
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth, User } from '@/lib/auth';
import { Camera, LogOut, History, User as UserIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm py-4 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-primary">EmotionCam</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-3">
            {user.isAdmin ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-sm flex items-center gap-1"
                onClick={() => navigate('/admin')}
              >
                <History className="h-4 w-4 mr-1" />
                Admin
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-sm flex items-center gap-1"
                onClick={() => navigate('/dashboard')}
              >
                <UserIcon className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-sm flex items-center gap-1"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
