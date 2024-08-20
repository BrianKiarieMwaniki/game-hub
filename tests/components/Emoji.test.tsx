import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Emoji from "../../src/components/Emoji";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Emoji", () => {
  const renderEmojiComponent = (rating: number) => {
    render(<Emoji rating={rating} />);

    return { emoji: screen.getByRole("img") };
  };

  it("should render nothing when rating is less than 3", () => {
    const {emoji} = renderEmojiComponent(3);

    expect(emoji).toBeEmptyDOMElement();
  });

  it("should render emoji when rating is greater than 3", () => {
     const { emoji } = renderEmojiComponent(5);

    expect(emoji).toBeInTheDocument();
  });
});
