import { lazy } from "react";
import { config } from "~/config";

// Layouts
// import { DefaultLayout } from "~/layouts";

// Pages
const Home = lazy(() => import("~/pages/Home"));
const NotFound = lazy(() => import("~/pages/NotFound"));
const ProductDetail = lazy(() => import("~/pages/Product"));
const Auth = lazy(() => import("~/pages/Auth"));
const Cart = lazy(() => import("~/pages/Cart"));
const Order = lazy(() => import("~/pages/Order"));
const MyOrder = lazy(() => import("~/pages/MyOrder"));

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.product, component: ProductDetail },
  { path: "*", component: NotFound, layout: null },
  { path: config.routes.auth, component: Auth, layout: null },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.order, component: Order },
  { path: config.routes.myOrder, component: MyOrder },
];

const privateRoutes = [
//   { path: config.routes.wtf, component: wtf, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
