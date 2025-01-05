import React from 'react';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const giftTypes = [
    {
      type: 'video',
      title: 'Video Message',
      description: 'Send a heartfelt video message with AI-suggested script',
      price: 10
    },
    {
      type: 'card',
      title: 'Digital Card',
      description: 'Create a beautiful digital card with AI-generated design',
      price: 5
    },
    {
      type: 'icon',
      title: 'Digital Icons',
      description: 'Send meaningful digital icons like roses and hearts',
      price: 5
    },
    {
      type: 'voucher',
      title: 'Gift Voucher',
      description: 'Send a gift voucher that can be redeemed',
      price: 50
    }
  ];

  const handleGiftSelect = (type: string) => {
    toast({
      title: "Coming Soon!",
      description: "This feature will be available soon. Stay tuned!",
    });
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