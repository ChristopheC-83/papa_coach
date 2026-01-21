import { useUserStore } from "@/store/user/useUserStore";
import React from "react";
import { NavLink } from "react-router-dom";
import { FiTool, FiUsers } from "react-icons/fi";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

export default function NavbarMobile({ links }) {
  const { user, isHydrated } = useUserStore();
  const isCoach = user?.role === "coach";

  if (!isHydrated) return <Loader />;

  if (!user) return null;

  function getMyLinks() {
    if (user.role === "athlete")
      return links.filter((link) => link.minRole !== "coach");
    if (user.role === "coach")
      return links.filter((link) => link.minRole === "coach");
  }

  return (
    <nav className="flex justify-around py-2">
      {getMyLinks().map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className="flex flex-col items-center w-[18%]"
          >
            <Icon className="size-7" />
            <span className="text-center text-sm">{link.label}</span>
          </NavLink>
        );
      })}

      {/* LE TRIGGER DE LA SHEET : UNIQUEMENT SI COACH */}
      {isCoach && (
        <Sheet>
          <SheetTrigger className="flex flex-col items-center w-[18%]">
            <FiTool className="size-7" />
            <span className="text-center text-sm">Outils</span>
          </SheetTrigger>

          <SheetContent side="bottom" className="rounded-t-3xl h-[50vh]">
            <SheetHeader>
              <SheetTitle>Console Coach</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Tes outils de gestion ici */}
              <div className="flex flex-col items-center p-4 bg-muted rounded-xl">
                <span className="text-xs font-bold">Lien d'invitation</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
}