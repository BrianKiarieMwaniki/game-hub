import { useQuery } from "@tanstack/react-query";
import ms from 'ms';
import { Genre } from "../common.types";
import genres from "../data/genres";
import genreService from "../services/genreService";


const useGenres = () => useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const {results} = await genreService.getAll();

      return results;
    },
    staleTime: ms('24h') , // 24h
    initialData: genres
  });

 

export default useGenres;
