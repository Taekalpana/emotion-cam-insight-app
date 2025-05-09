
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Camera, Smile, Frown, Meh, ArrowDown } from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-app">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="max-w-3xl w-full hero-card rounded-xl p-6 md:p-10 shadow-lg">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/20 p-4 rounded-full">
                <Camera className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">EmotionCam Insight</h1>
            <p className="text-lg text-muted-foreground">
              Analyze facial expressions in real-time with our advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <FeaturedCard 
              icon={<Smile className="h-8 w-8 text-emotion-happy" />}
              title="Happiness Detection"
              description="Detect smiles and moments of joy in photos"
            />
            <FeaturedCard 
              icon={<Frown className="h-8 w-8 text-emotion-sad" />}
              title="Sadness Analysis"
              description="Identify signs of sadness for more empathetic interactions"
            />
            <FeaturedCard 
              icon={<Meh className="h-8 w-8 text-emotion-neutral" />}
              title="Neutral Expression"
              description="Recognize neutral emotions and facial expressions"
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Button 
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate(user ? '/dashboard' : '/login')}
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <div className="mt-8 flex justify-center animate-bounce">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1} 
              title="Take a Photo" 
              description="Capture an image using your camera or upload from your device"
            />
            <StepCard 
              number={2} 
              title="AI Analysis" 
              description="Our advanced AI analyzes facial expressions in seconds"
            />
            <StepCard 
              number={3} 
              title="Get Results" 
              description="View the detected emotion with detailed confidence scores"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured card component
const FeaturedCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ 
  icon, title, description 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-accent">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// Step card component
const StepCard: React.FC<{ number: number; title: string; description: string }> = ({ 
  number, title, description 
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mb-4">
        {number}
      </div>
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
