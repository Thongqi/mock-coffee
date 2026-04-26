import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router";
import { routes } from "./routes.jsx";
import * as exports from "./components/useProducts.js";

describe("router component", () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/menu"] });

  it("goes to homepage when click on home nav", async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router}></RouterProvider>);

    const home = screen.getByText("Home");

    await user.click(home);

    expect(
      await screen.getByText(/Authentic Asian Flavours, Crafted Fresh Daily/i),
    ).toBeInTheDocument();
  });
});

describe("nav cart update", () => {
  it("count on cart navbar increase when add to cart", async () => {
    // setup api fetch
    const mockProducts = vi.spyOn(exports, "useProducts");
    mockProducts.mockReturnValue({
      loading: false,
      products: [
        {
          itemID: 1,
          itemName: "Sushi",
          itemDescription: "Fresh salmon sushi",
          itemPrice: 12,
          imageUrl: "test.jpg",
        },
      ],
    });

    const user = userEvent.setup();

    const router = createMemoryRouter(routes, { initialEntries: ["/menu"] });

    render(<RouterProvider router={router}></RouterProvider>);

    const button = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(button[0]);
    await user.click(button[0]);

    expect(screen.getByTestId("cartCount")).toHaveTextContent("2");
  });
});
