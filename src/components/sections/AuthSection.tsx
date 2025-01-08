import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from '@supabase/supabase-js';

export const AuthSection = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setError(null);
      }
      if (event === 'SIGNED_OUT') {
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enhanced error handling function
  const handleAuthError = (err: AuthError) => {
    if (err instanceof AuthApiError) {
      switch (err.status) {
        case 400:
          if (err.message.includes('Email not confirmed')) {
            setError('Please verify your email address before signing in.');
          } else if (err.message.includes('Invalid login credentials')) {
            // Check if the email exists first
            checkEmailExists(err);
          } else {
            setError(err.message);
          }
          break;
        case 422:
          setError('Invalid email format. Please check your email address.');
          break;
        default:
          setError('An error occurred during authentication. Please try again.');
      }
    } else {
      setError(err.message);
    }
  };

  // Helper function to check if email exists
  const checkEmailExists = async (originalError: AuthError) => {
    try {
      const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
      const email = emailInput?.value || '';
      
      // First check if the email exists using passwordless sign in
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email,
      });
      
      if (signInError) {
        if (signInError.message.includes('Email not found') || 
            signInError.message.includes('Unable to validate email address')) {
          setError('This email is not registered. Please sign up first.');
        } else {
          // If we get here, the email exists but the password was wrong
          setError('Invalid password. Please try again.');
        }
      }
    } catch {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
            message: {
              color: 'red',
            },
          },
        }}
        providers={[]}
        view="sign_in"
        showLinks={true}
        redirectTo={window.location.origin + '/dashboard'}
        onError={handleAuthError}
      />
    </div>
  );
};