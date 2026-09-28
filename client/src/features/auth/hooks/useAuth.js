import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  loginThunk,
  registerThunk,
  logoutThunk,
  getMeThunk,
  refreshTokenThunk,
} from "../store/authThunks";
import { clearAuthError, resetAuthStatus } from "../store/authSlice";

/**
 * Custom hook to encapsulate authentication logic and state.
 * @returns {Object} Authentication state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  /**
   * Attempt to log in a user with credentials.
   */
  const login = useCallback(
    (credentials) => dispatch(loginThunk(credentials)),
    [dispatch]
  );

  /**
   * Attempt to register a new user.
   */
  const register = useCallback(
    (userData) => dispatch(registerThunk(userData)),
    [dispatch]
  );

  /**
   * Log out the current user.
   */
  const logout = useCallback(() => dispatch(logoutThunk()), [dispatch]);

  /**
   * Fetch the current user's profile details.
   */
  const getMe = useCallback(() => dispatch(getMeThunk()), [dispatch]);

  /**
   * Refresh the access token using the httpOnly cookie.
   */
  const refreshToken = useCallback(
    () => dispatch(refreshTokenThunk()),
    [dispatch]
  );

  /**
   * Clear any authentication errors in the state.
   */
  const clearError = useCallback(() => dispatch(clearAuthError()), [dispatch]);

  /**
   * Reset the authentication status to idle.
   */
  const resetStatus = useCallback(() => dispatch(resetAuthStatus()), [dispatch]);

  return {
    ...authState,
    login,
    register,
    logout,
    getMe,
    refreshToken,
    clearError,
    resetStatus,
  };
};

export default useAuth;
