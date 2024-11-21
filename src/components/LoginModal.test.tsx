import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import LoginModal from "./LoginModal";
import authReducer from "../store/slices/authSlice";
import { RootState } from "../store";

const mockStore = (preloadedState: Partial<RootState>) =>
  configureStore({
    preloadedState,
    reducer: { auth: authReducer } as any,
  });

describe("LoginModal", () => {
  let store: ReturnType<typeof mockStore>;
  const onClose = jest.fn();

  beforeEach(() => {
    store = mockStore({
      auth: {
        status: "idle",
        error: null,
        user: null,
        token: null,
        isAuthenticated: false,
      },
    });
  });

  test("renders login modal when isOpen is true", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginModal onClose={onClose} isOpen={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your email address...")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  test("does not render login modal when isOpen is false", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginModal onClose={onClose} isOpen={false} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText("Log In")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginModal onClose={onClose} isOpen={true} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onClose).toHaveBeenCalled();
  });

  test("displays error message when authError is present", () => {
    store = mockStore({
      auth: {
        status: "idle",
        error: "Invalid credentials",
        user: null,
        token: null,
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginModal onClose={onClose} isOpen={true} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
