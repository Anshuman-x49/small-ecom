import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  registerApi,
  logoutApi,
  getMeApi,
  refreshTokenApi,
} from "../api/authApi";
import { setAccessToken, clearAccessToken } from "../../../config/axiosInstance";

/**
 * Thunk to handle user registration.
 */
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await registerApi(userData);
      return res.data; // { user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Registration failed" }
      );
    }
  }
);

/**
 * Thunk to handle user login.
 * Sets the access token in memory upon success.
 */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginApi(credentials);
      const { user, accessToken } = res.data;
      if (accessToken) {
        setAccessToken(accessToken);
      }
      return { user, accessToken };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Login failed" }
      );
    }
  }
);

/**
 * Thunk to fetch the currently authenticated user's profile.
 */
export const getMeThunk = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeApi();
      return res.data; // { user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: err.message || "Failed to fetch user" }
      );
    }
  }
);

/**
 * Thunk to attempt token refresh using the httpOnly cookie.
 * Sets the new access token in memory if successful.
 */
export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await refreshTokenApi();
      const { user, accessToken } = res.data;
      if (accessToken) {
        setAccessToken(accessToken);
      }
      return { user, accessToken };
    } catch (err) {
      clearAccessToken();
      return rejectWithValue(
        err.response?.data || { message: err.message || "Session expired" }
      );
    }
  }
);

/**
 * Thunk to handle user logout.
 * Calls the logout API and clears the access token from memory.
 */
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err) {
      // Ignore API logout error and proceed with client state cleanup
    } finally {
      clearAccessToken();
    }
    return true;
  }
);
