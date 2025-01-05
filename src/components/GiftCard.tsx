import React from 'react';
import { Card } from "@/components/ui/card";
import { Gift, Heart, MessageCircle, Sparkles } from "lucide-react";

interface GiftCardProps {
  type: 'video' | 'card' | 'charm' | 'voucher';
  title: string;
  description: string;
  price: number;
  onClick: () => void;
}

const GiftCard = ({ type, title, description, price, onClick }: GiftCardProps) => {
  const icons = {
    video: <MessageCircle className="w-6 h-6 text-gift" />,
    card: <Gift className="w-6 h-6 text-gift" />,
    charm: <Sparkles className="w-6 h-6 text-gift" />,
    voucher: <Gift className="w-6 h-6 text-gift" />
  };

  return (
    <Card 
      className="relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          {icons[type]}
          {type !== 'voucher' && (
            <span className="text-sm font-semibold text-gift">${price}</span>
          )}
          {type === 'voucher' && (
            <span className="text-sm font-semibold text-gift">Custom</span>
          )}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-10">
          <div className="animate-gift-wrap">
            {icons[type]}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GiftCard;