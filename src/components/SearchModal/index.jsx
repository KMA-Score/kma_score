import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import * as ApiService from "../../services/ApiService";
import Chip from "../Chip";
import { useNavigate } from "react-router-dom";
import MeilisearchLogo from "../MeilisearchLogo";
import { get, set } from "../../services/LocalStorageService";

export default function SearchModal({ closeModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(get("searchHistory")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(get("searchHistory"))) {
      setSearchHistory(JSON.parse(get("searchHistory")));
    }
  }, []);

  useEffect(() => {
    return () => {
      set("searchHistory", JSON.stringify(searchHistory));
    };
  }, [searchHistory]);

  useEffect(() => {
    if (searchQuery) {
      async function search() {
        const data = await ApiService.search(searchQuery);
        setSearchResult(data);
      }

      const timeout = setTimeout(search, 500);

      return () => clearTimeout(timeout);
    }
  }, [searchQuery]);

  const removeHistoryItem = (event, index) => {
    event.stopPropagation();
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
  };

  const setHistoryToLocalStorage = (student) => {
    return new Promise((resolve, reject) => {
      if (searchHistory.findIndex((item) => item.id === student.id) < 0) {
        setSearchHistory([student, ...searchHistory]);
      }
      resolve();
    });
  };

  const navigateToStudentPage = (student) => {
    // use promise to wait for setHistoryToLocalStorage to finish
    Promise.all([
      setHistoryToLocalStorage(student),
      navigate(`/student/${student.id}`),
    ]).then(closeModal);
  };

  const studentList = useMemo(() => {
    let list = [];

    if (searchResult.length) {
      list = searchResult;
    } else if (searchHistory.length) {
      list = searchHistory;
    }

    return list.map((student) => (
      <div
        key={student.id}
        className="py-5 text-xl flex items-center hover:bg-neutral-800 cursor-pointer border-b border-neutral-700"
        onClick={() => {
          navigateToStudentPage(student);
        }}
      >
        <div className="flex-grow px-5 space-y-2">
          <p>{student.name}</p>
          <div className="flex space-x-2">
            <Chip cssClass="text-sm bg-neutral-600 border-none rounded-full font-bold">
              <ion-icon name="golf-outline" class="text-xl pr-2"></ion-icon>
              {student.class}
            </Chip>
            <Chip cssClass="text-sm bg-neutral-600 border-none rounded-full font-bold">
              <ion-icon
                name="person-circle-outline"
                class="text-xl pr-2"
              ></ion-icon>
              {student.id}
            </Chip>
          </div>
        </div>
        {searchResult.length === 0 && (
          <button
            className="flex"
            type="button"
            onClick={(event) => removeHistoryItem(event, list.indexOf(student))}
          >
            <ion-icon
              name="close"
              class="text-neutral-500 text-2xl px-5 hover:text-neutral-400"
            ></ion-icon>
          </button>
        )}
      </div>
    ));
  }, [searchResult, searchHistory]);

  const submitSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full">
      <div className="relative top-20 md:top-1/6 mx-auto pt-5 w-5/6 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-black space-y-2">
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
          <button className="flex" onClick={closeModal} type="button">
            <ion-icon
              name="close"
              size="large"
              class="text-neutral-500 hover:text-neutral-400"
            ></ion-icon>
          </button>
        </section>
        <section className="space-y-2">
          <h6 className="font-bold px-5">
            {searchResult.length > 0 ? "Kết quả tìm kiếm" : "Lịch sử tìm kiếm"}
          </h6>
          <div className="flex flex-col overflow-y-auto max-h-64 md:max-h-64 xl:max-h-96">
            {studentList}
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
  );
}

SearchModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
