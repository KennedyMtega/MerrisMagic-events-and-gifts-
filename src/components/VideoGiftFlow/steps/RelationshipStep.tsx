import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RelationshipStepProps {
  relationship: string;
  setRelationship: (value: string) => void;
}

export const RelationshipStep = ({ relationship, setRelationship }: RelationshipStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gift">Share Your Relationship</h2>
      <div className="space-y-2">
        <Label htmlFor="relationship">How do you know them?</Label>
        <Select value={relationship} onValueChange={setRelationship}>
          <SelectTrigger>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="colleague">Colleague</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};