import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGenres from "./../../src/hooks/useGenres";
import queryProviderWrapper from "../utils/queryProviderWrapper";

describe("useGenres", () => {
  it("should return a list of genres", async () => {
    const { result } = renderHook(() => useGenres(), {
      wrapper: queryProviderWrapper()
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    });

    const genreResults = result.current.genres;
    expect(genreResults).toBeDefined();
    expect(genreResults!.length).toBeGreaterThan(0);      
  });

 
});
