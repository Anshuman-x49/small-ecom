import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";

/**
 * Custom hook to encapsulate cart logic and state.
 * @returns {Object} Cart state and actions
 */
const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  /**
   * Adds an item to the cart.
   * @param {Object} product - Product to add
   * @param {string} size - Selected size
   * @param {number} quantity - Quantity to add
   */
  const addItem = useCallback(
    (product, size, quantity = 1) => {
      dispatch(addToCart({ product, size, quantity }));
    },
    [dispatch]
  );

  /**
   * Removes an item from the cart.
   * @param {string} productId - Product ID
   * @param {string} size - Selected size
   */
  const removeItem = useCallback(
    (productId, size) => {
      dispatch(removeFromCart({ productId, size }));
    },
    [dispatch]
  );

  /**
   * Updates the quantity of an item in the cart.
   * @param {string} productId - Product ID
   * @param {string} size - Selected size
   * @param {number} quantity - New quantity
   */
  const updateQty = useCallback(
    (productId, size, quantity) => {
      dispatch(updateQuantity({ productId, size, quantity }));
    },
    [dispatch]
  );

  /**
   * Clears the entire cart.
   */
  const clear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    ...cartState,
    addItem,
    removeItem,
    updateQty,
    clear,
  };
};

export default useCart;
