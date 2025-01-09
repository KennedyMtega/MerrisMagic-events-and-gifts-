import React from 'react';
import { Card } from "@/components/ui/card";
import GiftCard from '@/components/GiftCard';
import { Tables } from "@/integrations/supabase/types";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface GiftsSectionProps {
  sentGifts: Tables<"gifts">[] | null;
}

export const GiftsSection: React.FC<GiftsSectionProps> = ({ sentGifts }) => {
  const navigate = useNavigate();
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
      price: null
    }
  ];

  const handleGiftSelect = (type: string) => {
    if (type === 'video') {
      navigate('/gift/video/create');
    } else {
      toast({
        title: "Coming Soon!",
        description: "This gift type will be available soon.",
      });
    }
  };

  return (
    <div className="space-y-8">
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

      {sentGifts && sentGifts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Sent Gifts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sentGifts.map((gift) => (
              <Card key={gift.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold capitalize">{gift.type} Gift</p>
                    <p className="text-sm text-gray-500">Sent to: {gift.recipient_phone}</p>
                    <p className="text-sm text-gray-500">Status: {gift.status}</p>
                  </div>
                  {gift.amount && (
                    <p className="font-semibold">${gift.amount}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};