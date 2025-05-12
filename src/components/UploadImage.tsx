
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, Camera as CameraIcon, RefreshCcw, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface UploadImageProps {
  onImageSelected: (imageData: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageData = event.target.result as string;
        setCapturedImage(imageData);
        onImageSelected(imageData);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsUsingCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera. Please check permissions.');
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsUsingCamera(false);
    }
  };
  
  const takePhoto = () => {
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
        onImageSelected(imageData);
        stopCamera();
      }
    }
  };
  
  const resetProcess = () => {
    setCapturedImage(null);
    stopCamera();
  };
  
  // Clean up camera stream when component unmounts
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  return (
    <Card className={`border-dashed border-2 hover:border-primary transition-colors ${!isUsingCamera && !capturedImage ? 'cursor-pointer' : ''} bg-accent/50`}>
      <CardContent className="p-6 flex flex-col items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <canvas ref={canvasRef} className="hidden" />
        
        {isUsingCamera && (
          <div className="relative w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-md"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/50 rounded-full p-3">
                <Button 
                  onClick={takePhoto} 
                  variant="default"
                  size="icon"
                  className="rounded-full h-12 w-12 flex items-center justify-center bg-white border-4 border-primary"
                >
                  <Check className="h-6 w-6 text-primary" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={stopCamera} size="sm" className="flex items-center gap-2">
                <X size={18} />
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        {capturedImage && (
          <div className="w-full">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full rounded-md mb-4"
            />
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={resetProcess} className="flex items-center gap-2">
                <RefreshCcw size={18} />
                Take New Photo
              </Button>
            </div>
          </div>
        )}
        
        {!isUsingCamera && !capturedImage && (
          <div onClick={triggerFileInput} className="w-full flex flex-col items-center">
            <UploadCloud className="h-10 w-10 text-primary/70 mb-3" />
            
            <div className="text-center space-y-2">
              <h3 className="font-medium">Upload an image</h3>
              <p className="text-sm text-muted-foreground">Click to browse or drag and drop</p>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                Select image
              </Button>
              <Button 
                variant="default" 
                className="flex items-center gap-2" 
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
              >
                <CameraIcon size={18} />
                Use Camera
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadImage;
