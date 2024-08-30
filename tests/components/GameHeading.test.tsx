import { describe, expect, it } from "vitest";
import { GameQuery } from "./../../src/common.types";
import { genres, platforms } from "./../mocks/data";
import { render, screen } from "@testing-library/react";
import GameHeading from "./../../src/components/GameHeading";
import React from "react";
import "@testing-library/jest-dom/vitest";
import queryProviderWrapper from "../utils/queryProviderWrapper";

describe("GameHeading", () => {
  const renderGameHeading =  async (gameQuery: GameQuery) => {
    render(
    <GameHeading gameQuery={gameQuery} />,{
      wrapper: queryProviderWrapper()
    });

    return {
      heading:await screen.findByTestId("game-heading"),
    };
  };

  it("should render just games when no platform and genre are specified", async () => {
    const gameQuery: GameQuery = {     
      sortOrder: "",
      searchText: "",
    };

    const { heading } = await renderGameHeading(gameQuery);

    expect(heading).toHaveTextContent("Games");
  });

  it("should render heading with genre name when genre is specified", async () => {
    const genre = genres[0];
    const gameQuery: GameQuery = {      
      genreId: genre.id,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = await renderGameHeading(gameQuery);

    const expectedHeading = `${genre.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with platform name when platform is specified", async () => {
    const platform = platforms[0];

    const gameQuery: GameQuery = {
      platformId: platform.id,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = await renderGameHeading(gameQuery);

    const expectedHeading = `${platform.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with both platform name and genre name when both platform and genre are specified",async () => {
    const platform = platforms[0];
    const genre = genres[0];
    const gameQuery: GameQuery = {
      platformId: platform.id,
      genreId: genre.id,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = await renderGameHeading(gameQuery);

    const expectedHeading = `${platform.name} ${genre.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });
});
