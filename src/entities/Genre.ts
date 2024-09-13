import { Identity } from "./Identity";

export interface Genre extends Identity {
  slug: string;
  games_count: number;
  image_background: string;
}
