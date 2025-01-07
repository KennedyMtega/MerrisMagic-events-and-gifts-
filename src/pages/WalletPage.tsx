import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, CreditCard, History, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WalletPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    const { data: wallet, error } = await supabase
      .from('wallets')
      .select('balance')
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Could not fetch wallet balance",
        variant: "destructive"
      });
      return;
    }

    if (wallet) {
      setBalance(wallet.balance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gift">My Wallet</h1>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Current Balance</h2>
              <Wallet className="w-8 h-8 text-gift" />
            </div>
            <p className="text-4xl font-bold text-gift">${balance.toFixed(2)}</p>
            <Button className="mt-4 w-full bg-gift hover:bg-gift-dark" onClick={() => navigate('/add-funds')}>
              <Plus className="mr-2 h-4 w-4" /> Add Funds
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Payment Methods</h2>
              <CreditCard className="w-8 h-8 text-gift" />
            </div>
            <Button className="w-full" variant="outline" onClick={() => navigate('/payment-methods')}>
              Manage Payment Methods
            </Button>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gift mb-4">Transaction History</h2>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Recent Transactions</h3>
              <History className="w-6 h-6 text-gift" />
            </div>
            {/* Transaction list will be implemented later */}
            <p className="text-gray-600">No recent transactions</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;