export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
  page?: any;
}

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}
