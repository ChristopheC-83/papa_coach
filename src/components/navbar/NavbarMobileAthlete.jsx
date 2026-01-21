import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavbarMobileAthlete({links}) {
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
             <Icon className="w-10 h-10" />
             <span className="text-center text-sm">{link.label}</span>
           </NavLink>
         );
       })}
     </nav>
   );
}
