import React from "react";

export default function Title({
  title,
  subtitle,
  iconTitle,
  iconSubtitle = null,
}) {
  return (
    <div className="py-2">
      <h1 className="text-3xl text-center font-bold text-clip w-fit mx-auto flex gap-3">
        <span className="text-clip-1 pt-1">{iconTitle}</span> {title}
        <span className="text-clip-2 pt-1">{iconTitle}</span>
      </h1>
      {subtitle && (
        <h2 className="text-xl text-center text-clip w-fit mx-auto flex gap-3">
          <span className="text-clip-1 pt-1">{iconSubtitle}</span>
          {subtitle}
          <span className="text-clip-2 pt-1">{iconSubtitle}</span>
        </h2>
      )}
    </div>
  );
}
