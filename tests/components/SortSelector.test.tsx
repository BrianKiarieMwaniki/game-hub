import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import SortSelector from "./../../src/components/SortSelector";
import { mockZustandSelector } from "../utils/zustandHelper";
import useGameQuery from "../../src/store/store";

vi.mock("../../src/store/store", () => ({ default: vi.fn() }));

describe("SortSelector", () => {
  const renderSortSelectorComponent = () => {
    render(<SortSelector />);

    return {
      dropDown: screen.getByTestId("sort-dropdown"),
      menuList: screen.getByTestId("sort-menulist"),
    };
  };

  it("should render a dropdown button", () => {
    const { dropDown } = renderSortSelectorComponent();

    expect(dropDown).toBeInTheDocument();
  });

  it("should render menulist as hidden", () => {
    const { menuList } = renderSortSelectorComponent();

    expect(menuList).not.toBeVisible();
  });

  it("should set menulist to visible when drop is clicked", async () => {
    const { dropDown, menuList } = renderSortSelectorComponent();

    const user = userEvent.setup();
    await user.click(dropDown);
    await user.click(dropDown);
    await user.click(dropDown);

    expect(menuList).toBeVisible();
  });

  it("should call setSortOrder when menu item is clicked", async () => {
    const setSortOrderHandler = vi.fn();
    mockZustandSelector(useGameQuery, {
      gameQuery: {},
      setSortOrder: setSortOrderHandler,
    });

    renderSortSelectorComponent();

    const sortMenuItems = await screen.findAllByTestId("sort-menu-item");

    const user = userEvent.setup();
    await user.click(sortMenuItems[0]);

    expect(setSortOrderHandler).toHaveBeenCalled();
  });
});
