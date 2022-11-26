import Link from "next/link";

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
        <ion-icon name="logo-github" size="large"></ion-icon>
      </a>
      <label className="flex-none pl-4" htmlFor="search-modal">
        <div className="input input-bordered flex items-center btn transform-none normal-case">
          Tìm kiếm nhanh...
          <ion-icon name="search-outline" class="pl-10"></ion-icon>
        </div>
      </label>
    </div>
  );
}