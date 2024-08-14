import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { platforms } from "../mocks/data";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import usePlatforms from "./../../src/hooks/usePlatforms";

describe("usePlatforms", () => {
  it("should return a list of platforms", async () => {
    const { result } = renderHook(() => usePlatforms());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(platforms);
  });

  it("should return error when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/platforms/lists/parents", () =>
        HttpResponse.error()
      )
    );

    const { result } = renderHook(() => usePlatforms());

    // Assert that the initial state is loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).not.toBeNull();
  });
});
