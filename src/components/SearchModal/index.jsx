import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as ApiService from "../../services/ApiService";
import Chip from "../Chip";
import { useNavigate } from "react-router-dom";
import MeilisearchLogo from "../MeilisearchLogo";

export default function SearchModal({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const navigateToStudentPage = (studentId) => {
    navigate(`/student/${studentId}`);
    onClose();
  };

  const submitSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      async function search() {
        const data = await ApiService.search(searchQuery);
        console.log(searchQuery);
        setSearchResult(data);
      }

      const timeout = setTimeout(search, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchQuery]);

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full"
        id="my-modal"
      >
        <div className="relative top-20 mx-auto pt-5 w-1/2 shadow-lg rounded-md bg-black space-y-2">
          <section className="flex items-center space-x-5 bg-black px-5">
            <ion-icon
              name="search"
              size="large"
              class="text-neutral-500"
            ></ion-icon>
            <input
              type="search"
              className="w-full text-xl bg-inherit outline-none py-2 placeholder-neutral-500"
              placeholder="Tìm kiếm theo tên, mã sinh viên..."
              autoFocus
              onInput={submitSearch}
            />
            <button className="flex" onClick={onClose} type="button">
              <ion-icon
                name="close"
                size="large"
                class="text-neutral-500 hover:text-neutral-400"
              ></ion-icon>
            </button>
          </section>
          <section className="space-y-2">
            <h6 className="font-bold px-5">
              {searchResult.length > 0
                ? "Kết quả tìm kiếm"
                : "Lịch sử tìm kiếm"}
            </h6>
            <div className="flex flex-col overflow-y-scroll max-h-32 xl:max-h-96">
              {searchResult.length > 0 &&
                searchResult.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 text-xl flex items-center hover:bg-neutral-800 cursor-pointer border border-r-0 border-l-0 border-t-0 border-neutral-700"
                    onClick={() => {
                      navigateToStudentPage(item.id);
                    }}
                  >
                    <div className="flex-grow px-5 space-y-2">
                      <p>{item.name}</p>
                      <div className="flex space-x-2">
                        <Chip cssClass="text-sm bg-neutral-600 border-none rounded-full font-bold">
                          <ion-icon
                            name="golf-outline"
                            class="text-xl pr-2"
                          ></ion-icon>
                          {item.class}
                        </Chip>
                        <Chip cssClass="text-sm bg-neutral-600 border-none rounded-full font-bold">
                          <ion-icon
                            name="person-circle-outline"
                            class="text-xl pr-2"
                          ></ion-icon>
                          {item.id}
                        </Chip>
                      </div>
                    </div>
                    {searchResult.length === 0 && (
                      <button className="flex" type="button">
                        <ion-icon
                          name="close"
                          class="text-neutral-500 text-2xl px-5 hover:text-neutral-400"
                        ></ion-icon>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </section>
          <a
            className="flex justify-end items-center space-x-2 px-5 py-3 border border-r-0 border-l-0 border-b-0 border-neutral-700"
            href="https://www.meilisearch.com/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-neutral-400">Powered by</p>
            <MeilisearchLogo />
          </a>
        </div>
      </div>
    </>
  );
}

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
