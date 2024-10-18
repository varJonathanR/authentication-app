import { oauth } from "@/action/user";

import GoogleIcon from "@/assets/Google.svg";
import FacebookIcon from "@/assets/Facebook.svg";
import TwitterIcon from "@/assets/Twitter.svg";
import GitHubIcon from "@/assets/Github.svg";

import Image from "next/image";

export default function OAuth() {
  return (
    <form action={oauth} className="w-fit my-4 mx-auto flex gap-4">
      <button
        type="submit"
        name="action"
        value="google"
        title="Continue with Google"
      >
        <Image src={GoogleIcon} alt="Google icon" className="h-full w-full" />
      </button>
      <button
        type="submit"
        name="action"
        value="facebook"
        title="Continue with Facebook"
      >
        <Image
          src={FacebookIcon}
          alt="Facebook icon"
          className="h-full w-full"
        />
      </button>
      <button
        type="submit"
        name="action"
        value="twitter"
        title="Continue with Twitter"
      >
        <Image src={TwitterIcon} alt="Twitter icon" className="h-full w-full" />
      </button>
      <button
        type="submit"
        name="action"
        value="github"
        title="Continue with GitHub"
      >
        <Image src={GitHubIcon} alt="GitHub icon" className="h-full w-full" />
      </button>
    </form>
  );
}
