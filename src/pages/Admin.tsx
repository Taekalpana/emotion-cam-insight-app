
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import UserHistory from '@/components/UserHistory';
import { useAuth } from '@/lib/auth';
import { useEmotions, Emotion } from '@/lib/emotions';
import { ScrollArea } from '@/components/ui/scroll-area';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { getAllResults } = useEmotions();
  
  // Redirect if not authenticated or not admin
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!user.isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  const allResults = getAllResults();
  
  // Group results by user
  const userGroups = allResults.reduce((acc, result) => {
    if (!acc[result.userId]) {
      acc[result.userId] = {
        email: result.userEmail,
        results: []
      };
    }
    acc[result.userId].results.push(result);
    return acc;
  }, {} as Record<string, { email: string; results: typeof allResults }>);
  
  // Calculate emotion statistics
  const totalAnalyses = allResults.length;
  const emotionCounts = {
    happy: allResults.filter(r => r.emotion === 'happy').length,
    sad: allResults.filter(r => r.emotion === 'sad').length,
    neutral: allResults.filter(r => r.emotion === 'neutral').length,
    smile: allResults.filter(r => r.emotion === 'smile').length,
  };
  
  const getEmotionPercentage = (emotion: Emotion): number => {
    if (totalAnalyses === 0) return 0;
    return Math.round((emotionCounts[emotion] / totalAnalyses) * 100);
  };
  
  return (
    <div className="min-h-screen bg-gradient">
      <Header />
      
      <main className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalAnalyses}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emotion-happy">Happy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{emotionCounts.happy}</p>
              <p className="text-sm text-muted-foreground">
                {getEmotionPercentage('happy')}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emotion-sad">Sad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{emotionCounts.sad}</p>
              <p className="text-sm text-muted-foreground">
                {getEmotionPercentage('sad')}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emotion-smile">Smile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{emotionCounts.smile}</p>
              <p className="text-sm text-muted-foreground">
                {getEmotionPercentage('smile')}% of total
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          {Object.entries(userGroups).map(([userId, { email, results }]) => (
            <Card key={userId}>
              <CardHeader>
                <CardTitle>User: {email}</CardTitle>
                <CardDescription>
                  {results.length} analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserHistory results={results} />
              </CardContent>
            </Card>
          ))}
          
          {Object.keys(userGroups).length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p>No user data available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
