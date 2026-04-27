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

  it("handle add item correctly", async () => {
    const user = userEvent.setup();

    const count = 2
    const mockAdd = vi.fn();
    const mockMinus =vi.fn();

    render(<PlusMinusButton count={count} handleAdd={() =>mockAdd(count + 1)} handleMinus={mockMinus}></PlusMinusButton>);
    const addButton = screen.getByRole("button", {name: "add"})
    await user.click(addButton)
    expect(screen.getByLabelText("quantity")).toMatch(3);

  });

   it("handle minus item correctly", async () => {
    const user = userEvent.setup();

    const count = 2
    const mockAdd = vi.fn();
    const mockMinus =vi.fn();

    render(<PlusMinusButton count={count} handleAdd={() =>mockAdd(count + 1)} handleMinus={() =>mockMinus(count - 1)}></PlusMinusButton>);
    const minusButton = screen.getByRole("button", {name: "minus"})
    await user.click(minusButton)
    expect(screen.getByLabelText("quantity")).toMatch(1);
  });

  it("does not show negative", async () => {
    const user = userEvent.setup();

    const count = 0
    const mockAdd = vi.fn();
    const mockMinus =vi.fn();

    render(<PlusMinusButton count={count} handleAdd={() =>mockAdd(count + 1)} handleMinus={() =>mockMinus(count > 0? count - 1 : 0)}></PlusMinusButton>);
    const minusButton = screen.getByRole("button", {name: "minus"})
    await user.click(minusButton)
    expect(screen.getByLabelText("quantity")).toMatch(0);
  });
});



