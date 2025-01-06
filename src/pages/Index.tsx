import React from 'react';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Gift, Sparkles, PartyPopper, ScrollText, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { toast } = useToast();

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

  const features = [
    {
      title: "Personalized Magic",
      description: "Create unique gifts tailored to your special relationships",
      icon: <PartyPopper className="w-12 h-12 text-gift" />
    },
    {
      title: "AI-Enhanced Creativity",
      description: "Let our AI magic help you craft the perfect message",
      icon: <Sparkles className="w-12 h-12 text-gift" />
    },
    {
      title: "Instant Joy",
      description: "Deliver happiness instantly to your loved ones",
      icon: <Heart className="w-12 h-12 text-gift" />
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
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Hero Section with 3D Scroll Effect */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container px-4 py-32 space-y-8 transform-gpu perspective-1000">
            <div className="text-center space-y-6 animate-fade-in">
              <h1 className="text-6xl font-bold text-gift mb-4 animate-gift-bounce">
                Merris Magic
                <Sparkles className="inline-block w-12 h-12 ml-4 text-accent animate-sparkle" />
              </h1>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
                Send magical digital gifts that create unforgettable moments
              </p>
              <Button 
                className="bg-gift hover:bg-gift-dark text-white px-8 py-6 text-lg rounded-full animate-pulse"
                onClick={() => toast({
                  title: "Welcome to Merris Magic!",
                  description: "Sign up or log in to start sending magical gifts.",
                })}
              >
                Start Your Magic Journey
                <Gift className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section with Scroll Animation */}
        <section className="py-24 bg-white/30 backdrop-blur-sm">
          <div className="container px-4">
            <h2 className="text-4xl font-bold text-center text-gift mb-16">
              The Magic Experience
              <PartyPopper className="inline-block ml-4 animate-bounce" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gift mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Cards Section with 3D Transform */}
        <section className="py-24">
          <div className="container px-4">
            <h2 className="text-4xl font-bold text-center text-gift mb-16">
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

        {/* Call to Action Section */}
        <section className="py-24 bg-gift/5">
          <div className="container px-4 text-center">
            <h2 className="text-4xl font-bold text-gift mb-8">
              Ready to Spread Joy?
              <Heart className="inline-block ml-4 animate-pulse" />
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join our magical community and start creating unforgettable moments for your loved ones
            </p>
            <Button 
              className="bg-gift hover:bg-gift-dark text-white px-8 py-6 text-lg rounded-full"
              onClick={() => toast({
                title: "Welcome to Merris Magic!",
                description: "Sign up or log in to start sending magical gifts.",
              })}
            >
              Get Started
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default Index;