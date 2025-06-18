import React, { ReactNode } from "react";

interface GlassProps {
  children: ReactNode;
  className?: string;
}

const Glass: React.FC<GlassProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`backdrop ${className}`}
    >
      <div className="relative z-10 p-6 text-white">{children}</div>
    </div>
  );
};

export default Glass;
