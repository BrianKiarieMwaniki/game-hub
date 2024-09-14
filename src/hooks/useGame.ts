import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../common.types";
import GameService from "../services/gameServices";
import { Game } from "../entities/Game";

const useGame = (gameSlug?: string) =>
  useQuery<Game, Error>({
    queryKey: ["games", gameSlug],
    queryFn: async () => {
      const gameService = new GameService("/games", {} as GameQuery);
      if (!gameSlug) throw new Error("Game must have a valid id");

      const gameResult = await gameService.getGame(gameSlug);

      return gameResult;
    },
  });

export default useGame;
