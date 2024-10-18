import Link from "next/link";
import RootLayout from "@/app/layout";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <RootLayout>
      <Navbar />
      <main className="w-full h-screen flex flex-col items-center justify-center gap-4 lg:gap-6">
        <h1 className="text-gray-500 dark:text-gray-400 font-semibold text-[1.9rem] md:text-[3rem] lg:text-[4rem] max-w-[800px] mx-auto">
          Practice with Real Life
        </h1>
        <h1 className="font-semibold text-[1.9rem] md:text-[3rem] lg:text-[4rem] max-w-[800px] mx-auto text-transparent bg-clip-text bg-gradient-to-r w-fit from-purple-500 via-pink-400 to-yellow-300">
          Coding Projects
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center text-xs md:text-base lg:text-xl font-semibold max-w-[300px] md:max-w-[450px] lg:max-w-[600px]">
          Coding projects are a great way to practice coding, improve your
          skills and build your portfolio.
        </p>
        <Link
          href={"/register"}
          className="px-6 py-3 text-sm text-gray-50 rounded-xl mt-4 block bg-purple-600 w-fit h-fit mx-auto outline outline-offset-4 outline-purple-500 font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
        >
          Start solving challenges now
        </Link>
        <p className="text-gray-600 dark:text-gray-500 text-xs">100,000+ challenges completed.</p>
      </main>
    </RootLayout>
  );
}
