import { FetchResponse, Genre } from "../common.types";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

const useGenres = () => {
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: () => {
      const response = apiClient
        .get<FetchResponse<Genre>>("/genres")
        .then((res) => res.data);

      return response.then((res) => res.results);
    },
  });

  return { genres, error, isLoading };
};

export default useGenres;
