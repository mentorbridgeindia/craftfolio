"use client";

import { fetchData } from "@api/Get/fetchData";
import { INIT_ENDPOINT } from "@api/endpoints";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useGetInit = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["init"],
    queryFn: () => fetchData(INIT_ENDPOINT, getToken),
  });
};
