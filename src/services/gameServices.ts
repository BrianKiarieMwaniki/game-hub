import { FetchResponse, Game, GameQuery } from "../common.types";
import APIClient from "./apiClient";

class GameSerive extends APIClient<Game>{
    gameQuery: GameQuery;

    constructor(endpoint:string, gameQuery:GameQuery){
        super(endpoint);

        this.gameQuery = gameQuery;
    }

   override getAll = () =>{
        return this.axiosInstance.get<FetchResponse<Game>>("/games", {
          params: {
            page: this.gameQuery.page,
            genres: this.gameQuery.genre?.id,
            parent_platforms: this.gameQuery.platform?.id,
            ordering: this.gameQuery.sortOrder,
            search: this.gameQuery.searchText,
          },
        }).then(res => res.data);
    }
}

export default GameSerive;