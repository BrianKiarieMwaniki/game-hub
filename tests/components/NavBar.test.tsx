import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NavBar from "../../src/components/NavBar";
import React from "react";

describe("Navbar", () => {
  it("should render with logo", () => {
    render(<NavBar />);

    const logo = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "logo");
  });

  it("should render color mode switch", () => {
    render(<NavBar />);

    const colorModeSwitch = screen.getAllByRole("checkbox");
    const label = screen.getAllByText(/dark mode/i);

    expect(colorModeSwitch[0]).toBeInTheDocument();
    expect(colorModeSwitch[0]).toHaveAttribute("type", "checkbox");

    expect(label[0]).toBeInTheDocument();
    expect(label[0]).toHaveTextContent(/Dark Mode/);
  });
});
