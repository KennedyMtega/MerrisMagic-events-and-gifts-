import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";

interface SettingsSectionProps {
  profile: Tables<"profiles"> | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ profile, theme, toggleTheme }) => {
  return (
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
  );
};