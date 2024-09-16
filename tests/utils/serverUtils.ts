import { delay, http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { baseUrl } from "../mocks/handlers";

export const simulateError = (endpoint: string) => {
  server.use(http.get(getFullUrl(endpoint), () => HttpResponse.error()));
};

export const simulateEmptyReturn = (endpoint: string) => {
  server.use(http.get(getFullUrl(endpoint), () => HttpResponse.json([])));
};

export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(getFullUrl(endpoint), async () => {
      await delay();

      return HttpResponse.json([]);
    })
  );
};

const getFullUrl = (endpoint: string) => `${baseUrl}/${endpoint}`;
