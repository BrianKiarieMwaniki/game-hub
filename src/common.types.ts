export interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
  //   slug: string;
  //   released: Date;
  //   tba: boolean;
  //   rating: number;
  //   rating_top: number;
  //   ratings: AddedByStatus;
  //   ratings_count: number;
  //   reviews_text_count: string;
  //   added: number;
  //   added_by_status: AddedByStatus;
  //   playtime: number;
  //   suggestions_count: number;
  //   updated: Date;
  //   esrb_rating: EsrbRating;
  //   platforms: Platform[];
}

export interface AddedByStatus {}

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

// export interface Platform {
//   platform: EsrbRating;
//   released_at: string;
//   requirements: Requirements;
// }

export interface Requirements {
  minimum: string;
  recommended: string;
}
