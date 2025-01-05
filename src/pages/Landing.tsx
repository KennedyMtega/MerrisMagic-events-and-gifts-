import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold text-gift mb-6">Merris Magic</h1>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Send magical digital gifts that create lasting connections
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Heartfelt Videos",
              description: "Create AI-enhanced video messages with your voice"
            },
            {
              title: "Magic Cards",
              description: "Send beautifully designed digital cards"
            },
            {
              title: "Gift Vouchers",
              description: "Share the joy with customizable gift amounts"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold text-gift mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Auth Section */}
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'apple']}
            theme="light"
            socialLayout="horizontal"
            redirectTo={window.location.origin + '/dashboard'}
          />
        </div>
      </section>

      {/* Animated Gift Section */}
      <div className="fixed bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="flex justify-around items-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gift rounded-lg animate-gift-bounce"
              style={{ 
                animationDelay: `${i * 0.3}s`,
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;