import { ModeToggle } from "@/components/provider/ModeToggle";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="bg-primary-foreground text-destructive">Home</div>
      <ModeToggle />
    </>
  );
}
