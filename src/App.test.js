import { render, screen } from "@testing-library/react";
import MainContent from "./components/main/main";

test("Page renders correctly", () => {
  render(<MainContent />);
  const cardTitleElement = screen.getByText(/Control Panel/i);
  const cardFront = screen.getByText(/Card Front/i);
  const cardBack = screen.getByText(/Card Back/i);

  expect(cardTitleElement).toBeInTheDocument();
  expect(cardFront).toBeInTheDocument();
  expect(cardBack).toBeInTheDocument();
});
