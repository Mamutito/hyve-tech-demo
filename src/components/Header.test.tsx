import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Header } from "./Header";
import cartReducer from "../store/slices/cartSlice";
import authReducer from "../store/slices/authSlice";
import { RootState } from "../store";

const mockStore = (preloadedState: Partial<RootState>) =>
  configureStore({
    preloadedState,
    reducer: { cart: cartReducer, auth: authReducer } as any,
  });

describe("Header", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
      auth: {
        status: "idle",
        error: null,
        user: null,
        token: null,
        isAuthenticated: false,
      },
    });
  });

  test("renders header with navigation links", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("LumiHaus.")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("opens login modal when user icon button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("user-icon-button"));
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  test("opens shopping cart when cart icon button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("cart-icon-button"));
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  test("displays the correct number of items in the cart", () => {
    store = mockStore({
      cart: {
        items: [
          {
            id: 1,
            name: "Test Item",
            quantity: 3,
            category: "test-category",
            price: 10,
            image: "test-image.jpg",
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
