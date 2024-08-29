import { useQuery } from "@tanstack/react-query";
import { Game, GameQuery } from "../common.types";
import GameSerive from "../services/gameServices";


const useGames = (gameQuery: GameQuery) => {
  const { data, error, isLoading } = useQuery<Game[], Error>({
    queryKey: ["games", gameQuery],
    queryFn: async () => {
      const gameService = new GameSerive("/games", gameQuery);

      const {results:games} = await gameService.getAll();

      return games;
    },
  });

  return { data, error, isLoading };
};

export default useGames;
