import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import GenreList from "./../../src/components/GenreList";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import { queryProviderWrapper } from "../utils/queryProviderHelper";
import { mockZustandSelector } from "../utils/zustandHelper";
import useGameQuery from "../../src/store/store";
import genres from "../../src/data/genres";

vi.mock("./../../src/store/store", () => ({
  default: vi.fn(),
}));

describe("GenreList", () => {
  const renderGenreListComponent = async () => {
    render(<GenreList />, {
      wrapper: queryProviderWrapper(),
    });

    return {
      genreList: await screen.findByTestId("genre-list"),
    };
  };

  it("should render a heading", async () => {
    await renderGenreListComponent();

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/genres/i);
  });

  it("should render the list of genres", async () => {
    const { genreList } = await renderGenreListComponent();

    expect(genreList).toBeInTheDocument();

    genres.forEach(async (genre) => {
      const genreListItem = await screen.findByTestId(`genre-item-${genre.id}`);
      expect(genreList).toContainElement(genreListItem);
    });
  });

  it("Should call setGenreId when list item is clicked", async () => {
    const setGenreIdHandler = vi.fn();
    mockZustandSelector(useGameQuery, {
      gameQuery: {},
      setGenreId: setGenreIdHandler,
    });

    await renderGenreListComponent();

    const button = await screen.findAllByRole("button");

    const user = userEvent.setup();
    await user.click(button[0]);

    expect(setGenreIdHandler).toHaveBeenCalled();
  });
});
