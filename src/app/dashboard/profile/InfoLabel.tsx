import Image from "next/image";

import User from "@/assets/account.svg"

interface Props {
  label: string;
  content: string;
}

export default function InfoLabel({ label, content }: Props) {
  return (
    <div className="w-full my-4 px-4 md:px-12 flex items-center justify-between md:justify-normal">
      <p className="text-gray-600 dark:text-gray-300 w-1/3 min-w-[33.33%]">{label}</p>
      {label !== "PHOTO" ? (
        <p className="text-sm md:text-base dark:text-white">{content}</p>
      ) : (
        <div className="relative h-20 w-auto aspect-square rounded-xl overflow-hidden">
          <Image
            src={content ? content : User}
            alt="Profile Photo"
            loading="lazy"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
