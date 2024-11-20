import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // En una aplicación real, esto sería una llamada a la API
    const response = await new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Lyng Table",
            price: 100.0,
            image: "https://via.placeholder.com/200",
            category: "new",
          },
          {
            id: 2,
            name: "Eira Chair",
            price: 75.0,
            image: "https://via.placeholder.com/200",
            category: "trendy",
          },
          {
            id: 3,
            name: "Stil Chair",
            price: 75.0,
            image: "https://via.placeholder.com/200",
            category: "new",
          },
          {
            id: 4,
            name: "Lyske Sofa",
            price: 395.0,
            image: "https://via.placeholder.com/200",
            category: "trendy",
          },
          {
            id: 5,
            name: "Skag Sofa",
            price: 245.0,
            image: "https://via.placeholder.com/200",
            category: "sale",
          },
          {
            id: 6,
            name: "Lumi Table",
            price: 75.0,
            image: "https://via.placeholder.com/200",
            category: "new",
          },
          {
            id: 7,
            name: "Viter Sofa",
            price: 75.0,
            image: "https://via.placeholder.com/200",
            category: "sale",
          },
          {
            id: 8,
            name: "Klara Chair",
            price: 395.0,
            image: "https://via.placeholder.com/200",
            category: "trendy",
          },
        ]);
      }, 1000);
    });
    return response;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
