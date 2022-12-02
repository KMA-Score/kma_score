import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data } = useSession();

  const authComp = () => {
    if (data?.accessToken) {
      return (
        <div className="dropdown mr-2">
          <label tabIndex={0} className="btn m-1">
            <img
              src={
                data.user.image ||
                "https://securitydvrinc.com/wp-content/uploads/2021/01/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg"
              }
              alt="Avatar"
              className="mr-2 h-4/5 w-auto"
            />
            {data?.user?.name}
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => signOut()}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Thoát
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <a
          className="py-1.5 px-3 btn-ghost rounded ease-in-out duration-200 mr-2 cursor-pointer"
          onClick={() => signIn("azure-ad")}
        >
          Đăng nhập
        </a>
      );
    }
  };

  return (
    <div className="navbar bg-base-100 top-0 sticky z-40">
      <div className="flex-1">
        <Link href="/">
          <p className="btn btn-ghost normal-case text-xl">./kma_score</p>
        </Link>
      </div>

      {/*<p>{JSON.stringify(data)}</p>*/}

      {authComp()}

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
