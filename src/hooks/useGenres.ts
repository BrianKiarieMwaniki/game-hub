import { Genre } from "../common.types";
import { useQuery } from "@tanstack/react-query";
import genreService from "../services/genreService";
import genres from "../data/genres";


const useGenres = () => useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const {results} = await genreService.getAll();

      return results;
    },
    staleTime: 24 * 60 * 60 * 1000,
    initialData: genres
  });

 

export default useGenres;
