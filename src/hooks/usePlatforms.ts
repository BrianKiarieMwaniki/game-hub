import { useQuery } from "@tanstack/react-query";
import { Platform } from "../common.types";
import platforms from "../data/platforms";
import platformService from "../services/platformService";

const usePlatforms = () =>
  useQuery<Platform[], Error>({
    queryKey: ["platforms"],
    queryFn: async () => {
      const {results:platforms} = await platformService.getAll();

      return platforms;
    },
    staleTime: 24 * 60 * 60 * 100, // 24h
    initialData:  platforms
  });

export default usePlatforms;
