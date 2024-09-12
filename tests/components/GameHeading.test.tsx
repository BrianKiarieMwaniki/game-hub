import { QueryCache, QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { genres, platforms } from "../../src/data";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import GameHeading from "./../../src/components/GameHeading";
import useGameQuery from "./../../src/store/store";
import { mockZustandSelector } from "../utils/zustandHelper";

vi.mock("./../../src/store/store", () => ({
  default: vi.fn(),
}));

describe("GameHeading", () => {
  const queryCache = new QueryCache();
  const queryclient = new QueryClient({
    queryCache: queryCache,
    defaultOptions: {
      queries: {
        retry: false,
        initialData: undefined,
        staleTime: 0,
      },
    },
  });
  const renderGameHeading = async () => {
    renderWithQueryClient(queryclient, <GameHeading />);

    return {
      heading: await screen.findByTestId("game-heading"),
    };
  };

  it("should render just games when no platform and genre are specified", async () => {
    const { heading } = await renderGameHeading();

    expect(heading).toHaveTextContent("Games");
  });

  it("should render heading with genre name when genre is specified", async () => {
    // Arrange
    const genre = genres[1];
    const expectedHeading = `${genre.name} Games`;

    mockZustandSelector(useGameQuery, {
      gameQuery: {
        genreId: genre.id,
      },
    });

    // Act
    const { heading } = await renderGameHeading();

    // Assert
    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with platform name when platform is specified", async () => {
    // Arrange
    const platform = platforms[0];
    const expectedHeading = `${platform.name} Games`;

    mockZustandSelector(useGameQuery, {
      gameQuery: {
        platformId: platform.id,
      },
    });

    // Act
    const { heading } = await renderGameHeading();

    // Assert
    expect(heading).toHaveTextContent(expectedHeading);
  });

  it("should render heading with both platform name and genre name when both platform and genre are specified", async () => {
    // Arrange
    const platform = platforms[0];
    const genre = genres[0];
    const expectedHeading = `${platform.name} ${genre.name} Games`;

    mockZustandSelector(useGameQuery, {
      gameQuery: {
        genreId: genre.id,
        platformId: platform.id,
      },
    });

    // Act
    const { heading } = await renderGameHeading();

    // Assert
    expect(heading).toHaveTextContent(expectedHeading);
  });
});
