"use client"

import { useState } from "react";

import Image from "next/image";

import Lock from "@/assets/lock.svg";
import Visible from "@/assets/visibility.svg";
import VisibleOff from "@/assets/visibilityOff.svg";

interface Props {
  isEdit?: boolean;
}

export default function PasswordInput({ isEdit }: Props) {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  return (
    <>
      {isEdit ? (
        <label htmlFor="password" className="dark:text-gray-300 updatePassword">
          <p>Password</p>
          <div className="flex items-center pr-2 gap-2 rounded-lg border border-gray-400">
            <input
              id="password"
              name="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setVisiblePassword(!visiblePassword)}
              className="h-full aspect-square"
            >
              <Image
                src={visiblePassword ? VisibleOff : Visible}
                alt="Visibility icon"
                className="h-full w-full"
              />
            </button>
          </div>
        </label>
      ) : (
        <label
          htmlFor="password"
          className="flex items-center px-4 py-2 gap-2 rounded-lg border border-gray-400 dark:text-gray-300"
        >
          <Image
            src={Lock}
            alt="Password icon"
            className="h-full aspect-square"
          />
          <input
            id="password"
            name="password"
            type={visiblePassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setVisiblePassword(!visiblePassword)}
            className="h-full aspect-square"
          >
            <Image
              src={visiblePassword ? VisibleOff : Visible}
              alt="Visibility icon"
              className="h-full w-full"
            />
          </button>
        </label>
      )}
    </>
  );
}
