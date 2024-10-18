interface Props {
  base?: boolean;
}

export default function Footer({ base }: Props) {
  return (
    <footer
      className={`${
        base ? "w-full px-4" : "w-full md:w-[470px] px-6"
      } flex justify-between my-2 md:p-0 bg-transparent`}
    >
      <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
        Created by {" "}
        <a
          href="https://github.com/varJonathanR"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 font-semibold"
        >
          varJonathanR
        </a>
      </p>
      <a
        href="https://devchallenges.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-semibold"
      >
        devChallenges.io
      </a>
    </footer>
  );
}
