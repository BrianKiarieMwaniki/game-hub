import { http, HttpResponse } from "msw";
import { Game } from "../../src/common.types";

export const handlers = [
  http.get("https://api.rawg.io/api/games", () => {
    return HttpResponse.json({
      count: 3,
      results: games,
    });
  }),
];


const games: Game[] = [
  {
    id: 0,
    name: "Grand Theft Auto V",
    background_image: "https://via.placeholder.com/300x200",
    metacritic: 92,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "PC",
          slug: "pc",
        },
      },
      {
        platform: {
          id: 2,
          name: "PlayStation",
          slug: "playstation",
        },
      },
      {
        platform: {
          id: 3,
          name: "Xbox",
          slug: "xbox",
        },
      },
    ],
  },
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://via.placeholder.com/300x200",
    metacritic: 92,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "PC",
          slug: "pc",
        },
      },
      {
        platform: {
          id: 2,
          name: "PlayStation",
          slug: "playstation",
        },
      },
      {
        platform: {
          id: 3,
          name: "Xbox",
          slug: "xbox",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Portal 2",
    background_image: "https://via.placeholder.com/300x200",
    metacritic: 95,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "PC",
          slug: "pc",
        },
      },
      {
        platform: {
          id: 2,
          name: "PlayStation",
          slug: "playstation",
        },
      },
      {
        platform: {
          id: 3,
          name: "Xbox",
          slug: "xbox",
        },
      },
    ],
  },
];