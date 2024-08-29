import { Genre } from "../common.types";
import { useQuery } from "@tanstack/react-query";
import genreService from "../services/genreService";

const useGenres = () => {
  const {
    data: genres,
    error,
    isLoading,
  } = useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const {results} = await genreService.getAll();

      return results;
    },
  });

  return { genres, error, isLoading };
};

export default useGenres;
