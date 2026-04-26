import { describe, expect, it } from "vitest";
import { CartCard } from "./Cart";
import { render, screen } from "@testing-library/react";

describe("cart item", () => {
  it("display cart items correctly", async () => {
    const mockProduct = {
      itemID: 1,
      itemName: "Sushi",
      itemDescription: "Fresh salmon sushi",
      itemPrice: 12,
      imageUrl: "test.jpg",
    };

    render(<CartCard item={mockProduct}></CartCard>);
    expect(screen.getByText("Sushi")).toBeInTheDocument();
  });
});
