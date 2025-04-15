import api from "../api";

export const fetchData = async <T>(
  url: string,
  getToken: () => Promise<string | null>
): Promise<T> => {
  const token = await getToken();
  const response = await api
    .get<T>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error: Error) => {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching data");
    });
  return response.data;
};
