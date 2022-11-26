import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 top-0 sticky h-full z-40">
      <div className="flex-1">
        <Link href="/">
          <p className="btn btn-ghost normal-case text-xl">./kma_score</p>
        </Link>
      </div>
      <a
        className="flex-none btn-ghost rounded-lg p-1.5 ease-in-out duration-200"
        href="https://github.com/KMA-Score"
        rel="noreferrer"
        target="blank"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <label className="flex-none pl-4 hidden md:block" htmlFor="search-modal">
        <div className="input input-bordered flex items-center btn transform-none normal-case">
          Tìm kiếm nhanh...
          <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-10" />
        </div>
      </label>
      <label
        className="btn btn-ghost flex-none rounded-lg btn-square md:hidden"
        htmlFor="search-modal"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      </label>
    </div>
  );
}
