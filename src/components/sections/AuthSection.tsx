import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthError } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export const AuthSection = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuthError = async (error: AuthError) => {
    if (error.message.includes('Invalid login credentials')) {
      await checkEmailExists(error);
    } else if (error.message.includes('Email not confirmed')) {
      setError('Please verify your email address before signing in.');
    } else if (error.message.includes('Invalid email')) {
      setError('Invalid email format. Please check your email address.');
    } else {
      setError(error.message);
    }

    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Helper function to check if email exists
  const checkEmailExists = async (originalError: AuthError) => {
    try {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      const email = emailInput?.value || '';
      
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email,
      });
      
      if (signInError) {
        if (signInError.message.includes('Email not found') || 
            signInError.message.includes('Unable to validate email address')) {
          setError('This email is not registered. Please sign up first.');
        } else {
          setError('Invalid password. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gift">Welcome to Merris Magic</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        view="sign_in"
        showLinks={true}
        redirectTo={window.location.origin + '/dashboard'}
      />
    </div>
  );
};