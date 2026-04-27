import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminManageUsers from "./pages/AdminManageUsers";
import AdminUserDetail from "./pages/AdminUserDetail";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminAllOrders from "./pages/AdminAllOrders";
import AdminNotifications from "./pages/AdminNotifications";
import AdminSettings from "./pages/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/products",
    Component: Products,
  },
  {
    path: "/products/:id",
    Component: ProductDetail,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/welcome",
    Component: Welcome,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/admin/signin",
    Component: AdminSignIn,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/add-product",
    Component: AdminAddProduct,
  },
  {
    path: "/admin/manage-users",
    Component: AdminManageUsers,
  },
  {
    path: "/admin/user/:id",
    Component: AdminUserDetail,
  },
  {
    path: "/admin/analytics",
    Component: AdminAnalytics,
  },
  {
    path: "/admin/orders",
    Component: AdminAllOrders,
  },
  {
    path: "/admin/notifications",
    Component: AdminNotifications,
  },
  {
    path: "/admin/settings",
    Component: AdminSettings,
  },
]);
