import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Gift, Video, Sparkles } from "lucide-react";

const GiftGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const giftCategories = [
    {
      title: "Video Messages",
      description: "Create AI-enhanced video messages",
      items: [
        { type: 'video', title: 'Birthday Wishes', description: 'Special birthday video message with AI effects', price: 15 },
        { type: 'video', title: 'Anniversary Love', description: 'Romantic anniversary video with animations', price: 20 },
        { type: 'video', title: 'Congratulations', description: 'Celebratory video with confetti effects', price: 12 },
      ]
    },
    {
      title: "Digital Cards",
      description: "Send interactive digital cards",
      items: [
        { type: 'card', title: 'Magical Birthday', description: 'Interactive birthday card with animations', price: 5 },
        { type: 'card', title: 'Love Notes', description: 'Romantic digital card with hearts', price: 5 },
        { type: 'card', title: 'Thank You', description: 'Gratitude card with floating elements', price: 4 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gift">Gift Gallery</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {giftCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold text-gift mb-6">{category.title}</h2>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <GiftCard
                  key={itemIndex}
                  type={item.type as any}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onClick={() => navigate(`/gift/${item.type}/${itemIndex}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftGallery;