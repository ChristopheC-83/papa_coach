import React from 'react'
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

export default function Navbar() {
  return (
    <>
      {/* L'astuce : on rend les deux, 
          mais Tailwind s'occupe de la visibilité 
      */}
      <div className="hidden md:block w-full border-b bg-background">
        <NavbarDesktop />
      </div>

      <div className="block md:hidden fixed bottom-0 left-0 w-full border-t bg-background z-50">
        <NavbarMobile />
      </div>
    </>
  );
}