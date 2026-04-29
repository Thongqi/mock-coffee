import { describe, expect, it, vi } from "vitest";
import { CartCard, OrderSummary, PlusMinusButton } from "./Cart";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("cart item", () => {
  it("display cart items correctly", async () => {
    const mockProduct = {
      itemID: 1,
      itemName: "Sushi",
      itemDescription: "Fresh salmon sushi",
      itemPrice: 12,
      imageUrl: "test.jpg",
    };

    render(<CartCard item={mockProduct} setCart={vi.fn()}></CartCard>);
    expect(screen.getByText("Sushi")).toBeInTheDocument();
  });

  it("handle add item correctly", async () => {
    const user = userEvent.setup();

    const count = 2;
    const mockAdd = vi.fn();
    const mockMinus = vi.fn();

    render(
      <PlusMinusButton
        count={count}
        handleAdd={() => mockAdd()}
        handleMinus={mockMinus}
      ></PlusMinusButton>,
    );
    const addButton = screen.getByRole("button", { name: "add" });
    await user.click(addButton);
    expect(mockAdd).toHaveBeenCalled();
  });

  it("handle minus item correctly", async () => {
    const user = userEvent.setup();

    const mockAdd = vi.fn();
    const mockMinus = vi.fn();

    render(
      <PlusMinusButton
        count={2}
        handleAdd={() => mockAdd()}
        handleMinus={() => mockMinus()}
      ></PlusMinusButton>,
    );
    const minusButton = screen.getByRole("button", { name: "minus" });
    await user.click(minusButton);
    expect(mockMinus).toHaveBeenCalled();
  });
});

describe.only("order summary", () => {
  it("display total item correctly", () => {
    const mockCart = [
      {
        itemID: 1,
        itemName: "Sushi",
        itemDescription: "Fresh salmon sushi",
        itemPrice: 12,
        imageUrl: "test.jpg",
        quantity: 2,
      },
      {
        itemID: 2,
        itemName: "Susha",
        itemDescription: "Fresh salmon susa",
        itemPrice: 34,
        imageUrl: "test.jpg",
        quantity: 1,
      },
    ];

    render(<OrderSummary cart={mockCart}></OrderSummary>);

    // expect(screen.getByText(/3 Item(s)/i)).toBeInTheDocument();
    expect(screen.getByText("58")).toBeInTheDocument();
  });
});
