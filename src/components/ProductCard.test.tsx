import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ProductCard } from "./ProductCard";
import { addToCart } from "../store/slices/cartSlice";
import { Product } from "../types";
import cartReducer from "../store/slices/cartSlice";

const mockStore = (preloadedState: any) =>
  configureStore({ preloadedState, reducer: { cart: cartReducer } as any });

const product: Product = {
  id: 1,
  name: "Test Product",
  price: 19.99,
  image: "test-image.jpg",
  category: "test-category",
};

describe("ProductCard", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: [],
    });
    store.dispatch = jest.fn();
  });

  test("renders product details", () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${product.price.toFixed(2)}€`)
    ).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
  });

  test("dispatches addToCart action when button is clicked", () => {
    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(store.dispatch).toHaveBeenCalledWith(addToCart(product));
  });
});
