import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GameGrid from "./../../src/components/GameGrid";
import React from "react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

describe("GameGrid", () => {
  it("should render the list of games", async () => {
    render(<GameGrid selectedGenre={null} />);

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

    render(<GameGrid selectedGenre={null}/>);

    const message = await screen.findByText(/no games/i);

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent(/no games/i);
  });

  it('should render an error message when there is an error', async () => {
    server.use(
      http.get("https://api.rawg.io/api/games", () => HttpResponse.error())
    );

     render(<GameGrid selectedGenre={null}/>);

     expect(await screen.findByText(/error/i)).toBeInTheDocument();
  })
});
