
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/Header';
import Camera from '@/components/Camera';
import EmotionResult from '@/components/EmotionResult';
import UserHistory from '@/components/UserHistory';
import { useAuth } from '@/lib/auth';
import { EmotionResult as EmotionResultType, useEmotions } from '@/lib/emotions';
import { Camera as CameraIcon, History } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getUserResults } = useEmotions();
  const [currentResult, setCurrentResult] = useState<EmotionResultType | null>(null);
  const [activeTab, setActiveTab] = useState('camera');
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const userResults = user ? getUserResults(user.id) : [];
  
  const handleResultReceived = (result: EmotionResultType) => {
    setCurrentResult(result);
    setActiveTab('result');
  };
  
  return (
    <div className="min-h-screen bg-gradient">
      <Header />
      
      <main className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Face Emotion Analysis</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <CameraIcon className="h-4 w-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="result" disabled={!currentResult} className="flex items-center gap-2">
              Analysis
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera">
            <Card>
              <CardHeader>
                <CardTitle>Capture or Upload</CardTitle>
                <CardDescription>
                  Take a photo or upload an image to analyze emotion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Camera onImageCaptured={handleResultReceived} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            {currentResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Emotion Analysis Result</CardTitle>
                  <CardDescription>
                    Our AI detected the following emotion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmotionResult result={currentResult} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Emotion History</CardTitle>
                <CardDescription>
                  View past emotion analysis results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserHistory results={userResults} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
