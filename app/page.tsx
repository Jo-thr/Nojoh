"use client";

import Logo from "@/components/common/Logo";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-foreground flex h-full w-full flex-col items-center justify-center space-y-4 px-4 py-12">
      <section className="flex max-w-2xl flex-col gap-8 text-center">
        {/* Logo */}
        <div className="group flex min-w-[40rem] flex-col items-center gap-2 hover:cursor-pointer">
          <Logo size={80} className="group-hover:animate-jump-shaking" />
        </div>
        {/* Hero */}
        <h1 className="font-dmSerif text-4xl leading-tight font-bold tracking-tight md:text-5xl">
          La Roadmap Wizardienne
        </h1>
        <p className="text-muted-foreground text-lg">
          Durable, esthétique, intelligent.
        </p>
      </section>

      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="text-ceramic-white h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
