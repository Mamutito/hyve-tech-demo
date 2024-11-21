import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ShoppingCart from "./ShoppingCart";
import cartReducer, {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { RootState } from "../store";

const mockStore = (preloadedState: Partial<RootState>) =>
  configureStore({ preloadedState, reducer: { cart: cartReducer } as any });

describe("ShoppingCart", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          {
            id: 1,
            name: "Test Product",
            price: 19.99,
            image: "test-image.jpg",
            quantity: 2,
            category: "test-category",
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders shopping cart with items", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={jest.fn()} />
      </Provider>
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getAllByText("19.99€")[0]).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={onClose} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onClose).toHaveBeenCalled();
  });

  test("dispatches updateQuantity action when increment button is clicked", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("plus-button"));
    expect(store.dispatch).toHaveBeenCalledWith(
      updateQuantity({ id: 1, quantity: 3 })
    );
  });

  test("dispatches updateQuantity action when decrement button is clicked", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("minus-button"));
    expect(store.dispatch).toHaveBeenCalledWith(
      updateQuantity({ id: 1, quantity: 1 })
    );
  });

  test("dispatches removeFromCart action when remove button is clicked", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("remove-button"));
    expect(store.dispatch).toHaveBeenCalledWith(removeFromCart(1));
  });

  test("dispatches clearCart action when empty cart button is clicked", () => {
    render(
      <Provider store={store}>
        <ShoppingCart isOpen={true} onClose={jest.fn()} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /empty cart/i }));
    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });
});
