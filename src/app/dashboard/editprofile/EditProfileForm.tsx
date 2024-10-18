"use client";

import { FormEvent, useState } from "react";

import Camera from "@/assets/camera.svg";
import User from "@/assets/account.svg";

import { useRouter } from "next/navigation";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { UpdateProfile } from "@/libs/types";
import PasswordInput from "@/components/Inputs/PasswordInput";
import Modal from "@/components/Modal/Modal";

interface Props {
  provider: string;
}

export default function EditProfileForm({ provider }: Props) {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [bio, setBio] = useState<string>("");
  const maxLength = 150;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const dialog = document.querySelector("dialog");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fields: UpdateProfile = { userId: session?.user?.id! };

    if (formData.get("profilePicture"))
      fields.profilePicture = formData.get("profilePicture")?.toString();
    if (formData.get("username")) fields.username = formData.get("username");
    if (formData.get("email"))
      fields.email = formData.get("email")?.toString().toLowerCase();
    if (formData.get("password")) fields.password = formData.get("password");
    if (formData.get("bio")) fields.bio = formData.get("bio");
    if (formData.get("phoneNumber"))
      fields.phoneNumber = formData.get("phoneNumber");

    try {
      setLoading(true);

      if (status !== "authenticated") return router.push("/login");

      const res = await axios.patch("/api/profile/update", fields);

      await update({
        ...session,
        user: {
          ...session?.user,
          ...fields,
        },
      });

      if (res.statusText === "OK") return router.push("/dashboard/profile");
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Modal setProfilePhoto={setProfilePhoto} />
      <form
        onSubmit={handleSubmit}
        id="edit-form"
        className="w-full flex flex-col gap-4"
      >
        <button
          className="w-fit mt-4 flex items-center gap-6 group"
          onClick={() => dialog?.showModal()}
          type="button"
        >
          <div className="relative h-20 w-fit aspect-square rounded-xl overflow-hidden">
            <Image
              src={profilePhoto ? profilePhoto : User}
              alt="Profile Photo"
              loading="lazy"
              fill
              className="object-cover transition-all duration-300 group-hover:brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Image src={Camera} alt="Camera Icon" className="h-8 w-8" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">CHANGE PHOTO</p>
        </button>
        <input
          name="profilePicture"
          type="text"
          className="hidden"
          value={profilePhoto}
        />
        <label htmlFor="username" className="dark:text-gray-300">
          <p>Name</p>
          <input name="username" type="text" placeholder="Enter your name" />
        </label>
        <label htmlFor="bio" className="dark:text-gray-300">
          <p>
            Bio{" "}
            <span className="text-gray-500">
              ({bio.length}/{maxLength})
            </span>
          </p>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            placeholder="Enter your bio"
            maxLength={maxLength}
            rows={4}
          />
        </label>
        <label htmlFor="phoneNumber" className="dark:text-gray-300">
          <p>Phone</p>
          <input
            name="phoneNumber"
            type="text"
            placeholder="Enter your phone"
          />
        </label>
        {provider === "local" ? (
          <>
            <label htmlFor="email" className="dark:text-gray-300">
              <p>Email</p>
              <input name="email" type="email" placeholder="Enter your email" />
            </label>
            <PasswordInput isEdit />
          </>
        ) : (
          ""
        )}
        <div className="flex items-center gap-4">
          <button
            className="w-fit px-4 py-2 rounded-lg text-white bg-sky-600"
            type="submit"
          >
            Save
          </button>
          <div className="h-6 m-0 p-0 flex items-center justify-center">
            {error && (
              <p className="text-sm text-center text-red-600">{error}</p>
            )}
            {loading && <div id="loader"></div>}
          </div>
        </div>
      </form>
    </>
  );
}
