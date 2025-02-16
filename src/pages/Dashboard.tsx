
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Gift, Settings, Sun, Moon } from "lucide-react";
import { GiftsSection } from '@/components/dashboard/GiftsSection';
import { WalletSection } from '@/components/dashboard/WalletSection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile;
    },
  });

  // Fetch wallet with maybeSingle() to handle no results case
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const { data } = await supabase
        .from('wallets')
        .select('*')
        .maybeSingle();
      return data;
    },
  });

  // Fetch transactions
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await supabase
        .from('wallet_transactions')
        .select('*')
        .order('created_at', { ascending: false });
      return data;
    },
  });

  // Fetch sent gifts
  const { data: sentGifts } = useQuery({
    queryKey: ['sent-gifts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('gifts')
        .select('*')
        .order('created_at', { ascending: false });
      return data;
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gift mb-4">Welcome, {profile?.username || 'Friend'}!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Send magical digital gifts to your loved ones</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="gifts" className="space-y-8">
          <TabsList>
            <TabsTrigger value="gifts">
              <Gift className="mr-2 h-4 w-4" />
              Gifts
            </TabsTrigger>
            <TabsTrigger value="wallet">
              <Wallet className="mr-2 h-4 w-4" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gifts">
            <GiftsSection sentGifts={sentGifts} />
          </TabsContent>

          <TabsContent value="wallet">
            <WalletSection wallet={wallet} transactions={transactions} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsSection 
              profile={profile}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
