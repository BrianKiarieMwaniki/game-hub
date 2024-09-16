import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useGameScreenshots from "./../../src/hooks/useGameScreenshots";
import { queryProviderWrapper } from "../utils/queryProviderHelper";
import { simulateError } from "../utils/serverUtils";

describe("useGameScreenshots", () => {
  const renderUseGameScreenshotsHook = async () => {
    const { result } = renderHook(() => useGameScreenshots(1), {
      wrapper: queryProviderWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    return { result };
  };

  it("should return a list of screenshots", async () => {
    const {result} = await renderUseGameScreenshotsHook();

    expect(result.current.data?.count).toBeGreaterThan(0);
    expect(result.current.data?.results).toBeDefined();
  });

  it("should return an error if there is one", async () => {
    simulateError("/games/1/screenshots");

    const {result } = await renderUseGameScreenshotsHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBeDefined();
  });
});
