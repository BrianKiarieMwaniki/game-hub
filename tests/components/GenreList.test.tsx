import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GenreList from "./../../src/components/GenreList";
import { genres } from "../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import userEvent from '@testing-library/user-event';

describe("GenreList", () => {
  const renderGenreListComponent = async () => {
    const onSelectGenre = vi.fn();
    render(<GenreList onSelectGenre={onSelectGenre} selectedGenre={null} />);

    return {
      onSelectGenre,
      genreList: await screen.findByTestId("genre-list"),
    };
  };

  it("should render the list of genres", async () => {
    const { genreList } = await renderGenreListComponent();

    expect(genreList).toBeInTheDocument();

    genres.forEach(async (genre) => {
      const genreListItem = await screen.findByTestId(`genre-item-${genre.id}`);
      expect(genreList).toContainElement(genreListItem);
    });
  });

  it("should not render anything when there is an error", async () => {
    server.use(
      http.get("https://api.rawg.io/api/genres", () => HttpResponse.error())
    );

    const { genreList } = await renderGenreListComponent();

    expect(genreList).toBeEmptyDOMElement();
  });

  it('Should call onSelectGenre when list item is clicked', async() => {
    const {onSelectGenre} = await renderGenreListComponent();

    const button = await screen.findByRole('button', {name: `${genres[0].name}`})
    const user = userEvent.setup();
    await user.click(button);

    expect(onSelectGenre).toHaveBeenCalled();
  })
});
