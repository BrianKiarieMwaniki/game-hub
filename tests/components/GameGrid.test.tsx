import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GameGrid from "./../../src/components/GameGrid";
import React from "react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { GameQuery } from "../../src/common.types";
import "@testing-library/jest-dom/vitest";

describe("GameGrid", () => {
  const renderGameGridComponent = () =>{
    const gameQuery: GameQuery = {genre: null, platform: null, sortOrder: ""};
    render(<GameGrid gameQuery={gameQuery}/>)

  };

  it("should render the list of games", async () => {
    renderGameGridComponent();

    const gameGrid = await screen.findByTestId('game-grid');
    const gameCards = await screen.findAllByTestId('game-card');
    
    expect(gameGrid).toBeInTheDocument();
    expect(gameCards.length).toBeGreaterThan(0);
    expect(gameGrid).toContainElement(gameCards[0]);
  });

  it("should not render games when no games are found", async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.json([]))
    );

    renderGameGridComponent();

    const message = await screen.findByText(/no games/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/no games/i);
  });

  it('should render an error message when there is an error', async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

     renderGameGridComponent();

     expect(await screen.findByText(/error/i)).toBeInTheDocument();
  })
});
