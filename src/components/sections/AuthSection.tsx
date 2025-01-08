import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from '@supabase/supabase-js';

export const AuthSection = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setError(null);
      }
      if (event === 'SIGNED_OUT') {
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle auth state changes and errors
  const handleAuthError = (err: AuthError) => {
    if (err.message.includes('Invalid login credentials')) {
      setError('Invalid email or password. Please try again.');
    } else if (err.message.includes('Email not confirmed')) {
      setError('Please verify your email address before signing in.');
    } else {
      setError(err.message);
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
      />
    </div>
  );
};