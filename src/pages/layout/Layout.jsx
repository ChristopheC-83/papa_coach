/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUserStore } from "@/store/user/useUserStore";
import Loader from "@/components/custom/Loader";
import Navbar from "@/components/navbar/Navbar";

export default function Layout() {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((bool) => bool.isHydrated);

  if (!isHydrated) return <Loader />;

  return (
    <div className="h-dvh  w-dvw">
      <Toaster position="top-center" richColors expand={true} />
      <main className="w-dvw h-dvh flex max-md:flex-col overflow-hidden bg-background text-foreground">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
