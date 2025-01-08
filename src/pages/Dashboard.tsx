import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gift mb-4">Merris Magic</h1>
            <p className="text-lg text-gray-600">Send magical digital gifts to your loved ones</p>
          </div>
          <Button 
            variant="outline"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
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
      </div>
    </div>
  );
};

export default Dashboard;