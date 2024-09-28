import { Platform } from "../entities";
import APIClient from "./apiClient";

export default new APIClient<Platform>("/platforms/lists/parents");
