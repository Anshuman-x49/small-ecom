import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchProductsThunk,
  fetchProductByIdThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../store/productThunks";
import {
  clearSelectedProduct,
  clearProductErrors,
} from "../store/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  const fetchProducts = useCallback(
    () => dispatch(fetchProductsThunk()),
    [dispatch]
  );

  const fetchProductById = useCallback(
    (id) => dispatch(fetchProductByIdThunk(id)),
    [dispatch]
  );

  const createProduct = useCallback(
    (formData) => dispatch(createProductThunk(formData)),
    [dispatch]
  );

  const updateProduct = useCallback(
    (id, data) => dispatch(updateProductThunk({ id, data })),
    [dispatch]
  );

  const deleteProduct = useCallback(
    (id) => dispatch(deleteProductThunk(id)),
    [dispatch]
  );

  const clearSelected = useCallback(
    () => dispatch(clearSelectedProduct()),
    [dispatch]
  );

  const clearErrors = useCallback(
    () => dispatch(clearProductErrors()),
    [dispatch]
  );

  return {
    ...productState,
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    clearSelected,
    clearErrors,
  };
};

export default useProducts;
