import React from 'react'

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LuDumbbell } from "react-icons/lu";
import { LuTrophy } from "react-icons/lu";
export default function RoleSelector({ value, onChange }) {

    const roles_options = [
      {
        id: "athlete",
        label: "Athlète",
        icon: <LuDumbbell className="mb-3 h-6 w-6" />,
      },
      {
        id: "coach",
        label: "Coach",
        icon: <LuTrophy className="mb-3 h-6 w-6" />,
      },
    ];

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange} 
      className="grid grid-cols-2 gap-4 my-6"
    >
      {roles_options.map((role) => (
        <div key={role.id}>
          <RadioGroupItem
            value={role.id}
            id={role.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={role.id}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
          >
            {role.icon}
            <span className="font-semibold">{role.label}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
