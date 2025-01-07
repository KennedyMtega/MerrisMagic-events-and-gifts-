import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HeroSection } from '@/components/sections/HeroSection';
import { GiftingOptionsSection } from '@/components/sections/GiftingOptionsSection';
import { ComingSoonSection } from '@/components/sections/ComingSoonSection';

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
      <HeroSection />
      <GiftingOptionsSection />
      <ComingSoonSection />
    </div>
  );
};

export default Landing;