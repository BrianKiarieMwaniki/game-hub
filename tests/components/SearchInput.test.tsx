import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchInput from "./../../src/components/SearchInput";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";

describe("SearchInput", () => {
  const renderSearchInput = () => {
    const onSearch = vi.fn();

    render(<SearchInput onSearch={onSearch} />);

    return {
      onSearch,
      searchInput: screen.getByTestId("search-input"),
    };
  };

  it("should render a search input", () => {
    const { searchInput } = renderSearchInput();

    expect(searchInput).toBeInTheDocument();
  });

  it("should call onSearch when if input is pressed", async () => {
    const { onSearch, searchInput } = renderSearchInput();

    const searchTerm = "test";
    const user = userEvent.setup();
    await user.type(searchInput, searchTerm + "{enter}");

    expect(onSearch).toHaveBeenCalledWith(searchTerm);
  });
 
});
