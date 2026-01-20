import { cn } from '@/lib/utils';
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavbarDesktop({links}) {
  return (
    <nav className="px-4 my-2 min-w-40 flex flex-col gap-3">
      {links.map((link) => (
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
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
