import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import platforms from "../data/platforms";
import platformService from "../services/platformService";
import { Platform } from "../entities";

const usePlatforms = () =>
  useQuery<Platform[], Error>({
    queryKey: ["platforms"],
    queryFn: async () => {
      const { results: platforms } = await platformService.getAll();

      return platforms;
    },
    staleTime: ms("24h"), // 24h
    initialData: platforms,
  });

export default usePlatforms;
