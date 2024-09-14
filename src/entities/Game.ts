import { Genre } from "./Genre";
import { Identity } from "./Identity";
import { Platform } from "./Platform";
import { Publisher } from "./Publisher";

export interface Game extends Identity {
  slug: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
  rating_top: number;
  description_raw: string;
  genres: Genre[];
  publishers: Publisher[];
}
