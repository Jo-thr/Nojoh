"use client";

import logoSrc from "@/public/logo.svg";
import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <Image
      src={logoSrc}
      alt="Logo Nojoh"
      width={size}
      height={size}
      priority
      className={`transition-all ${className}`}
    />
  );
}
