export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center h-12 md:h-24 bg-black px-5 md:px-24 lg:px-36">
      <p className="text-xs md:text-sm">
        <span className="font-mono">./kma_score</span> from{" "}
        <a
          href="https://github.com/arahiko-ayami"
          target="_blank"
          rel="noreferrer"
          className="bg-blue-500 p-1 rounded-sm"
        >
          @arahiko
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/phuchptty"
          target="_blank"
          rel="noreferrer"
          className="bg-red-500  p-1 rounded-sm"
        >
          @phuchptty
        </a>{" "}
        with ❤
      </p>
    </div>
  );
}
