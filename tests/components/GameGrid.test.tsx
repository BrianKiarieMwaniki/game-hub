import "@testing-library/jest-dom/vitest";
import {
  screen
} from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import GameGrid from "./../../src/components/GameGrid";

describe("GameGrid", () => {
  
  const renderGameGridComponent = () => {
    renderWithQueryClient(      
      <MemoryRouter>
        <GameGrid />
      </MemoryRouter>
    );

    return {
      getGameGrid: () => screen.queryByTestId("game-grid"),
      getGameCards: () => screen.queryAllByTestId("game-card"),
    };
  };

  it("should render a list of skeletons when fetching games", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", async () => {
        await delay();

        return HttpResponse.json([]);
      })
    );

    renderGameGridComponent();

    const skeletons = await screen.findAllByRole("progressbar");

    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render the list of games", async () => {
    renderGameGridComponent();

    const gameGrid = await screen.findByTestId("game-grid");
    expect(gameGrid).toBeInTheDocument();

    const gameCards = await screen.findAllByTestId("game-card");

    expect(gameCards.length).toBeGreaterThan(0);
    expect(gameGrid).toContainElement(gameCards[0]);
  });

  it("should render an error message when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

    renderGameGridComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
