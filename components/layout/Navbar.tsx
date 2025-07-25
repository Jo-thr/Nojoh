"use client";

import Logo from "@/components/common/Logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-20 flex w-full items-center justify-between p-4 px-6">
      <div className="flex w-max flex-row items-center justify-start gap-14">
        {/* LOGO */}
        <Link
          href="/"
          className={`group flex w-max items-center justify-start gap-2 hover:cursor-pointer`}
        >
          <Logo size={28} className="group-hover:animate-jump-shaking" />
          <div className="text-xl font-bold">Nojoh</div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
