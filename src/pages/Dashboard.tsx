import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import GiftCard from '@/components/GiftCard';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Gift, Settings, Sun, Moon } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  // Fetch wallet
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const { data } = await supabase
        .from('wallets')
        .select('*')
        .single();
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

  const giftTypes = [
    {
      type: 'video',
      title: 'Heartfelt Video',
      description: 'Create a personalized video message with AI-suggested script and your voice recording',
      price: 10
    },
    {
      type: 'card',
      title: 'Magic Card',
      description: 'Send an AI-designed digital card that captures your unique relationship',
      price: 5
    },
    {
      type: 'charm',
      title: 'Enchanted Charms',
      description: 'Share meaningful digital charms that symbolize your special bond',
      price: 5
    },
    {
      type: 'voucher',
      title: 'Magic Voucher',
      description: 'Send a custom amount gift voucher that brings joy to your loved ones',
      price: null
    }
  ];

  const handleGiftSelect = (type: string) => {
    if (type === 'video') {
      navigate('/gift/video/create');
    } else {
      toast({
        title: "Coming Soon!",
        description: "This gift type will be available soon.",
      });
    }
  };

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

          <TabsContent value="gifts" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftTypes.map((gift) => (
                <GiftCard
                  key={gift.type}
                  type={gift.type as any}
                  title={gift.title}
                  description={gift.description}
                  price={gift.price}
                  onClick={() => handleGiftSelect(gift.type)}
                />
              ))}
            </div>

            {sentGifts && sentGifts.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Sent Gifts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sentGifts.map((gift) => (
                    <Card key={gift.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold capitalize">{gift.type} Gift</p>
                          <p className="text-sm text-gray-500">Sent to: {gift.recipient_phone}</p>
                          <p className="text-sm text-gray-500">Status: {gift.status}</p>
                        </div>
                        {gift.amount && (
                          <p className="font-semibold">${gift.amount}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wallet" className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Wallet</h2>
              <p className="text-4xl font-bold mb-6">${wallet?.balance || '0.00'}</p>
              <Button className="w-full">Add Funds</Button>
            </Card>

            {transactions && transactions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Transactions</h3>
                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <Card key={tx.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{tx.description || tx.transaction_type}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(tx.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive gift updates via email</p>
                  </div>
                  <Button variant="outline">
                    {profile?.email_notifications ? 'Disable' : 'Enable'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive gift updates via SMS</p>
                  </div>
                  <Button variant="outline">
                    {profile?.sms_notifications ? 'Disable' : 'Enable'}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Theme</p>
                    <p className="text-sm text-gray-500">Choose your preferred theme</p>
                  </div>
                  <Button variant="outline" onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;