import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

export const simulateError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()));
};

export const simulateEmptyReturn = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.json([])));
};
