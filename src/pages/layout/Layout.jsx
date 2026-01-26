/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useUserStore } from "@/store/user/useUserStore";
import Loader from "@/components/custom/Loader";
import Navbar from "@/components/navbar/Navbar";
import Title from "@/components/custom/Title";
import { FiActivity } from "react-icons/fi";

export default function Layout() {
  const user = useUserStore((state) => state.user);
  const isHydrated = useUserStore((bool) => bool.isHydrated);

  if (!isHydrated) return <Loader />;

  return (
    <div className="min-h-dvh  w-vw overflow-hidden">
      <Toaster position="top-center" richColors expand={false} />
      <main className="w-vw min-h-dvh flex max-md:flex-col md:pl-44 md:pr-3 overflow-hidden bg-background text-foreground ">
        <Navbar />
        <div className="flex flex-col w-full">
          <Title
            title="A.R.C."
            subtitle="Analyse et Relation de Coaching"
            iconTitle={<FiActivity />}
          />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
