import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';

export const AuthSection = () => {
  return (
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
      view="sign_in"
      otherMethods={['phone']}
      showLinks={true}
      redirectTo={window.location.origin + '/dashboard'}
    />
  );
};