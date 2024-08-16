import { describe, expect, it } from "vitest";
import { GameQuery } from "./../../src/common.types";
import { genres, platforms } from "./../mocks/data";
import { render, screen } from "@testing-library/react";
import GameHeading from "./../../src/components/GameHeading";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("GameHeading", () => {
  const renderGameHeading = (gameQuery: GameQuery) => {
    render(<GameHeading gameQuery={gameQuery} />);

    return {
      heading: screen.getByTestId("game-heading"),
    };
  };

  it("should render just games when no platform and genre are specified", () => {
    const gameQuery: GameQuery = {
      platform: null,
      genre: null,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = renderGameHeading(gameQuery);

    expect(heading).toHaveTextContent("Games");
  });

  it("should render heading with genre name when genre is specified", () => {
    const genre = genres[0];
    const gameQuery: GameQuery = {
      platform: null,
      genre: genre,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = renderGameHeading(gameQuery);

    const expectedHeading = `${genre.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with platform name when platform is specified", () => {
    const platform = platforms[0];

    const gameQuery: GameQuery = {
      platform: platform,
      genre: null,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = renderGameHeading(gameQuery);

    const expectedHeading = `${platform.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with both platform name and genre name when both platform and genre are specified", () => {
    const platform = platforms[0];
    const genre = genres[0];
    const gameQuery: GameQuery = {
      platform: platform,
      genre: genre,
      sortOrder: "",
      searchText: "",
    };

    const { heading } = renderGameHeading(gameQuery);

    const expectedHeading = `${platform.name} ${genre.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
  });
});
