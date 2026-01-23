import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user/useUserStore";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {
  COMMON_LINKS,
  VISITORS_LINKS,
  ATHLETE_LINKS,
  COACH_LINKS,
} from "@/config/navigation";

export default function NavbarDesktop({ user }) {
  const { isAuth, logout } = useUserStore();
  const navigate = useNavigate();

  let links = [];

  if (!user) {
    links = [...COMMON_LINKS, ...VISITORS_LINKS];
  }
  if (user) {
    if (user.role == "athlete") {
      links = [...COMMON_LINKS, ...ATHLETE_LINKS];
    }
    if (user.role == "coach") {
      links = [...COMMON_LINKS, ...COACH_LINKS.bottom, ...COACH_LINKS.tools];
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <nav className="px-4 my-2 min-w-40 flex flex-col gap-3 fixed top-0 left-0">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "flex gap-x-2 items-center px-3 py-2 rounded-lg transition-all font-medium", // Base
                "hover:text-secondary-foreground hover:bg-accent", // Hover
                isActive && "bg-secondary text-foreground font-bold shadow-sm", // Active
              )
            }
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{link.label}</span>
          </NavLink>
        );
      })}
      {isAuth && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 rounded"
        >
          <FiLogOut /> Déconnexion
        </button>
      )}
    </nav>
  );
}
