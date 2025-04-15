import { useGetInit } from "@entities/Init";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data, isLoading, error } = useGetInit();
  const router = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      console.log("data is ok valid", data);
    } else {
      router.push("/profile");
    }
  }, [data, isLoading, error]);

  return <div>Home</div>;
}
