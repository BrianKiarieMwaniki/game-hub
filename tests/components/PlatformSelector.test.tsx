import { describe, expect, it } from "vitest";
import PlatformSelector from "./../../src/components/PlatformSelector";
import { render, screen } from "@testing-library/react";
import React from "react";
import { platforms } from "../mocks/data";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

describe("PlatformSelector", () => {
  const renderPlatformSelectorComponent = async () => {
    render(<PlatformSelector />);

    return {
      dropDown: await screen.findByTestId("platforms-dropdown"),
      menuList: await screen.findByTestId("platforms-menulist"),
    };
  };

  it("should render a dropdown button", async () => {
    const { dropDown } = await renderPlatformSelectorComponent();

    expect(dropDown).toBeInTheDocument();
  });

  it('should render menulist as hidden', async() =>{
    const {menuList} = await renderPlatformSelectorComponent();

    expect(menuList).not.toBeVisible();
  })

  it('should set menulist to visible when dropdown is clicked', async () => {
    render(<PlatformSelector/>);

    const dropDown = screen.getByTestId('platforms-dropdown');

    const user = userEvent.setup();
    await user.tripleClick(dropDown);
    await user.click(dropDown);
    await user.click(dropDown);

    const menuList = await screen.findByTestId("platforms-menulist");

    expect(menuList).toBeVisible();

  })

  it("should render a list of platforms", async () => {
    const { menuList } = await renderPlatformSelectorComponent();

    expect(menuList).toBeInTheDocument();

    platforms.forEach(async (platform) => {
      const menuItem = await screen.findByTestId(
        `platform-menuitem-${platform.id}`
      );

      expect(menuItem).toBeInTheDocument();
    });
  });

    it("should not render anything when there is an error", async () => {
      server.use(
        http.get("https://api.rawg.io/api/platforms/lists/parents", () => HttpResponse.error())
      );

      render(<PlatformSelector/>);

      const menuList = await screen.findByTestId('platforms-menulist');

      expect(menuList).not.toBeInTheDocument();
    });
});
