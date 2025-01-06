import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gift">Merris Magic</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gift hover:bg-gift-dark text-white">
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Welcome to Merris Magic</DialogTitle>
              <DialogDescription>
                Join our magical community to start sending heartfelt digital gifts
              </DialogDescription>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#FF69B4',
                    color: 'white',
                  },
                  anchor: {
                    color: '#FF69B4',
                  },
                },
              }}
              providers={[]}
              view="phone_sign_in"
              showLinks={false}
              redirectTo={window.location.origin + '/dashboard'}
            />
          </DialogContent>
        </Dialog>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-gift mb-8 animate-fade-in">
            Share Joy Through Digital Magic
          </h2>
          <p className="text-2xl text-gray-600 mb-12 animate-fade-in delay-200">
            Create unforgettable moments with personalized digital gifts that touch hearts and spark smiles
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Heartfelt Videos",
              description: "Create personalized video messages enhanced with AI magic that capture your genuine emotions",
              animation: "fade-in"
            },
            {
              title: "Magic Cards",
              description: "Send beautifully designed digital cards that transform into magical experiences",
              animation: "fade-in delay-200"
            },
            {
              title: "Digital Charms",
              description: "Share meaningful digital charms that symbolize your special connection",
              animation: "fade-in delay-400"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-${feature.animation}`}
            >
              <h3 className="text-2xl font-semibold text-gift mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gift mb-16">How Merris Magic Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Choose Your Gift",
              description: "Select from our magical collection of digital gifts"
            },
            {
              step: "2",
              title: "Personalize",
              description: "Add your personal touch with messages and customizations"
            },
            {
              step: "3",
              title: "Enhance with AI",
              description: "Let our AI magic enhance your gift's presentation"
            },
            {
              step: "4",
              title: "Share the Joy",
              description: "Send your magical gift to your loved ones"
            }
          ].map((step, index) => (
            <div 
              key={index}
              className="text-center p-6 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-12 h-12 bg-gift text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gift mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <h2 className="text-4xl font-bold text-center text-gift mb-16">Magical Moments Shared</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The digital charm bracelet I sent my sister was perfect! She loved how personal it felt.",
              author: "Sarah M."
            },
            {
              quote: "Creating an AI-enhanced video message for my mom's birthday was incredibly special.",
              author: "Michael R."
            },
            {
              quote: "The magic cards are beautiful! They make every occasion feel extra special.",
              author: "Emma L."
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
              <p className="text-gift font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;