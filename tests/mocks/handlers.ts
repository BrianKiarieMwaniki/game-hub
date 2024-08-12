import { http, HttpResponse } from "msw";
import { games } from "./data";

export const handlers = [
  http.get("https://api.rawg.io/api/games", () => {
    return HttpResponse.json({
      count: 3,
      results: games,
    });
  }),
];


