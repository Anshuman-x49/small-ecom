import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshTokenThunk } from '../features/auth/store/authThunks';

/**
 * InitAuth — fired once on app start.
 * Attempts to restore the user session from the server-issued refreshToken cookie.
 * If the cookie is valid, the server returns a new accessToken + user object.
 * If not, the user stays unauthenticated (Redux state stays as-is).
 */
const InitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshTokenThunk());
  }, [dispatch]);

  return null;
};

export default InitAuth;
