import useSWR from "swr";
import { useMemo } from "react";
import { endpoints } from "../constants/endpoints";
import { fetcher } from "../utils/axios";

export function useGetUser(params) {
  const URL = [endpoints.auth.me, { params }];

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      userData: data,
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  const refetch = async () => {
    await mutate(URL);
  };

  return { ...memoizedValue, refetch };
}
