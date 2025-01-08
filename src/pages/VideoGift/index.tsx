import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mic, PlayCircle, CreditCard, Wallet } from "lucide-react";
import { Steps } from "@/components/ui/steps";

interface GiftData {
  recipientPhone: string;
  relationship: string;
  message: string;
  useAIVoice: boolean;
  voiceRecording?: string;
}

const VideoGift = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [giftData, setGiftData] = useState<GiftData>({
    recipientPhone: '',
    relationship: '',
    message: '',
    useAIVoice: false
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    "Recipient Details",
    "Message",
    "Voice",
    "Preview",
    "Payment"
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateAIMessage = async () => {
    toast({
      title: "Generating message...",
      description: "Our AI is crafting a personalized message based on your relationship."
    });
    // TODO: Implement AI message generation
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient's Phone Number</label>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={giftData.recipientPhone}
                onChange={(e) => setGiftData({ ...giftData, recipientPhone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Relationship</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={giftData.relationship}
                onChange={(e) => setGiftData({ ...giftData, relationship: e.target.value })}
              >
                <option value="">Select relationship</option>
                <option value="friend">Friend</option>
                <option value="family">Family</option>
                <option value="partner">Partner</option>
                <option value="colleague">Colleague</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Message</label>
              <Textarea
                placeholder="Write your heartfelt message..."
                value={giftData.message}
                onChange={(e) => setGiftData({ ...giftData, message: e.target.value })}
                className="h-32"
              />
            </div>
            <Button onClick={generateAIMessage} variant="outline" className="w-full">
              Generate AI Message
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <Button 
                variant="outline" 
                className="h-24"
                onClick={() => setGiftData({ ...giftData, useAIVoice: false })}
              >
                <Mic className="mr-2 h-6 w-6" />
                Record Your Voice
              </Button>
              <Button 
                variant="outline" 
                className="h-24"
                onClick={() => setGiftData({ ...giftData, useAIVoice: true })}
              >
                <PlayCircle className="mr-2 h-6 w-6" />
                Use AI Voice
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-medium mb-2">Preview</h3>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Customize Theme
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <Button className="w-full h-16" variant="outline">
              <CreditCard className="mr-2 h-5 w-5" />
              Pay with Card
            </Button>
            <Button className="w-full h-16" variant="outline" disabled>
              <Wallet className="mr-2 h-5 w-5" />
              Pay with Wallet (Coming Soon)
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Video Gift</h1>
        <p className="text-muted-foreground">Share your love with a personalized video message</p>
      </div>

      <Steps currentStep={currentStep} steps={steps} className="mb-8" />

      <div className="bg-card rounded-lg p-6 shadow-sm">
        {renderStep()}

        <div className="flex justify-between mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoGift;