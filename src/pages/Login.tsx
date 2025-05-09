
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { Camera } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const { login, adminLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    await login(email);
    navigate('/dashboard');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminLogin(adminEmail, adminPassword);
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-app">
      <Card className="w-full max-w-md hero-card shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Camera className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">EmotionCam</CardTitle>
          <CardDescription>Analyze facial expressions with AI</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login / Register'}
                </Button>
                
                <div className="text-xs text-center text-muted-foreground">
                  Just enter your email to login or create a new account.
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="adminEmail" className="block text-sm font-medium">
                    Admin Email
                  </label>
                  <Input 
                    id="adminEmail" 
                    type="email" 
                    placeholder="Admin email" 
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="adminPassword" className="block text-sm font-medium">
                    Password
                  </label>
                  <Input 
                    id="adminPassword" 
                    type="password" 
                    placeholder="Admin password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Admin Login'}
                </Button>
                
                <div className="text-xs text-center text-muted-foreground mt-2">
                  <p>Demo admin credentials:</p>
                  <p>Email: admin@example.com</p>
                  <p>Password: admin</p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          &copy; 2025 EmotionCam Insight App
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
