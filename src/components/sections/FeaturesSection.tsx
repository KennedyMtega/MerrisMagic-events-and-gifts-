import React from 'react';
import { PartyPopper, Sparkles, Heart } from "lucide-react";

export const FeaturesSection = () => {
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

  return (
    <section className="py-24 bg-white/30 backdrop-blur-sm">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-right text-gift mb-16">
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
  );
};