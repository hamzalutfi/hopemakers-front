import useSWR from "swr";
import { useMemo } from "react";
import { endpoints } from "../constants/endpoints";
import { fetcher } from "../utils/axios";

export function useGetNeeds(params) {
  const URL = [endpoints.need.cases, { params }];

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      needs: data || [],
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

export function useGetNeed(id, params) {
  const URL = [endpoints.need.one(id), { params }];

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      categoryData: data,
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
