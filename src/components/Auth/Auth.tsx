import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

import AuthForm from "@/components/Auth/AuthForm";
import OAuth from "@/components/Auth/OAuth";
import Footer from "@/components/Footer";

import Logo from "@/assets/devchallenges.svg";

import Image from "next/image";
import Link from "next/link";

interface Props {
  register: boolean;
}

export default async function Auth({ register }: Props) {
  const user = await getSession();
  
  if (user) redirect("/dashboard/profile");

  return (
    <>
      <div className="w-full md:w-[470px] p-6 md:p-8 rounded-xl md:border border-gray-400">
        <div>
          <Link href={"/"}>
            <Image src={Logo} alt="Logo" className="h-4 md:h-5 w-auto" />
          </Link>
          {register ? (
            <>
              <h1 className="my-4 font-semibold md:text-xl dark:text-gray-200">
                Join thousands of learners from arround the world
              </h1>
              <p className="text-sm md:text-base dark:text-gray-200">
                Master web development by makin real-life projects. There are
                multiple paths for you to choose.
              </p>
            </>
          ) : (
            <h1 className="mt-4 font-semibold text-xl dark:text-gray-200">Login</h1>
          )}
        </div>
        <AuthForm isRegister={register} />
        <span className="block text-center text-sm lg:text-base">
          or continue with these social profile
        </span>
        <OAuth />
        <span className="block text-center">
          {register ? (
            <>
              Already a member?{" "}
              <Link href={"/login"} className="text-blue-600">
                Login
              </Link>
            </>
          ) : (
            <>
              Don&#39;t have an account yet?{" "}
              <Link href={"/register"} className="text-blue-600">
                Register
              </Link>
            </>
          )}
        </span>
      </div>
      <Footer />
    </>
  );
}
