import React from 'react';
import { Gift, Sparkles } from "lucide-react";
import { AuthSection } from './AuthSection';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container px-4 py-32 space-y-8 relative z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-7xl font-bold text-gift mb-4">
            Share Joy Through
            <br />
            Digital Magic
            <Sparkles className="inline-block w-16 h-16 ml-4 text-accent animate-sparkle" />
          </h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create unforgettable moments with AI-powered video messages, 
            magical digital cards, and meaningful virtual gifts that touch hearts across distances.
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <AuthSection />
          </div>
        </div>
      </div>
    </section>
  );
};