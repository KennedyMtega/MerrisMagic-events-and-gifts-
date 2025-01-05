import React from 'react';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const giftTypes = [
    {
      type: 'video',
      title: 'Heartfelt Video',
      description: 'Create a personalized video message with AI-suggested script and your voice recording',
      price: 10
    },
    {
      type: 'card',
      title: 'Magic Card',
      description: 'Send an AI-designed digital card that captures your unique relationship',
      price: 5
    },
    {
      type: 'charm',
      title: 'Enchanted Charms',
      description: 'Share meaningful digital charms that symbolize your special bond',
      price: 5
    },
    {
      type: 'voucher',
      title: 'Magic Voucher',
      description: 'Send a custom amount gift voucher that brings joy to your loved ones',
      price: 20
    }
  ];

  const handleGiftSelect = (type: string) => {
    toast({
      title: "Gift Flow Started!",
      description: `Follow these steps to send your ${type}:
        ${getGiftSteps(type)}`,
    });
  };

  const getGiftSteps = (type: string) => {
    const commonSteps = "1. Enter recipient's phone number\n2. Share your relationship\n3. Write your message";
    
    switch(type) {
      case 'video':
        return `${commonSteps}\n4. Record your voice or use AI voice\n5. Preview and customize\n6. Complete payment`;
      case 'card':
        return `${commonSteps}\n4. Choose card theme\n5. Preview AI design\n6. Complete payment`;
      case 'charm':
        return `${commonSteps}\n4. Select meaningful charms\n5. Arrange your design\n6. Complete payment`;
      case 'voucher':
        return `${commonSteps}\n4. Enter custom amount (min $20)\n5. Add special note\n6. Complete payment`;
      default:
        return commonSteps;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gift mb-4">Merris Magic</h1>
          <p className="text-lg text-gray-600">Send magical digital gifts to your loved ones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftTypes.map((gift) => (
            <GiftCard
              key={gift.type}
              type={gift.type as any}
              title={gift.title}
              description={gift.description}
              price={gift.price}
              onClick={() => handleGiftSelect(gift.type)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            className="bg-gift hover:bg-gift-dark"
            onClick={() => toast({
              title: "Welcome to Merris Magic!",
              description: "Sign up or log in to start sending magical gifts.",
            })}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;