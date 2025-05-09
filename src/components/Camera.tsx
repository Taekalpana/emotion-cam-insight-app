
import React, { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera as CameraIcon, UploadCloud, RefreshCcw } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useEmotions } from '@/lib/emotions';
import { toast } from 'sonner';

interface CameraProps {
  onImageCaptured: (result: any) => void;
}

const Camera: React.FC<CameraProps> = ({ onImageCaptured }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { user } = useAuth();
  const { detectEmotion, isLoading } = useEmotions();
  
  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera. Please check permissions.');
    }
  }, []);
  
  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
    }
  }, [stream]);
  
  // Capture photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);
  
  // Reset camera
  const resetCamera = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);
  
  // Analyze emotion
  const analyzeEmotion = useCallback(async () => {
    if (capturedImage && user) {
      try {
        const result = await detectEmotion(capturedImage, user.id, user.email);
        onImageCaptured(result);
      } catch (error) {
        console.error('Error analyzing emotion:', error);
      }
    }
  }, [capturedImage, user, detectEmotion, onImageCaptured]);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          if (isActive) stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Initialize camera on mount if supported
  React.useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      startCamera();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera, stream]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-inner">
        {isActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}
        
        {capturedImage && (
          <img 
            src={capturedImage} 
            alt="Captured" 
            className="w-full h-full object-cover"
          />
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mt-4 w-full">
        {!capturedImage && isActive && (
          <Button 
            onClick={capturePhoto}
            className="flex items-center gap-2"
          >
            <CameraIcon className="h-4 w-4" />
            Capture Photo
          </Button>
        )}
        
        {!capturedImage && (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Image
            </Button>
          </div>
        )}
        
        {capturedImage && (
          <>
            <Button 
              onClick={resetCamera}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Take New Photo
            </Button>
            
            <Button 
              onClick={analyzeEmotion} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Emotion'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Camera;
