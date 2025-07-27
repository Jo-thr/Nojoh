"use client";

import Logo from "@/components/common/Logo";
import { navLinks } from "@/data/navLinks";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Navbar = () => {
  const path = usePathname();
  const isActive = (href: string) => path === href;

  return (
    <nav className="relative top-0 left-0 z-20 flex h-screen w-max flex-col items-center justify-between border-r border-gray-200 bg-gray-50 p-6 px-4">
      {/* LOGO */}
      <Link
        href="/"
        className={`group flex w-max items-center justify-start gap-2 hover:cursor-pointer`}
      >
        <Logo size={36} className="group-hover:animate-jump-shaking" />
      </Link>
      {/* NAVIGATION LINKS */}
      <div className="flex flex-col items-center gap-4">
        <TooltipProvider>
          {navLinks.map(({ href, icon: Icon, label }, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={`${isActive(href) ? "bg-primary !border-primary !text-white" : "hover:text-primary hover:border-primary-foreground/25 hover:bg-primary-foreground/30"} text-primary-foreground rounded-md border border-transparent p-2 text-sm transition-colors`}
                >
                  <Icon size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={0}>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      {/* FOOTER */}
      <div className="flex aspect-square w-max items-center justify-center rounded-full border p-0.5">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
