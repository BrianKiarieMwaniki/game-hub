import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGames from "./../../src/hooks/useGames";
import { games } from "../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("useGames", () => {
  it("should render a list of games", async () => {
    const { result } = renderHook(() => useGames(null));

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const gamesResult = result.current.data;
    expect(gamesResult.length).toBeGreaterThan(0);
    expect(gamesResult).toEqual(games);
  });

  it("should return error when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

    const { result } = renderHook(() => useGames(null));

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });
});
