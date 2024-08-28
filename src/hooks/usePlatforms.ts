import { useQuery } from "@tanstack/react-query";
import { FetchResponse, Platform } from "../common.types";
import apiClient from "../services/apiClient";
import platforms from "../data/platforms";

const usePlatforms = () =>
  useQuery<Platform[], Error>({
    queryKey: ["platforms"],
    queryFn: () => {
      const platforms = apiClient
        .get<FetchResponse<Platform>>("/platforms/lists/parents")
        .then((res) => res.data);

      return platforms.then((res) => res.results);
    },
    staleTime: 24 * 60 * 60 * 100, // 24h
    initialData:  platforms
  });

export default usePlatforms;
