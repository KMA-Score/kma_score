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
              ???
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
              placeholder="T??m ki???m theo t??n, m?? sinh vi??n..."
              className="input w-full"
              ref={inputRef}
              onInput={submitSearch}
            />
            <label
              htmlFor="search-modal"
              className="btn btn-sm btn-circle"
              onClick={cleanUp}
            >
              ???
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
              {query && "K???t qu??? t??m ki???m"}
              {searchHistory?.length > 0 && !query && "L???ch s??? t??m ki???m"}
            </b>
          </div>
          <div className="px-2 flex flex-col space-y-2.5 overflow-y-auto">
            {studentList}
          </div>
          {searchHistory?.length === 0 && searchResult?.length === 0 && (
            <div className="flex flex-col items-center text-center space-y-2.5 px-2">
              <h6 className="font-bold">
                C?? v??? nh?? b???n ch??a t???ng t??m ki???m g?? c???
              </h6>
              <p className="text-ctp--subtext0">
                H??y th??? t??m ki???m m???t sinh vi??n b???ng c??ch nh???p t??n ho???c m?? sinh
                vi??n v??o ?? t??m ki???m ??? tr??n.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
