
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud } from 'lucide-react';

interface UploadImageProps {
  onImageSelected: (imageData: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer bg-accent/50">
      <CardContent className="p-6 flex flex-col items-center justify-center" onClick={triggerFileInput}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        <UploadCloud className="h-10 w-10 text-primary/70 mb-3" />
        
        <div className="text-center space-y-2">
          <h3 className="font-medium">Upload an image</h3>
          <p className="text-sm text-muted-foreground">Click to browse or drag and drop</p>
        </div>
        
        <Button variant="outline" className="mt-4">
          Select image
        </Button>
      </CardContent>
    </Card>
  );
};

export default UploadImage;
