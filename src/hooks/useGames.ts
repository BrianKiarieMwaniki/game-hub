import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import GameService from "../services/gameServices";
import useGameQuery from "../store/store";
import { Game } from "../entities/Game";

const useGames = () => {
  const gameQuery = useGameQuery((s) => s.gameQuery);
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<Game[], Error>({
    queryKey: ["games", gameQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const gameService = new GameService("/games", {
        page: pageParam,
        ...gameQuery,
      });

      const { results: games } = await gameService.getAll();

      return games;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: ms("24h"), // 24h
  });

  return {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export default useGames;
