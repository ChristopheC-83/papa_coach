import React from 'react'

export default function TitlePage({titlePage, iconPage}) {
  return (
    <p className="text-xl md:text-2xl flex gap-3 border-b-2 w-fit underline-clip">
      <span className="text-clip-1 pt-1">{iconPage}</span>
      <span className="text-clip">{titlePage}</span>
    </p>
  );
}
