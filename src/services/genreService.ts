import { Genre } from "../common.types";
import APIClient from "./apiClient";

 export default new APIClient<Genre>('/genres');