import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGenres from "./../../src/hooks/useGenres";

describe("useGenres", () => {
  it("should return a list of genres", async () => {
    const { result } = renderHook(() => useGenres());

    await waitFor(() => {
      const genreResults = result.current.data;
      expect(genreResults.length).toBeGreaterThan(0);
      
    });
  });

 
});
