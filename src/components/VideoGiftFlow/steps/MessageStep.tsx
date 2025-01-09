import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MessageStepProps {
  message: string;
  setMessage: (value: string) => void;
  relationship: string;
}

export const MessageStep = ({ message, setMessage, relationship }: MessageStepProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateMessage = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-message', {
        body: { relationship }
      });
      
      if (error) throw error;
      if (data.message) {
        setMessage(data.message);
        toast({
          title: "Message Generated",
          description: "AI has created a heartfelt message for you. Feel free to edit it!",
        });
      }
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: "Error",
        description: "Failed to generate message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Write Your Message</h2>
      <div className="space-y-2">
        <Label htmlFor="message">Your Message</Label>
        <Textarea
          id="message"
          placeholder="Write your heartfelt message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-32"
        />
        <Button 
          variant="outline" 
          onClick={generateMessage}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate with AI'
          )}
        </Button>
      </div>
    </div>
  );
};