import { http, HttpResponse } from "msw";
import { games, genres } from "./data";

export const baseUrl = "https://api.rawg.io/api";

export const handlers = [
  http.get(`${baseUrl}/games`, () => {
    return HttpResponse.json({
      count: games.length,
      results: games,
    });
  }),

  http.get(`${baseUrl}/genres`, () => {
    return HttpResponse.json({
      count: genres.length,
      results: genres,
    });
  }),
];
