import { http, HttpResponse } from "msw";
import { games, genres, platforms } from "./data";
import { Game } from "../../src/entities";

export const baseUrl = "https://api.rawg.io/api";

export const handlers = [
  http.get(`${baseUrl}/games`, () => {
    return HttpResponse.json({
      count: games.length,
      results: games,
    });
  }),

  http.get(`${baseUrl}/games/:slug`, ({ params }) => {
    const { slug } = params;

    const game = games.find((game) => game.slug === slug);

    if (!game) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Game not found",
      });
    }

    return HttpResponse.json(game);
  }),

  http.get(`${baseUrl}/genres`, () => {
    return HttpResponse.json({
      count: genres.length,
      results: genres,
    });
  }),

  http.get(`${baseUrl}/platforms/lists/parents`, () => {
    return HttpResponse.json({
      count: platforms.length,
      results: platforms,
    });
  }),
];
