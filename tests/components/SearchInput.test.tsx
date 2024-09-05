import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchInput from "./../../src/components/SearchInput";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";

describe("SearchInput", () => {
  const renderSearchInput = () => {    

    render(<SearchInput/>);

    return {      
      searchInput: screen.getByTestId("search-input"),
    };
  };

  it("should render a search input", () => {
    const { searchInput } = renderSearchInput();

    expect(searchInput).toBeInTheDocument();
  }); 
 
});
