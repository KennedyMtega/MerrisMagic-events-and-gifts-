import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { GiftSection } from '@/components/sections/GiftSection';
import { CallToAction } from '@/components/sections/CallToAction';

const Index = () => {
  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Top-left to top-right: Hero Section */}
        <HeroSection />
        
        {/* Diagonal to bottom-left: Features Section */}
        <FeaturesSection />
        
        {/* Bottom-left to bottom-right: Gift Section */}
        <GiftSection />
        
        {/* Final CTA */}
        <CallToAction />
      </div>
    </ScrollArea>
  );
};

export default Index;