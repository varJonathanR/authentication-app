import Link from "next/link";
import InfoLabel from "@/app/dashboard/profile/InfoLabel";

interface Props {
  profilePicture: string;
  username: string;
  email: string;
  bio: string;
  phoneNumber: string;
  provider: string;
}

export default function UserInfo({
  profilePicture,
  username,
  bio,
  phoneNumber,
  email,
  provider,
}: Props) {
  return (
    <section className="w-full py-4 px-0 mt-4 rounded-xl md:border border-gray-300">
      <header className="w-full my-4 px-4 md:px-12 flex items-center justify-between">
        <div className="w-3/5">
          <h2 className="text-2xl dark:text-gray-300">Profile</h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Some info may be visible to other people
          </p>
        </div>
        <Link
          href={"/dashboard/editprofile"}
          className="text-gray-500 dark:text-gray-300 px-6 py-1 rounded-lg border border-gray-400"
        >
          Edit
        </Link>
      </header>
      <hr className="border-gray-400" />
      <InfoLabel label="PHOTO" content={profilePicture} />
      <hr className="dark:border-gray-500" />
      <InfoLabel label="NAME" content={username} />
      <hr className="dark:border-gray-500" />
      <InfoLabel label="BIO" content={bio} />
      <hr className="dark:border-gray-500" />
      <InfoLabel label="PHONE" content={phoneNumber} />
      <hr className="dark:border-gray-500" />
      <InfoLabel label="EMAIL" content={email} />
      {provider === "local" ? (
        <>
          <hr className="dark:border-gray-500" />
          <InfoLabel label="PASSWORD" content="******" />
        </>
      ) : (
        ""
      )}
    </section>
  );
}
