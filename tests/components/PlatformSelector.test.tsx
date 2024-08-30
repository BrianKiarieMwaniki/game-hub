import { QueryClient } from '@tanstack/react-query';
import '@testing-library/jest-dom/vitest';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Platform } from "../../src/common.types";
import { platforms } from "../../src/data";
import { renderWithQueryClient } from "../utils/queryProviderHelper";
import PlatformSelector from "./../../src/components/PlatformSelector";

describe("PlatformSelector", () => {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        retry: false,
        initialData: undefined,
        staleTime:0
      }
    }
  });
  const renderPlatformSelectorComponent = async (
    selectedPlatform?: Platform
  ) => {
    const onSelectPlatform = vi.fn();

    renderWithQueryClient(
      queryClient,
      <PlatformSelector
        onSelectPlatform={onSelectPlatform}
        selectedPlatformId={selectedPlatform?.id }
      />
    );

    return {
      onSelectPlatform,
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
   const {dropDown} = await renderPlatformSelectorComponent();

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

      expect(menuItem).toHaveTextContent(`${platform.name}`)
    });
  });  

  it("should call onSelectPlatform when menuItem is clicked", async () => {
    const { onSelectPlatform } = await renderPlatformSelectorComponent();

    //Get menu item to click
    const menuItem = await screen.findByTestId("platform-menuitem-1");

    const user = userEvent.setup();
    await user.click(menuItem);

    expect(onSelectPlatform).toHaveBeenCalled();
  });

  it("should render dropdown with platform name when selected platform is provided", async () => {
    const platform = platforms[0];
    const { dropDown } = await renderPlatformSelectorComponent(platform);

    expect(dropDown).toHaveTextContent(`${platform.name}`);
  });
});
