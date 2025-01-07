import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AuthSection = () => {
  return (
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
        />
      </DialogContent>
    </Dialog>
  );
};