import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.rawg.io/api/games", () => {
    return HttpResponse.json({
      count: 3,
      results: [
        { id: 1, name: "FIFA" },
        { id: 2, name: "GTA" },
        { id: 3, name: "Minecraft" },
      ],
    });
  }),
];
