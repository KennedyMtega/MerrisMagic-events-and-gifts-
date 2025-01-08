import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PreviewStepProps {
  message: string;
  voiceRecording: string | null;
  theme: string;
  setTheme: (value: string) => void;
}

export const PreviewStep = ({ message, voiceRecording, theme, setTheme }: PreviewStepProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const generatePreview = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          voiceRecording,
          theme 
        }),
      });
      
      const data = await response.json();
      if (data.videoUrl) {
        setPreviewUrl(data.videoUrl);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate preview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  React.useEffect(() => {
    generatePreview();
  }, [theme]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Preview Your Gift</h2>
      <div className="space-y-4">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {isGenerating ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : previewUrl ? (
            <video 
              src={previewUrl} 
              controls 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Preview not available
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="romantic">Romantic</SelectItem>
              <SelectItem value="cheerful">Cheerful</SelectItem>
              <SelectItem value="elegant">Elegant</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};