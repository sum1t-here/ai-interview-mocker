"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all duration-300 cursor-pointer ${
            pathname === "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
