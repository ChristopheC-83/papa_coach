
import React from "react";
import NavbarMobile from "./NavbarMobile";
import NavbarDesktop from "./NavbarDesktop";
import { useUserStore } from "@/store/user/useUserStore";
import { getFilteredLinks } from "@/condif/navigation";

export default function Navbar() {
  const { isAuth, user, isHydrated } = useUserStore();



  const filteredLinks = getFilteredLinks(isAuth, user?.role);

  // Si le store n'est pas encore prêt, on ne rend rien ou un squelette
  // pour éviter le "flash" de contenu non connecté
  if (!isHydrated) return null;

  return (
    <div className="bg-background text-foreground">
      <div className="hidden md:block  ">
        <NavbarDesktop links={filteredLinks} />
      </div>
      <div className="block md:hidden fixed bottom-0 left-0 w-full border-t bg-muted text-muted-foreground z-50">
        <NavbarMobile links={filteredLinks} />
      </div>
    </div>
  );
}
