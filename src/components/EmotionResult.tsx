
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Emotion, EmotionResult as EmotionResultType, getEmotionColor, getEmotionIcon } from '@/lib/emotions';

interface EmotionResultProps {
  result: EmotionResultType;
  showImage?: boolean;
}

const EmotionResult: React.FC<EmotionResultProps> = ({ result, showImage = true }) => {
  const formattedDate = new Date(result.timestamp).toLocaleString();
  const confidencePercent = Math.round(result.confidence * 100);
  const emotionColor = getEmotionColor(result.emotion);
  const emotionIcon = getEmotionIcon(result.emotion);
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className={`${emotionColor} py-2 px-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emotionIcon}</span>
            <span className="font-medium capitalize">{result.emotion}</span>
          </div>
          <span className="text-xs opacity-75">{formattedDate}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {showImage && (
          <div className="w-full aspect-square mb-3 overflow-hidden rounded-md">
            <img 
              src={result.imageUrl} 
              alt={`${result.emotion} expression`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Confidence</span>
            <span className="font-medium">{confidencePercent}%</span>
          </div>
          
          <Progress value={confidencePercent} className="h-2" />
          
          <p className="text-sm text-muted-foreground">
            {getEmotionMessage(result.emotion, confidencePercent)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get message based on emotion and confidence
function getEmotionMessage(emotion: Emotion, confidence: number): string {
  if (confidence < 70) return "The result has moderate confidence. Try with better lighting for more accurate results.";
  
  switch (emotion) {
    case 'happy':
      return "You appear happy! Your positive energy is radiating.";
    case 'sad':
      return "You seem to be feeling down. Remember that it's okay to have off days.";
    case 'neutral':
      return "Your expression is neutral. How are you feeling inside?";
    case 'smile':
      return "That's a lovely smile! You're spreading joy.";
    default:
      return "Interesting expression! Our system analyzed your emotion.";
  }
}

export default EmotionResult;
