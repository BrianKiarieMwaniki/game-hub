import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import SortSelector from "./../../src/components/SortSelector";
import userEvent from "@testing-library/user-event";

describe("SortSelector", () => {
  const renderSortSelectorComponent = (sortOrder:string) => {
    const onSelectSortOrder = vi.fn();
    render(<SortSelector sortOrder={sortOrder}  onSelectSortOrder={onSelectSortOrder}/>);

    return {
      onSelectSortOrder,
      dropDown: screen.getByTestId("sort-dropdown"),
      menuList: screen.getByTestId("sort-menulist"),
    };
  };

  it("should render a dropdown button", () => {
    const { dropDown } = renderSortSelectorComponent("");

    expect(dropDown).toBeInTheDocument();
  });

  it("should render menulist as hidden", () => {
    const { menuList } = renderSortSelectorComponent("");

    expect(menuList).not.toBeVisible();
  });

  it('should set menulist to visible when drop is clicked', async() => {
    const { dropDown, menuList} = renderSortSelectorComponent("");

    const user = userEvent.setup();
    await user.click(dropDown);
    await user.click(dropDown);
    await user.click(dropDown);

    expect(menuList).toBeVisible();
  });

  it('should call onSelectSortOrder when menuitem is clicked', async () => {
    const {onSelectSortOrder} = renderSortSelectorComponent("");

    const menuItems = await screen.findAllByTestId('sort-menu-item');

    const user = userEvent.setup();
    await user.click(menuItems[0]);

    expect(onSelectSortOrder).toHaveBeenCalled();
  })
});
