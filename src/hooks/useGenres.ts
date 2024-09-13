import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import genres from "../data/genres";
import genreService from "../services/genreService";
import { Genre } from "../entities/Genre";

const useGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: ["genres"],
    queryFn: async () => {
      const { results } = await genreService.getAll();

      return results;
    },
    staleTime: ms("24h"), // 24h
    initialData: genres,
  });

export default useGenres;
