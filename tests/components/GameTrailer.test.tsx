import { QueryClient } from "@tanstack/react-query";
import '@testing-library/jest-dom/vitest';
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import { simulateEmptyReturn, simulateError } from "../utils/serverUtils";
import GameTrailer from "./../../src/components/GameTrailer";

describe("GameTrailer", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        initialData: undefined,
        staleTime: 0,
      },
    },
  });

  const renderComponent = () => {
    renderWithQueryClient(queryClient, <GameTrailer gameId={1} />);
  };

  it("should render a trailer", async () => {
    renderComponent();

    const video = await screen.findByRole("video", { name: /trailer/i });

    expect(video).toBeInTheDocument();
  });

  it("should render no element when data is empty", async () => {
    simulateEmptyReturn("https://api.rawg.io/api/games/1/movies");

    renderComponent();

    const video = await screen.findByRole("video", { name: /trailer/i });

    expect(video).not.toBeInTheDocument();
  });

  it("should throw an error when error is found", () => {
    simulateError("https://api.rawg.io/api/games/1/movies");

    expect(() => renderComponent()).toThrowError();
  });
});
