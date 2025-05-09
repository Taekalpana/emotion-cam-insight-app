
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EmotionResult as EmotionResultType, Emotion, getEmotionIcon } from '@/lib/emotions';
import EmotionResult from './EmotionResult';

interface UserHistoryProps {
  results: EmotionResultType[];
}

const UserHistory: React.FC<UserHistoryProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'all' | Emotion>('all');
  
  // Group results by emotion
  const happyResults = results.filter(r => r.emotion === 'happy');
  const sadResults = results.filter(r => r.emotion === 'sad');
  const neutralResults = results.filter(r => r.emotion === 'neutral');
  const smileResults = results.filter(r => r.emotion === 'smile');
  
  // Filter results based on active tab
  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(r => r.emotion === activeTab);
  
  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="happy" className="text-xs sm:text-sm flex items-center gap-1">
            <span>{getEmotionIcon('happy')}</span> 
            <span className="hidden sm:inline">Happy</span>
            <span className="inline sm:hidden">{happyResults.length}</span>
          </TabsTrigger>
          <TabsTrigger value="sad" className="text-xs sm:text-sm flex items-center gap-1">
            <span>{getEmotionIcon('sad')}</span>
            <span className="hidden sm:inline">Sad</span>
            <span className="inline sm:hidden">{sadResults.length}</span>
          </TabsTrigger>
          <TabsTrigger value="neutral" className="text-xs sm:text-sm flex items-center gap-1">
            <span>{getEmotionIcon('neutral')}</span>
            <span className="hidden sm:inline">Neutral</span>
            <span className="inline sm:hidden">{neutralResults.length}</span>
          </TabsTrigger>
          <TabsTrigger value="smile" className="text-xs sm:text-sm flex items-center gap-1">
            <span>{getEmotionIcon('smile')}</span>
            <span className="hidden sm:inline">Smile</span>
            <span className="inline sm:hidden">{smileResults.length}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <ScrollArea className="h-[400px] pr-4">
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredResults.map((result) => (
                  <EmotionResult key={result.id} result={result} showImage={true} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                <p>No results found</p>
                <p className="text-sm mt-1">Try capturing or uploading an image first</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserHistory;
