import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useGenres from "./../../src/hooks/useGenres";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { genres } from "../mocks/data";

describe("useGenres", () => {
  it("should return a list of genres", async () => {
    const { result } = renderHook(() => useGenres());

    await waitFor(() => {
      const genreResults = result.current.data;
      expect(genreResults.length).toBeGreaterThan(0);
      expect(genreResults).toEqual(genres);
    });
  });

  it("should return error when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/genres", () => HttpResponse.error())
    );

    const { result } = renderHook(() => useGenres());

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });
});
