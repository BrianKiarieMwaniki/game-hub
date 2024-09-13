import { Genre } from "../entities/Genre";
import APIClient from "./apiClient";

export default new APIClient<Genre>("/genres");
