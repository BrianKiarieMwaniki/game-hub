export interface GameQuery {
  genreId?: number ;
  platformId?: number;
  sortOrder: string;
  searchText: string;
  page?: any;
}

export interface Identity{
  id:number;
  name:string;
}

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

export interface Game extends Identity {
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
  rating_top: number;
}

export interface Platform extends Identity{
  slug: string;
}
export interface Genre extends Identity {
  slug: string;
  games_count: number;
  image_background: string;
}
