import Logo from "../Logo";
import { VERSION } from "../../../config/app.config.json";
import { useState } from "react";
import SearchModal from "../SearchModal";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-12 md:h-24 bg-black items-center px-5 md:px-24 lg:px-36 fixed inset-x-0 z-50">
      <div
        className="font-bold flex-grow flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <Logo />
        <a
          className="text-neutral-500 font-light"
          href="https://github.com/arahiko-ayami/kma_score"
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon
            name="git-branch-outline"
            class="text-neutral-500"
          ></ion-icon>
          {VERSION}
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/arahiko-ayami/kma_score"
          target="_blank"
          rel="noreferrer"
          className="text-3xl flex"
        >
          <ion-icon name="logo-github" class="text-3xl"></ion-icon>
        </a>
        <ion-icon name="search-outline" class="text-3xl md:hidden"></ion-icon>
        <button
          className="items-center space-x-10 rounded-lg py-1.5 px-3 hidden md:flex bg-neutral-600 hover:bg-neutral-500 placeholder-neutral-300"
          onClick={(event) => {
            setIsSearchModalOpen(true);
          }}
        >
          <p>Tìm kiếm nhanh...</p>
          <ion-icon name="search-outline" class="text-xl"></ion-icon>
        </button>
      </div>
      {isSearchModalOpen && (
        <SearchModal
          onClose={() => {
            setIsSearchModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
