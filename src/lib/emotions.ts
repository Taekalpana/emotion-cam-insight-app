
import { create } from 'zustand';
import { toast } from 'sonner';

// Emotion types
export type Emotion = 'happy' | 'sad' | 'neutral' | 'smile';

// Result interface
export interface EmotionResult {
  id: string;
  userId: string;
  userEmail: string;
  emotion: Emotion;
  confidence: number;
  timestamp: Date;
  imageUrl: string;
}

// Store interface
interface EmotionState {
  results: EmotionResult[];
  isLoading: boolean;
  currentResult: EmotionResult | null;
  detectEmotion: (imageData: string, userId: string, userEmail: string) => Promise<EmotionResult>;
  getUserResults: (userId: string) => EmotionResult[];
  getAllResults: () => EmotionResult[];
  getResultsByEmotion: (emotion: Emotion) => EmotionResult[];
}

// Create emotion detection store
export const useEmotions = create<EmotionState>((set, get) => ({
  results: [],
  isLoading: false,
  currentResult: null,
  
  detectEmotion: async (imageData: string, userId: string, userEmail: string) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would send the image to a ML model API
      // Here we're just randomly selecting an emotion
      const emotions: Emotion[] = ['happy', 'sad', 'neutral', 'smile'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const confidence = Math.random() * 0.5 + 0.5; // Random confidence between 0.5 and 1
      
      const result: EmotionResult = {
        id: `result_${Date.now()}`,
        userId,
        userEmail,
        emotion: randomEmotion,
        confidence,
        timestamp: new Date(),
        imageUrl: imageData
      };
      
      // Update store with new result
      set(state => ({
        results: [result, ...state.results],
        currentResult: result,
        isLoading: false
      }));
      
      return result;
    } catch (error) {
      console.error('Emotion detection error:', error);
      toast.error('Failed to analyze emotion. Please try again.');
      set({ isLoading: false });
      throw error;
    }
  },
  
  getUserResults: (userId: string) => {
    return get().results.filter(result => result.userId === userId);
  },
  
  getAllResults: () => {
    return get().results;
  },
  
  getResultsByEmotion: (emotion: Emotion) => {
    return get().results.filter(result => result.emotion === emotion);
  }
}));

// Helper function to get color based on emotion
export const getEmotionColor = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy': return 'bg-emotion-happy text-white';
    case 'sad': return 'bg-emotion-sad text-white';
    case 'neutral': return 'bg-emotion-neutral text-black';
    case 'smile': return 'bg-emotion-smile text-white';
    default: return 'bg-gray-400 text-white';
  }
};

// Helper function to get icon based on emotion
export const getEmotionIcon = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy': return '😄';
    case 'sad': return '😢';
    case 'neutral': return '😐';
    case 'smile': return '😊';
    default: return '❓';
  }
};
