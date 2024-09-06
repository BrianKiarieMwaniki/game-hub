import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GameQuery } from "../../src/common.types";
import useGameQuery from "../../src/store/store";

describe("store", () => {
  it("should have initial game query as an empty object", async () => {
    const { result } = await renderHook(() => useGameQuery());

    const expectedEmptyState = {} as GameQuery;
    expect(result.current.gameQuery).toEqual(expectedEmptyState);
  });

  it("should set searchText when setSearchTextIsCalled", async () => {
    const { result } = await renderHook(() => useGameQuery());

    act(() => result.current.setSearchText("game1"));

    expect(result.current.gameQuery.searchText).toBe("game1");
  });

  it("should reset all properties when searchText is set", async () => {
    // Arrange
    const { result } = await renderHook(() => useGameQuery());
    act(() => result.current.setGenreId(1));
    act(() => result.current.setPlatformId(1));
    act(() => result.current.setSortOrder("asc"));

    // Act
    act(() => result.current.setSearchText("game1"));

    // Assert
    expect(result.current.gameQuery.genreId).toBe(undefined);
    expect(result.current.gameQuery.platformId).toBe(undefined);
    expect(result.current.gameQuery.sortOrder).toBe(undefined);
  });

  it("should set genreId when setGenreId is called ", async () => {
    const { result } = await renderHook(() => useGameQuery());

    act(() => result.current.setGenreId(1));

    expect(result.current.gameQuery.genreId).toBe(1);
  });

  it("should set platformId when setPlatformId is called ", async () => {
    const { result } = await renderHook(() => useGameQuery());

    act(() => result.current.setPlatformId(1));

    expect(result.current.gameQuery.platformId).toBe(1);
  });

  it("should set sort order when setSortOrder is called ", async () => {
    const { result } = await renderHook(() => useGameQuery());

    act(() => result.current.setSortOrder("asc"));

    expect(result.current.gameQuery.sortOrder).toBe("asc");
  });
});
