import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useTrailers from "./../../src/hooks/useTrailers";
import { simulateError } from "../utils/serverUtils";
import { queryProviderWrapper } from "../utils/queryProviderHelper";

describe("useTrailers", () => {
  const trailersUrl = "https://api.rawg.io/api/games/1/movies";

  const renderUseTrailersHook = () => {
    const { result } = renderHook(() => useTrailers(1), {
      wrapper: queryProviderWrapper(),
    });

    return { result };
  };

  it("should return a list of trailers", async () => {
    const { result } = renderUseTrailersHook();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.results).toBeDefined();
    expect(result.current.data!.count).toBeGreaterThan(0);
    expect(result.current.data!.results.length).toBeGreaterThan(0);
  });

  it("should return an error when error occurs", async () => {
    simulateError(trailersUrl);

    const { result } = renderUseTrailersHook();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeDefined();
    expect(result.current.isError).toBe(true);
  });
});
