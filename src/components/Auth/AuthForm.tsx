import { register, login } from "@/action/user";

import Mail from "@/assets/mail.svg";

import Image from "next/image";
import PasswordInput from "../Inputs/PasswordInput";

interface Props {
  isRegister: boolean;
}

export default function AuthForm({ isRegister }: Props) {
  return (
    <form action={isRegister ? register : login} className="flex flex-col mt-6 gap-4">
      <label
        htmlFor="email"
        className="flex items-center px-4 py-2 gap-2 rounded-lg border border-gray-400 dark:text-gray-300"
      >
        <Image src={Mail} alt="Mail icon" className="h-full aspect-square" />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </label>
      <PasswordInput />
      <button
        className="px-4 py-2 rounded-lg text-white bg-sky-600"
        type="submit"
      >
        {isRegister ? "Start coding now" : "Login"}
      </button>
      {/* <div className="h-6 m-0 p-0 flex items-center justify-center">
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        {loading && <div id="loader"></div>}
      </div> */}
    </form>
  );
}
