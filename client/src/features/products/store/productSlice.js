import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsThunk,
  fetchProductByIdThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "./productThunks";

const initialState = {
  items: [],
  selectedProduct: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  detailStatus: "idle",
  detailError: null,
  createStatus: "idle",
  createError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
    clearProductErrors: (state) => {
      state.error = null;
      state.detailError = null;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    // --- Fetch All Products ---
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { message: "Failed to load products" };
      });

    // --- Fetch Single Product ---
    builder
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
        state.detailError = null;
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError =
          action.payload || { message: "Failed to load product" };
      });

    // --- Create Product ---
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError =
          action.payload || { message: "Failed to create product" };
      });

    // --- Update Product ---
    builder
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.items.findIndex(
            (p) => p._id === action.payload._id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          if (state.selectedProduct?._id === action.payload._id) {
            state.selectedProduct = action.payload;
          }
        }
      });

    // --- Delete Product ---
    builder
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
        if (state.selectedProduct?._id === action.payload) {
          state.selectedProduct = null;
        }
      });
  },
});

export const { clearSelectedProduct, clearProductErrors } =
  productSlice.actions;
export default productSlice.reducer;
