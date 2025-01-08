import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Steps } from "@/components/ui/steps";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RecipientStep } from './steps/RecipientStep';
import { RelationshipStep } from './steps/RelationshipStep';
import { MessageStep } from './steps/MessageStep';
import { VoiceStep } from './steps/VoiceStep';
import { PreviewStep } from './steps/PreviewStep';
import { PaymentStep } from './steps/PaymentStep';

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
    voiceRecording: null as string | null,
    theme: 'romantic'
  });

  const steps = [
    "Recipient Details",
    "Relationship",
    "Message",
    "Voice",
    "Preview",
    "Payment"
  ];

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('gifts').insert({
        sender_id: user.id,
        recipient_phone: formData.phoneNumber,
        type: 'video',
        message: formData.message,
        metadata: {
          relationship: formData.relationship,
          voice_recording: formData.voiceRecording,
          theme: formData.theme,
          use_ai_voice: formData.useAIVoice
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your video gift has been sent!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send gift. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'recipient':
        return (
          <RecipientStep
            phoneNumber={formData.phoneNumber}
            setPhoneNumber={(value) => setFormData({ ...formData, phoneNumber: value })}
          />
        );
      case 'relationship':
        return (
          <RelationshipStep
            relationship={formData.relationship}
            setRelationship={(value) => setFormData({ ...formData, relationship: value })}
          />
        );
      case 'message':
        return (
          <MessageStep
            message={formData.message}
            setMessage={(value) => setFormData({ ...formData, message: value })}
            relationship={formData.relationship}
          />
        );
      case 'voice':
        return (
          <VoiceStep
            voiceRecording={formData.voiceRecording}
            setVoiceRecording={(value) => setFormData({ ...formData, voiceRecording: value })}
            useAIVoice={formData.useAIVoice}
            setUseAIVoice={(value) => setFormData({ ...formData, useAIVoice: value })}
            message={formData.message}
          />
        );
      case 'preview':
        return (
          <PreviewStep
            message={formData.message}
            voiceRecording={formData.voiceRecording}
            theme={formData.theme}
            setTheme={(value) => setFormData({ ...formData, theme: value })}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            onComplete={handleComplete}
            amount={10}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['recipient', 'relationship', 'message', 'voice', 'preview', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['recipient', 'relationship', 'message', 'voice', 'preview', 'payment'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="container max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <Steps currentStep={steps.indexOf(currentStep) + 1} steps={steps} className="mb-8" />
          {renderStep()}
          <div className="flex justify-between pt-4">
            {currentStep !== 'recipient' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button 
              className={currentStep === 'recipient' ? 'w-full' : 'ml-auto'}
              onClick={currentStep === 'payment' ? handleComplete : handleNext}
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