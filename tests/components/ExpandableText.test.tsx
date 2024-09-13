import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExpandableText from "./../../src/components/ExpandableText";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { userEvent } from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 300;
  const longText = "a".repeat(limit + 1);
  const trucatedText = longText.substring(0, limit) + "...";

  it("should render full text if text is less than 300 characters", () => {
    render(<ExpandableText text="some short text" />);

    const textParagraph = screen.getByRole("paragraph");

    expect(textParagraph).toBeInTheDocument();
    expect(textParagraph).toHaveTextContent("some short text");
  });

  it("should render truncated text if text is more than 300 characters", () => {
    render(<ExpandableText text={longText} />);

    const textParagraph = screen.getByRole("paragraph");
    const button = screen.getByRole("button");

    expect(textParagraph).toBeInTheDocument();
    expect(textParagraph).toHaveTextContent(trucatedText);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when show more button is clicked", async () => {
    const user = userEvent.setup();
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text when show less button is clicked', async () => {
    const user = userEvent.setup();
    render(<ExpandableText text={longText}/>)
    const showMoreButton = screen.getByRole('button', {name: /more/i});
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole('button', {name: /less/i});
    await user.click(showLessButton);

    expect(screen.getByText(trucatedText)).toBeInTheDocument();
    expect(showMoreButton).toBeInTheDocument();
  })
});
