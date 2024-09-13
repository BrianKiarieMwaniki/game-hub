import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGame from "./../../src/hooks/useGame";
import { queryProviderWrapper } from "../utils/queryProviderHelper";
import { games } from "../mocks/data";

describe("useGame", () => {
  const renderUseGameHook = (slug: string) => {
    const { result } = renderHook(() => useGame(slug), {
      wrapper: queryProviderWrapper(),
    });

    return {result};
  };

  it('should return a game when slug is correct', async() => {
    const game = games[0];
    const {result} = renderUseGameHook(game.slug);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual(game);
  })

  it('should return error when slug is incorrect', async() => {
    const {result} = renderUseGameHook('no-slug');

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();    
  })
});
