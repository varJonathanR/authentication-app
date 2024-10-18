import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

import type { UserData } from "@/libs/types";

import RootLayout from "@/app/layout";
import Navbar from "@/components/Navbar/Navbar";
import UserInfo from "@/app/dashboard/profile/UserInfo";
import Footer from "@/components/Footer";

export default async function ProfilePage() {
  const session = await getSession();
  const user: UserData | undefined = session;
  
  if (!user) redirect("/login");

  return (
    <RootLayout>
      <Navbar />
      <main className="w-full md:w-5/6 pt-8 mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl dark:text-white">Personal info</h1>
        <p className="dark:text-gray-300">Basic info, like your name and photo</p>
        <UserInfo profilePicture={user.profilePicture || ""} username={user.username || ""} email={user.email || ""} bio={user.bio || ""} phoneNumber={user.phoneNumber || ""} provider={user.provider || ""} />
        <Footer base />
      </main>
    </RootLayout>
  );
}
