import { FetchResponse, GameQuery } from "../common.types";

import { Game } from "../entities/Game";
import APIClient from "./apiClient";

class GameService extends APIClient<Game> {
  gameQuery: GameQuery;

  constructor(endpoint: string, gameQuery: GameQuery) {
    super(endpoint);

    this.gameQuery = gameQuery;
  }

  override getAll = () => {
    return this.axiosInstance
      .get<FetchResponse<Game>>(this.endpoint, {
        params: {
          page: this.gameQuery.page,
          genres: this.gameQuery.genreId,
          parent_platforms: this.gameQuery.platformId,
          ordering: this.gameQuery.sortOrder,
          search: this.gameQuery.searchText,
        },
      })
      .then((res) => res.data);
  };

  getGame = (slug: string) => {
    return this.axiosInstance
      .get<Game>(`${this.endpoint}/${slug}`)
      .then((res) => res.data);
  };
}

export default GameService;
