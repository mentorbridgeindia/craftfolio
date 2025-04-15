"use client";

import { useUser } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  // useEffect(() => {
  // Only attempt to redirect if Clerk has finished loading
  // if (isLoaded) {
  //   if (!isSignedIn) {
  //     console.log("redirecting to login");
  //     console.log("isLoaded", isLoaded); // Should be true here
  //     console.log("isSignedIn", isSignedIn); // Should be false here
  //     router.push("/login");
  //   }
  // } else {
  //   // Optionally log or handle the loading state
  //   console.log("Clerk is still loading...");
  // }
  // }, [router, isLoaded, isSignedIn]);

  // Only render children wrapped in QueryClientProvider if the user is authenticated
  return isSignedIn ? (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ) : null;
};

export default PrivateRoute;
