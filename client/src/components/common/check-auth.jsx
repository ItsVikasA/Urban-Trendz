import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import CommonLoadingSkeleton from "./loading-comp"; // Import your loading component

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // If authentication is still being checked, show loading
  if (isAuthenticated === null) {
    return <CommonLoadingSkeleton />;
  }

  // Define protected routes that require authentication
  const protectedRoutes = [
    "/shop/checkout",
    "/shop/account", 
    "/shop/orders",
    "/admin"
  ];

  // Check if current path requires authentication
  const requiresAuth = protectedRoutes.some(route => 
    location.pathname.includes(route)
  );

  // Root path handling - redirect to appropriate dashboard based on role
  if (location.pathname === "/") {
    if (isAuthenticated && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      // Both authenticated and unauthenticated users go to shop/listing (home page)
      return <Navigate to="/shop/listing" />;
    }
  }

  // If user not authenticated and trying to access protected routes
  if (!isAuthenticated && requiresAuth) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user is authenticated and trying to access login or register page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/listing" />;
    }
  }

  // If user is authenticated and trying to access admin page without admin role
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If admin is authenticated and trying to access shop protected pages
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    (location.pathname.includes("/shop/checkout") || 
     location.pathname.includes("/shop/account") ||
     location.pathname.includes("/shop/orders"))
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow access to public shop pages (listing, product details, etc.) for everyone
  return <>{children}</>;
};

export default CheckAuth;
