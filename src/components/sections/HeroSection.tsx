import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Gift, Sparkles } from "lucide-react";

export const HeroSection = () => {
  const { toast } = useToast();

  return (
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
  );
};