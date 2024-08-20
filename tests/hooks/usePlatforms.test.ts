import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import usePlatforms from "./../../src/hooks/usePlatforms";
import platforms from "../../src/data/platforms";

describe("usePlatforms", () => {
  it("should return a list of platforms", async () => {
    const { result } = renderHook(() => usePlatforms());    

    expect(result.current.data.length).toBeGreaterThan(0);
    expect(result.current.data).toEqual(platforms);
  });


});
