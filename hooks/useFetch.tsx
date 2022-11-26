import { AxiosFetcher } from "../types/AxiosFetcher";
import { useEffect, useState } from "react";

// Not use yet, but I think it will be used in the future
export function useFetch(params: string, fetcher: AxiosFetcher) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetcher(params)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetcher, params]);

  return [data, error, loading];
}
