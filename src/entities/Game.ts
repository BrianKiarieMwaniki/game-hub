import { Identity } from "./Identity";
import { Platform } from "./Platform";

export interface Game extends Identity {
  slug: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
  rating_top: number;
  description_raw?: string;
}
