import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../api/productApi";

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProductsApi();
      // Server response structure: { data: { product: [...] } }
      return res?.data?.product || [];
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to load products" }
      );
    }
  }
);

export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdApi(id);
      return res?.data?.product || null;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to load product" }
      );
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createProductApi(formData);
      return res?.data?.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to create product" }
      );
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProductApi(id, data);
      return res?.data?.product;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to update product" }
      );
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to delete product" }
      );
    }
  }
);
