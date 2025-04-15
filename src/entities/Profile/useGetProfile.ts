"use client";

import { fetchData } from "@api/Get/fetchData";
import { PROFILE_ENDPOINT } from "@api/endpoints";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchData(PROFILE_ENDPOINT, getToken),
  });
};
