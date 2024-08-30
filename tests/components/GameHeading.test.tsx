import { QueryCache, QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import { GameQuery } from "./../../src/common.types";
import GameHeading from "./../../src/components/GameHeading";
import { genres, platforms } from "../../src/data";

describe("GameHeading", () => {
  const queryCache = new QueryCache();
  const queryclient = new QueryClient({
    queryCache: queryCache,
    defaultOptions:{
      queries:{
        retry: false,
        initialData: undefined,
        staleTime:0
      }
    },

  });
  const renderGameHeading =  async (gameQuery: GameQuery) => {
   renderWithQueryClient(
      queryclient,
      <GameHeading gameQuery={gameQuery}/>
    )

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
    const genre = genres[1];
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

    const {heading } = await renderGameHeading(gameQuery);

    const expectedHeading = `${platform.name} ${genre.name} Games`;

    expect(heading).toHaveTextContent(expectedHeading);
    
  });
});
