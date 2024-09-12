import { QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import React from "react";
import { describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import GameGrid from "./../../src/components/GameGrid";

describe("GameGrid", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        initialData: undefined,
        staleTime: 0,
      },
    },
  });
  const renderGameGridComponent = async () => {  
    renderWithQueryClient(queryClient, <GameGrid />);

    return {
      gameGrid: await screen.findByTestId("game-grid"),
      gameCards: await screen.findAllByTestId("game-card"),
    };
  };

  it("should render the list of games", async () => {
    const { gameGrid, gameCards } = await renderGameGridComponent();

    await waitFor(() => {
      expect(gameGrid).toBeInTheDocument();
    });
    expect(gameCards.length).toBeGreaterThan(0);
    expect(gameGrid).toContainElement(gameCards[0]);
  });

  it("should render no games message when no games are found", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.json([]))
    );

    await renderGameGridComponent();

    const message = await screen.findByText(/no games/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/no games/i);
  });

  it("should render an error message when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

    await renderGameGridComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
