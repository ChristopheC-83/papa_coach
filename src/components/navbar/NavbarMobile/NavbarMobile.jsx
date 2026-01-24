
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiTool, FiActivity } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  COMMON_LINKS,
  VISITORS_LINKS,
  ATHLETE_LINKS,
  COACH_LINKS,
} from "@/config/navigation";

export default function NavbarMobile({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  let links = [];
  let tools = [];
  if (!user) {
    links = [...COMMON_LINKS, ...VISITORS_LINKS];
  } else {
    if (user.role === "athlete") {
      links = [...ATHLETE_LINKS];
    }
    if (user.role === "coach") {
      links = [...COACH_LINKS.bottom];
      tools = [...COACH_LINKS.tools];
    }
  }

  return (
    <nav className="flex justify-around py-2">
      {links.map((link) => {
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
      {user?.role === "coach" && (
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
              <SheetDescription>
                Accédez à vos outils de gestion et paramètres coach.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex justify-around px-3 flex-wrap">
              {/* Tes outils de gestion ici */}
              {tools.map((tool, index) => {
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
