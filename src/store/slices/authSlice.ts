import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

// Mock API call
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    // Simulate API call
    const response = await new Promise<{ user: User; token: string }>(
      (resolve, reject) => {
        setTimeout(() => {
          // Mock validation
          if (
            credentials.email === "user@example.com" &&
            credentials.password === "password"
          ) {
            resolve({
              user: {
                email: credentials.email,
                name: "Test User",
              },
              token: "mock-jwt-token-" + Math.random(),
            });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      }
    );

    // Store token in localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    return response;
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
