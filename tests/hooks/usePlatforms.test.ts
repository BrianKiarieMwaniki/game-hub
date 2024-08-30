import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePlatforms from "./../../src/hooks/usePlatforms";
import {queryProviderWrapper} from "../utils/queryProviderHelper";

describe("usePlatforms", () => {
  it("should return a list of platforms", async () => {
    const { result } = renderHook(() => usePlatforms(), {
      wrapper: queryProviderWrapper()
    });    

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeDefined();
    expect(result.current.data!.length).toBeGreaterThan(0);
  });


});
