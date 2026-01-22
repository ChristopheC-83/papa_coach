import { useUserStore } from "@/store/user/useUserStore";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiTool, FiActivity } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { coachTools } from "@/condif/navigation";

export default function NavbarMobile({ links }) {
  const [isOpen, setIsOpen] = useState(false);
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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="flex flex-col items-center w-[18%] text-foreground"
              onClick={() => setIsOpen(true)}
            >
              <FiTool className="size-7" />
              <span className="text-center text-sm">Outils</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-3xl h-[50vh]"
            aria-describedby="menu coach"
          >
            <SheetHeader>
              <SheetTitle className="text-lg flex gap-3 items-center justify-center">
                <FiActivity />
                 <span className="">La Console du Coach</span> <FiActivity />
              </SheetTitle>
            </SheetHeader>
            <div className="w-full flex justify-around px-3 flex-wrap">
              {/* Tes outils de gestion ici */}
              {coachTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <NavLink
                    key={index}
                    className="flex flex-col items-center p-3 bg-muted rounded-xl w-2/5 text-md text-foreground gap-2 mb-5"
                    to={tool.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="size-7" />
                    <span className=" font-bold">{tool.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
}
