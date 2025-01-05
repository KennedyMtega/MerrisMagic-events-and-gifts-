import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Gift, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GiftCreatorProps {
  type: 'video' | 'card' | 'charm' | 'voucher';
  onSubmit: (data: any) => void;
}

const GiftCreator = ({ type, onSubmit }: GiftCreatorProps) => {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'voucher' && amount < 20) {
      toast({
        title: "Invalid Amount",
        description: "Voucher amount must be at least $20",
        variant: "destructive"
      });
      return;
    }
    onSubmit({ recipient, relationship, message, amount });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Recipient's Phone</label>
        <Input
          type="tel"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient's phone number"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Relationship</label>
        <Input
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="e.g., Friend, Family, Partner"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your heartfelt message..."
          required
        />
      </div>

      {type === 'voucher' && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (Min: $20)</label>
          <Input
            type="number"
            min="20"
            max="3000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <Button type="submit" className="w-full bg-gift hover:bg-gift-dark">
        <Gift className="mr-2 h-4 w-4" />
        Send Gift
      </Button>
    </form>
  );
};

export default GiftCreator;