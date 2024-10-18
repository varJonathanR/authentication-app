import { signOut } from "next-auth/react";

import Arrow from "@/assets/arrow.svg";
import User from "@/assets/account.svg";
import Group from "@/assets/group.svg";
import Logout from "@/assets/exit.svg";
import Light from "@/assets/light_mode.svg";
import Dark from "@/assets/dark_mode.svg";

import Image from "next/image";
import Link from "next/link";
import type { NavProps } from "@/libs/types";

export default function NavMenu({
  user,
  theme,
  setTheme,
  showMenu,
  setShowMenu,
}: NavProps) {
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setShowMenu(!showMenu)}
    >
      <div className="relative h-9 w-auto aspect-square rounded-lg overflow-hidden">
        <Image
          src={user?.profilePicture || User}
          alt="nasd"
          loading="lazy"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-sm md:text-base ml-2 dark:text-white">
        {user?.username || "User"}
      </p>
      <Image
        src={Arrow}
        alt="Arrow Icon"
        className={`h-fit w-fit ${showMenu && "rotate-180"}`}
      />
      <div
        className={`absolute w-[150px] bg-white dark:bg-[#252329] ${
          showMenu ? "top-[70px]" : "top-[-250px]"
        } right-4 p-2 rounded-xl border border-gray-300`}
      >
        <div id="menu-actions">
          <Link
            href={"/dashboard/profile"}
            className="text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Image
              src={User}
              alt="User icon"
              className="h-full w-auto aspect-square"
            />
            My Profile
          </Link>
          <button className="text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Image
              src={Group}
              alt="User icon"
              className="h-full w-auto aspect-square"
            />
            Group Chat
          </button>
          <button
            onClick={handleTheme}
            className="text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Image
              src={theme === "dark" ? Light : Dark}
              alt="User icon"
              className="h-full w-auto aspect-square"
            />
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <hr className="my-1 dark:border-gray-500" />
          <button
            onClick={() => signOut()}
            className="text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Image
              src={Logout}
              alt="User icon"
              className="h-full w-auto aspect-square"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
