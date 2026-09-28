import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  getMeThunk,
  refreshTokenThunk,
  logoutThunk,
} from "./authThunks";

const initialState = {
  user: null,
  accessToken: null,        // Lives in memory only. Populated after loginThunk or refreshTokenThunk
  isAuthenticated: false,   // True only after successful login or session restore
  status: "idle",           // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  registerStatus: "idle",
  registerError: null,
};

/**
 * Authentication Slice
 * Manages the user session, token, and loading statuses for authentication thunks.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Clears any existing authentication or registration errors.
     */
    clearAuthError: (state) => {
      state.error = null;
      state.registerError = null;
    },
    /**
     * Resets the status of the authentication and registration processes to 'idle'.
     */
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.registerStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // --- Register ---
    builder
      .addCase(registerThunk.pending, (state) => {
        state.registerStatus = "loading";
        state.registerError = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.registerStatus = "succeeded";
        state.registerError = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload || { message: "Registration failed" };
      });

    // --- Login ---
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { message: "Login failed" };
        state.isAuthenticated = false;
      });

    // --- Get Me ---
    builder
      .addCase(getMeThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getMeThunk.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
      });

    // --- Refresh Token ---
    builder
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(refreshTokenThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });

    // --- Logout ---
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { clearAuthError, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
