import { QueryClient } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { platforms } from "../../src/data";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import PlatformSelector from "./../../src/components/PlatformSelector";
import useGameQuery from "../../src/store/store";
import { mockZustandSelector } from "../utils/zustandHelper";

vi.mock("./../../src/store/store", () => ({
  default: vi.fn(),
}));

describe("PlatformSelector", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        initialData: undefined,
        staleTime: 0,
      },
    },
  });
  const renderPlatformSelectorComponent = async () => {
    renderWithQueryClient(queryClient, <PlatformSelector />);

    return {
      dropDown: await screen.findByTestId("platforms-dropdown"),
      menuList: await screen.findByTestId("platforms-menulist"),
    };
  };

  it("should render a dropdown button", async () => {
    const { dropDown } = await renderPlatformSelectorComponent();

    expect(dropDown).toBeInTheDocument();
  });

  it("should render menulist as hidden", async () => {
    const { menuList } = await renderPlatformSelectorComponent();

    expect(menuList).not.toBeVisible();
  });

  it("should set menulist to visible when dropdown is clicked", async () => {
    const { dropDown } = await renderPlatformSelectorComponent();

    const user = userEvent.setup();
    await user.tripleClick(dropDown);
    await user.click(dropDown);
    await user.click(dropDown);

    const menuList = await screen.findByTestId("platforms-menulist");

    expect(menuList).toBeVisible();
  });

  it("should render a list of platforms", async () => {
    const { menuList } = await renderPlatformSelectorComponent();

    expect(menuList).toBeInTheDocument();

    platforms.forEach(async (platform) => {
      const menuItem = await screen.findByTestId(
        `platform-menuitem-${platform.id}`
      );

      expect(menuItem).toHaveTextContent(`${platform.name}`);
    });
  });

  it('should call setPlatformId when menu item is clicked', async () => {
    const setPlatformIdHanlder = vi.fn();
    mockZustandSelector(useGameQuery, {
      gameQuery: {},
      setPlatformId: setPlatformIdHanlder
    })

    await renderPlatformSelectorComponent();

    //Get menu item to click
    const menuItem = await screen.findByTestId("platform-menuitem-1");

    const user = userEvent.setup();
    await user.click(menuItem);


    expect(setPlatformIdHanlder).toHaveBeenCalled();
  })

  it('should render drop down with selected platform name', async () => {
    const platform = platforms[0];
    mockZustandSelector(useGameQuery, {
      gameQuery:{
        platformId: platform.id
      }
    });

    const {dropDown} = await renderPlatformSelectorComponent();

    expect(dropDown).toHaveTextContent(platform.name);
  })
});
