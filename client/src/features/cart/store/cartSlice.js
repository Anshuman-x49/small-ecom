import { createSlice } from "@reduxjs/toolkit";

/**
 * Helper to calculate total items and amount in the cart
 * @param {Array} items - Array of cart item objects
 * @returns {Object} { totalItems, totalAmount }
 */
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
    0
  );
  return { totalItems, totalAmount };
};

// Cart lives only in Redux memory. Cleared on page refresh.
const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

/**
 * Cart Slice
 * Manages the in-memory cart state (items, totals).
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds an item to the cart or increments its quantity if it already exists.
     */
    addToCart: (state, action) => {
      const { product, size, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === product._id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          size,
          quantity,
          price: product.price,
        });
      }

      const { totalItems, totalAmount } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    /**
     * Removes an item from the cart entirely.
     */
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && item.size === size)
      );
      const { totalItems, totalAmount } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    /**
     * Updates the quantity of a specific item in the cart.
     */
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.product._id === productId && i.size === size
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => !(i.product._id === productId && i.size === size)
          );
        } else {
          item.quantity = quantity;
        }
      }
      const { totalItems, totalAmount } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalAmount = totalAmount;
    },
    /**
     * Clears all items from the cart.
     */
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
