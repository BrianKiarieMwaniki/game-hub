import { Platform } from "../common.types";
import APIClient from "./apiClient";

export default new APIClient<Platform>("/platforms/lists/parents");