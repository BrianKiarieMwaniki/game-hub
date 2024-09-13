import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { games } from "../mocks/data";
import { server } from "../mocks/server";
import useGames from "./../../src/hooks/useGames";
import { queryProviderWrapper } from "./../utils/queryProviderHelper";

describe("useGames", () => {
  const renderUseGamesHook = () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: queryProviderWrapper(),
    });

    return { result };
  };
  it("should render a list of games", async () => {
    const { result } = renderUseGamesHook();

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const gamesResult = result.current.data;
    expect(gamesResult).toBeDefined();
    expect(gamesResult!.pages).not.toBeUndefined();
    expect(gamesResult?.pages.flatMap((page) => page)).toEqual(games);
  });

  it("should return error when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

    const { result } = renderUseGamesHook();

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });
});
