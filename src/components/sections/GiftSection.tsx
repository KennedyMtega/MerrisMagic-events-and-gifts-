import React from 'react';
import { Gift, Heart, Sparkles, ScrollText } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import GiftCard from '@/components/GiftCard';
import { useToast } from "@/hooks/use-toast";

export const GiftSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const giftTypes = [
    {
      type: 'video',
      title: 'Heartfelt Video',
      description: 'Create a personalized video message with AI-suggested script and your voice recording',
      price: 10,
      icon: <Heart className="w-8 h-8 text-gift animate-pulse" />
    },
    {
      type: 'card',
      title: 'Magic Card',
      description: 'Send an AI-designed digital card that captures your unique relationship',
      price: 5,
      icon: <ScrollText className="w-8 h-8 text-gift animate-gift-bounce" />
    },
    {
      type: 'charm',
      title: 'Enchanted Charms',
      description: 'Share meaningful digital charms that symbolize your special bond',
      price: 5,
      icon: <Sparkles className="w-8 h-8 text-gift animate-sparkle" />
    },
    {
      type: 'voucher',
      title: 'Magic Voucher',
      description: 'Send a custom amount gift voucher that brings joy to your loved ones',
      price: 20,
      icon: <Gift className="w-8 h-8 text-gift animate-gift-bounce" />
    }
  ];

  const handleGiftSelect = (type: string) => {
    if (type === 'video') {
      navigate('/gift/video');
    } else {
      toast({
        title: "Coming Soon!",
        description: "This gift type will be available soon.",
      });
    }
  };

  return (
    <section className="py-24">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-left text-gift mb-16">
          Choose Your Magic
          <Gift className="inline-block ml-4 animate-gift-bounce" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {giftTypes.map((gift, index) => (
            <div 
              key={gift.type}
              className="transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
              style={{
                transform: `translateZ(${index * 10}px)`,
                perspective: '1000px'
              }}
            >
              <GiftCard
                type={gift.type as any}
                title={gift.title}
                description={gift.description}
                price={gift.price}
                onClick={() => handleGiftSelect(gift.type)}
              />
              <div className="flex justify-center -mt-4">
                {gift.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
