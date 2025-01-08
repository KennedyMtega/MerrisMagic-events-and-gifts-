import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, Speaker, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceStepProps {
  voiceRecording: string | null;
  setVoiceRecording: (value: string | null) => void;
  useAIVoice: boolean;
  setUseAIVoice: (value: boolean) => void;
  message: string;
}

export const VoiceStep = ({ 
  voiceRecording, 
  setVoiceRecording, 
  useAIVoice, 
  setUseAIVoice,
  message 
}: VoiceStepProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const mediaRecorder = React.useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setVoiceRecording(reader.result);
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const generateAIVoice = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      if (data.audioUrl) {
        setVoiceRecording(data.audioUrl);
        setUseAIVoice(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI voice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Add Your Voice</h2>
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={generateAIVoice}
          disabled={isGenerating}
          className={`w-full h-24 ${useAIVoice ? "ring-2 ring-primary" : ""}`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Generating AI Voice...
            </>
          ) : (
            <>
              <Speaker className="mr-2 h-6 w-6" />
              Use AI Voice
            </>
          )}
        </Button>
        <div className="text-center">or</div>
        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          className={`w-full h-24 ${!useAIVoice && voiceRecording ? "ring-2 ring-primary" : ""}`}
        >
          <Mic className={`mr-2 h-6 w-6 ${isRecording ? "animate-pulse" : ""}`} />
          {isRecording ? "Stop Recording" : "Record Your Voice"}
        </Button>
      </div>
    </div>
  );
};