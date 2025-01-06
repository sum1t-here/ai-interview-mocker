"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <span className="text-xl font-bold">InterviewAI</span>
        </div>
      </Link>
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/features" && "text-primary font-bold"
          }`}
        >
          <Link href="/features">Features</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/how" && "text-primary font-bold"
          }`}
        >
          <Link href="/how">How it works?</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
