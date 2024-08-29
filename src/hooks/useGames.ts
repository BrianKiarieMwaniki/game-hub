import { useQuery } from "@tanstack/react-query";
import { FetchResponse, Game, GameQuery } from "../common.types";
import apiClient from "../services/apiClient";


const useGames = (gameQuery: GameQuery) => {
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ["games", gameQuery],
    queryFn: () => {
      const response = apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data);

      return response.then((res) => res.results);
    },
  });

  return { data, error, isLoading };
};

export default useGames;
