import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Shop } from "./Shop";
import * as exports from "./useProducts";

describe("Shop component", () => {
  it("renders loading when loading is true", () => {
    const mockProducts = vi.spyOn(exports, "useProducts");
    mockProducts.mockReturnValue({ loading: true });

    render(<Shop />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("display products correctly if no error", () => {
    const mockProducts = vi.spyOn(exports, "useProducts");
    mockProducts.mockReturnValue({
      products: [
        {
          itemID: 1,
          itemName: "Robusta Coffee",
        },
        {
          itemID: 2,
          itemName: "Arabica Coffee",
        },
      ],
      loading: false,
      error: null,
    });

    render(<Shop />);

    expect(screen.getByText("Robusta Coffee")).toBeInTheDocument();
    expect(screen.getByText("Arabica Coffee")).toBeInTheDocument();
  });

  it("renders Error when Error is catch", () => {
    const mockProducts = vi.spyOn(exports, "useProducts");
    mockProducts.mockReturnValue({ loading: false, error: new Error("fail") });

    render(<Shop />);

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
