import Link from "next/link";
import {
  BaseSyntheticEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CommonService from "../services/Common.service";
import { Student } from "../models/Student.model";
import LocalStorageService from "../services/LocalStorage.service";
import { plainToInstance } from "class-transformer";

export default function SearchModal() {
  const modalToggleCheckboxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<Student>>([]);
  const [searchHistory, setSearchHistory] = useState<Array<Student>>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    const history = plainToInstance(
      Student,
      JSON.parse(LocalStorageService.get("searchHistory") as string)
    );
    // @ts-ignore
    setSearchHistory(history || []);
  }, []);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    LocalStorageService.set("searchHistory", JSON.stringify(searchHistory));
  }, [firstLoad, searchHistory]);

  useEffect(() => {
    if (query) {
      const timeout = setTimeout(async () => {
        const res = await CommonService.search(query);
        setSearchResult(res.data.data);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [query]);

  const submitSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const cleanUp = () => {
    if (inputRef.current && modalToggleCheckboxRef.current) {
      inputRef.current.value = "";
      setQuery("");
      setSearchResult([]);
    }
  };

  const removeHistoryItem = useCallback(
    (event: BaseSyntheticEvent, index: number) => {
      event.stopPropagation();
      const newSearchHistory = [...searchHistory];
      newSearchHistory.splice(index, 1);
      setSearchHistory(newSearchHistory);
    },
    [searchHistory]
  );

  const setHistory = useCallback(
    (student: Student) => {
      if (searchHistory?.findIndex((item) => item.id === student.id) < 0) {
        setSearchHistory([student, ...searchHistory]);
      }
    },
    [searchHistory]
  );

  const studentList = useMemo(() => {
    let list: Array<Student> = [];

    if (searchResult?.length) list = searchResult;
    else if (searchHistory?.length && searchResult?.length === 0)
      list = searchHistory;

    return list.map((student, index) => (
      <Link
        href={`/student/${student.id}`}
        key={`${student.id}`}
        legacyBehavior
      >
        <div
          className="w-full p-4 text-left bg-primary/10 flex items-center cursor-pointer"
          onClick={async () => {
            setHistory(student);
            modalToggleCheckboxRef.current?.click();
            cleanUp();
          }}
        >
          <div className="flex flex-col justify-center space-y-2.5 rounded-lg w-full">
            <h6>{student.name}</h6>
            <div className="flex space-x-2">
              <div className="badge badge-primary">{student.id}</div>
              <div className="badge badge-secondary">{student.class}</div>
            </div>
          </div>
          {searchResult?.length === 0 && (
            <button
              type="button"
              onClick={(event: BaseSyntheticEvent) =>
                removeHistoryItem(event, index)
              }
              className="btn btn-ghost btn-sm btn-square"
            >
              ✕
            </button>
          )}
        </div>
      </Link>
    ));
  }, [searchResult, searchHistory, setHistory, removeHistoryItem]);

  return (
    <>
      <input
        type="checkbox"
        id="search-modal"
        className="modal-toggle"
        ref={modalToggleCheckboxRef}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col space-y-5 max-w-2xl">
          <div className="flex items-center space-x-5">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã sinh viên..."
              className="input w-full"
              ref={inputRef}
              onInput={submitSearch}
            />
            <label
              htmlFor="search-modal"
              className="btn btn-sm btn-circle"
              onClick={cleanUp}
            >
              ✕
            </label>
          </div>
          <div
            className={`${
              searchHistory?.length === 0 && searchResult?.length === 0
                ? "hidden"
                : "divider"
            }`}
          >
            <b>
              {query && "Kết quả tìm kiếm"}
              {searchHistory?.length > 0 && !query && "Lịch sử tìm kiếm"}
            </b>
          </div>
          <div className="px-2 flex flex-col space-y-2.5 overflow-y-auto">
            {studentList}
          </div>
          {searchHistory?.length === 0 && searchResult?.length === 0 && (
            <div className="flex flex-col items-center text-center space-y-2.5 px-2">
              <h6 className="font-bold">
                Có vẻ như bạn chưa từng tìm kiếm gì cả
              </h6>
              <p className="text-ctp--subtext0">
                Hãy thử tìm kiếm một sinh viên bằng cách nhập tên hoặc mã sinh
                viên vào ô tìm kiếm ở trên.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
