import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../../features/auth/ui/pages/LoginPage";
import RegisterPage from "../../features/auth/ui/pages/RegisterPage";
import ProductListPage from "../../features/products/ui/pages/ProductListPage";
import ProductDetailPage from "../../features/products/ui/pages/ProductDetailPage";
import SellerDashboardPage from "../../features/products/ui/pages/SellerDashboardPage";
import CartPage from "../../features/cart/ui/pages/CartPage";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: "home",
        element: <Navigate to="/" replace />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/dashboard",
        element: (
          <SellerRoute>
            <SellerDashboardPage />
          </SellerRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
