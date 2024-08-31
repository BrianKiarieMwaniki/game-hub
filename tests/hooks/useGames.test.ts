import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGames from "./../../src/hooks/useGames";
import { games } from "../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { GameQuery } from "../../src/common.types";
import {queryProviderWrapper} from './../utils/queryProviderHelper';

describe("useGames", () => {

  const renderuseGamesHook = () =>
  {
    const gameQuery: GameQuery = {sortOrder: "", searchText:""};
    const {result } = renderHook(() => useGames(gameQuery), {
      wrapper: queryProviderWrapper()
    });

    return {result};
  }
  it("should render a list of games", async () => {
    const { result } = renderuseGamesHook();

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const gamesResult = result.current.data;
    expect(gamesResult).toBeDefined();
    expect(gamesResult!.pages).not.toBeUndefined();
    expect(gamesResult?.pages.flatMap(page => page)).toEqual(games);
  });

  it("should return error when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

    const { result } = renderuseGamesHook();

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });
});
