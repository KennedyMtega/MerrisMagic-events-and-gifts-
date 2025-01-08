import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RecipientStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
}

export const RecipientStep = ({ phoneNumber, setPhoneNumber }: RecipientStepProps) => {
  const { toast } = useToast();

  const checkRecipient = async (phone: string) => {
    const { data: recipient } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone_number', phone)
      .maybeSingle();

    if (!recipient) {
      toast({
        title: "Recipient Not Found",
        description: "The recipient will receive a link to create an account and claim their gift.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Enter Recipient's Details</h2>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (e.target.value.length >= 10) {
              checkRecipient(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};