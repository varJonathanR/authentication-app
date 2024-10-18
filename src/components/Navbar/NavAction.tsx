import NavMenu from "@/components/Navbar/NavMenu";

import Link from "next/link";
import { NavProps } from "@/libs/types";
import { useSession } from "next-auth/react";

export default function NavAction({
  theme,
  setTheme,
  showMenu,
  setShowMenu,
}: NavProps) {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <>
      {user ? (
        <NavMenu
          user={user}
          theme={theme}
          setTheme={setTheme}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      ) : (
        <Link
          href={"/login"}
          className="px-5 py-1 md:py-2 text-xs md:text-sm text-gray-50 rounded-lg md:xl bg-purple-600 w-fit h-fit outline outline-offset-4 outline-purple-500 font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Login
        </Link>
      )}
    </>
  );
}
