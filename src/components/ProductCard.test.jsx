import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";

describe("Product Card component", () => {
  const mockProduct = {
    itemID: 1,
    itemName: "Sushi",
    itemDescription: "Fresh salmon sushi",
    itemPrice: 12,
    imageUrl: "test.jpg",
  };

  it("call function when onclick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ProductCard product={mockProduct} handleAddtoCard={onClick} />);
    const button = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("display div when addtocart is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ProductCard product={mockProduct} handleAddtoCard={onClick} />);
    const button = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(button);

    expect(screen.getByText(/Successfully added to cart/i)).toBeInTheDocument();
  });
});
