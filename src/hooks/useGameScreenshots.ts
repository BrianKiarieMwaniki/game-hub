import { useQuery } from "@tanstack/react-query";
import { GameScreenshot } from "../entities";
import APIClient from "../services/apiClient";

const useGameScreenshots = (gameId: number) => {
  const apiClient = new APIClient<GameScreenshot>(
    `/games/${gameId}/screenshots`
  );

  return useQuery({
    queryKey: ["game_screenshots", gameId],
    queryFn: async() => {
      const {results} = await apiClient.getAll();
      return results;
    },
  });
};

export default useGameScreenshots;
