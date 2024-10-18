import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

import RootLayout from "@/app/layout";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import EditProfileForm from "@/app/dashboard/editprofile/EditProfileForm";

import Back from "@/assets/back.svg";

import Link from "next/link";
import Image from "next/image";
import { UserData } from "@/libs/types";

export default async function EditProfile() {
  const session = await getSession();
  const user: UserData | undefined = session;
  
  if (!user) redirect("/login");

  return (
    <RootLayout>
      <Navbar />
      <main className="w-full md:w-5/6 pt-8 mx-auto">
        <Link
          href={"/dashboard/profile"}
          className="ml-4 md:ml-0 flex items-center gap-2 text-lg text-sky-600"
        >
          <Image
            src={Back}
            alt="Back icon"
            className="h-4 w-auto aspect-square"
          />
          Back
        </Link>
        <section className="w-full p-4 md:p-8 mt-4 rounded-xl md:border border-gray-300">
          <h1 className="text-2xl md:text-3xl dark:text-white">Change Info</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Changes will be reflected to every services
          </p>
          <EditProfileForm provider={user.provider || ""} />
        </section>
        <Footer base />
      </main>
    </RootLayout>
  );
}
