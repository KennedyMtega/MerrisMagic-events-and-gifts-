import React from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentStepProps {
  onComplete: () => void;
  amount: number;
}

export const PaymentStep = ({ onComplete, amount }: PaymentStepProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleCardPayment = async () => {
    setIsProcessing(true);
    try {
      // Process payment logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated payment
      onComplete();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Complete Payment</h2>
      <div className="space-y-4">
        <Button 
          className="w-full h-16" 
          onClick={handleCardPayment}
          disabled={isProcessing}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Pay with Card (${amount})
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-16 opacity-50 cursor-not-allowed"
          disabled
        >
          <Wallet className="mr-2 h-5 w-5" />
          Pay with Wallet (Coming Soon)
        </Button>
      </div>
    </div>
  );
};