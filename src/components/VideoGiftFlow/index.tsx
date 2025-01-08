import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Step = 'recipient' | 'relationship' | 'message' | 'voice' | 'preview' | 'payment';

const VideoGiftFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('recipient');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    relationship: '',
    message: '',
    useAIVoice: false,
    voiceRecording: null as File | null,
  });

  const handleNext = () => {
    switch (currentStep) {
      case 'recipient':
        if (!formData.phoneNumber) {
          toast({
            title: "Required Field",
            description: "Please enter recipient's phone number",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep('relationship');
        break;
      case 'relationship':
        if (!formData.relationship) {
          toast({
            title: "Required Field",
            description: "Please specify your relationship",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep('message');
        break;
      case 'message':
        if (!formData.message) {
          toast({
            title: "Required Field",
            description: "Please write or generate a message",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep('voice');
        break;
      case 'voice':
        if (!formData.useAIVoice && !formData.voiceRecording) {
          toast({
            title: "Required Field",
            description: "Please record your voice or choose AI voice",
            variant: "destructive",
          });
          return;
        }
        setCurrentStep('preview');
        break;
      case 'preview':
        setCurrentStep('payment');
        break;
      case 'payment':
        // Handle payment completion
        toast({
          title: "Success!",
          description: "Your video gift has been sent!",
        });
        navigate('/dashboard');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'relationship':
        setCurrentStep('recipient');
        break;
      case 'message':
        setCurrentStep('relationship');
        break;
      case 'voice':
        setCurrentStep('message');
        break;
      case 'preview':
        setCurrentStep('voice');
        break;
      case 'payment':
        setCurrentStep('preview');
        break;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'recipient':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Enter Recipient's Details</h2>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>
        );
      case 'relationship':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Share Your Relationship</h2>
            <div className="space-y-2">
              <Label htmlFor="relationship">How do you know them?</Label>
              <Input
                id="relationship"
                placeholder="e.g., Best friend, Sister, Colleague"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              />
            </div>
          </div>
        );
      case 'message':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Write Your Message</h2>
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Write your heartfelt message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "AI Message Generation",
                    description: "This feature will be implemented soon!",
                  });
                }}
              >
                Generate with AI
              </Button>
            </div>
          </div>
        );
      case 'voice':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Add Your Voice</h2>
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setFormData({ ...formData, useAIVoice: true })}
                className={formData.useAIVoice ? "ring-2 ring-primary" : ""}
              >
                Use AI Voice
              </Button>
              <div className="text-center">or</div>
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Voice Recording",
                    description: "This feature will be implemented soon!",
                  });
                }}
              >
                Record Your Voice
              </Button>
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Preview Your Gift</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>Preview will be implemented soon!</p>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gift">Complete Payment</h2>
            <div className="space-y-4">
              <Button className="w-full" onClick={() => {
                toast({
                  title: "Card Payment",
                  description: "Payment processing will be implemented soon!",
                });
              }}>
                Pay with Card ($10)
              </Button>
              <Button variant="outline" className="w-full opacity-50 cursor-not-allowed">
                Pay with Wallet (Coming Soon)
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="container max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {renderStep()}
          <div className="flex justify-between pt-4">
            {currentStep !== 'recipient' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button 
              className={currentStep === 'recipient' ? 'w-full' : 'ml-auto'}
              onClick={handleNext}
            >
              {currentStep === 'payment' ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGiftFlow;