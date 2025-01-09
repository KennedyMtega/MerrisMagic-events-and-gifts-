import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";

interface WalletSectionProps {
  wallet: Tables<"wallets"> | null;
  transactions: Tables<"wallet_transactions">[] | null;
}

export const WalletSection: React.FC<WalletSectionProps> = ({ wallet, transactions }) => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};