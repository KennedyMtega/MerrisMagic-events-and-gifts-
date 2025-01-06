import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, Sparkles } from "lucide-react";

export const CallToAction = () => {
  const { toast } = useToast();

  return (
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
  );
};