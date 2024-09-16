import { http, HttpResponse } from "msw";
import {
  gameScreenshots,
  mockGamesList,
  mockGenreList,
  mockPlatformsList,
  mockTrailerList,
} from "./data";

export const baseUrl = "https://api.rawg.io/api";

export const handlers = [
  http.get(`${baseUrl}/games`, () => {
    return HttpResponse.json({
      count: mockGamesList.length,
      results: mockGamesList,
    });
  }),

  http.get(`${baseUrl}/games/:slug`, ({ params }) => {
    const { slug } = params;

    const game = mockGamesList.find((game) => game.slug === slug);

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
      count: mockGenreList.length,
      results: mockGenreList,
    });
  }),

  http.get(`${baseUrl}/platforms/lists/parents`, () => {
    return HttpResponse.json({
      count: mockPlatformsList.length,
      results: mockPlatformsList,
    });
  }),

  http.get(`${baseUrl}/games/1/movies`, () => {
    return HttpResponse.json({
      count: mockTrailerList.length,
      results: mockTrailerList,
    });
  }),

  http.get(`${baseUrl}/games/1/screenshots`, () =>
    HttpResponse.json({
      count: gameScreenshots.length,
      results: gameScreenshots,
    })
  ),
];
