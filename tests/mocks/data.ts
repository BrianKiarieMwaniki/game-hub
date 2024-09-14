import { Game, Genre, Platform } from "./../../src/entities";

const placeHolderImageUrl = "https://via.placeholder.com/300x200";

export const genres: Genre[] = [
  {
    id: 0,
    name: "Action",
    slug: "action",
    games_count: 10,
    image_background: placeHolderImageUrl,
  },
  {
    id: 1,
    name: "Adventure",
    slug: "adventure",
    games_count: 20,
    image_background: placeHolderImageUrl,
  },
  {
    id: 2,
    name: "Shooter",
    slug: "shooter",
    games_count: 17,
    image_background: placeHolderImageUrl,
  },
  {
    id: 3,
    name: "Racing",
    slug: "racing",
    games_count: 11,
    image_background: placeHolderImageUrl,
  },
];

export const games: Game[] = [
  {
    id: 0,
    slug: "grand-theft-auto-v",
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
    rating_top: 4,
    description_raw: "Fantastic game",
    genres: [genres[0], genres[2]],
    publishers: [{ id: 11, name: "ROCKSTAR GAMES" }],
  },
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    slug: "witcher-3-wild-hunt",
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
    rating_top: 5,
    description_raw: "Very good game",
    genres: [genres[0], genres[1]],
    publishers: [{ id: 1, name: "CD PROJEKT RED" }],
  },
  {
    id: 2,
    name: "Portal 2",
    slug: "portal-2",
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
    rating_top: 4,
    description_raw: "One of the best games ever",
    genres: [genres[0], genres[1]],
    publishers: [
      { id: 4, name: "Electronic Arts" },
      { id: 5, name: "Valve" },
    ],
  },
];

export const platforms: Platform[] = [
  {
    id: 0,
    name: "Nintendo",
    slug: "nintendo",
  },
  {
    id: 1,
    name: "PC",
    slug: "pc",
  },
  {
    id: 2,
    name: "XBox",
    slug: "xbox",
  },
  {
    id: 3,
    name: "Play Station",
    slug: "play station",
  },
];
