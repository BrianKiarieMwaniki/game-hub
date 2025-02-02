import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import { simulateEmptyReturn, simulateError } from "../utils/serverUtils";
import GameTrailer from "./../../src/components/GameTrailer";

describe("GameTrailer", () => {
  const renderComponent = () => {
    renderWithQueryClient(<GameTrailer gameId={1} />);
  };

  it("should render a trailer", async () => {
    renderComponent();

    const video = await screen.findByRole("video", { name: /trailer/i });

    expect(video).toBeInTheDocument();
  });

  it("should render no element when data is empty", async () => {
    simulateEmptyReturn("/games/1/movies");

    renderComponent();

    const video = await screen.findByRole("video", { name: /trailer/i });

    expect(video).not.toBeInTheDocument();
  });

  it("should throw an error when error is found", () => {
    simulateError("/games/1/movies");

    expect(() => renderComponent()).toThrowError();
  });
});
