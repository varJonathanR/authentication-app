"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import LightLogo from "@/assets/devchallenges.svg";
import DarkLogo from "@/assets/devchallenges-light.svg";
import NavAction from "@/components/Navbar/NavAction";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDarkScheme ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="top-0 left-0 w-full h-fit p-4 flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src={LightLogo}
          alt="Logo Light"
          className="h-5 w-auto dark:hidden"
        />
        <Image
          src={DarkLogo}
          alt="Logo Dark"
          className="h-5 w-auto hidden dark:block"
        />
      </Link>
      <NavAction
        theme={theme}
        setTheme={setTheme}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </nav>
  );
}
