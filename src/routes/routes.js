import { lazy } from "react";
import { config } from "~/config";

// Layouts
// import { DefaultLayout } from "~/layouts";
import Management from "~/layouts/Management/Management";

// Pages
const Home = lazy(() => import("~/pages/Home"));
const NotFound = lazy(() => import("~/pages/NotFound"));
const ProductDetail = lazy(() => import("~/pages/Product"));
const Auth = lazy(() => import("~/pages/Auth"));
const Cart = lazy(() => import("~/pages/Cart"));
const Order = lazy(() => import("~/pages/Order"));
const MyOrder = lazy(() => import("~/pages/MyOrder"));
const Dashboard = lazy(() => import("~/pages/Dashboard"));
const userManager = lazy(() => import("~/pages/UserManager"));
const orderManager = lazy(() => import("~/pages/OrderManager"));
const orderDetail = lazy(() => import("~/pages/OrderDetail"));
const productManager = lazy(() => import("~/pages/ProductManager"));
const editProduct = lazy(() => import("~/pages/EditProduct"))
const addProduct = lazy(() => import("~/pages/AddProduct"))
const addEmployee = lazy(() => import("~/pages/AddEmployee"))
const editUser = lazy(() => import("~/pages/EditUser"))

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.product, component: ProductDetail },
  { path: "*", component: NotFound, layout: null },
  { path: config.routes.auth, component: Auth, layout: null },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.order, component: Order },
  { path: config.routes.myOrder, component: MyOrder },
  { path: config.routes.dashboard, component: Dashboard, layout: Management },
  { path: config.routes.userManager, component: userManager, layout: Management },
  { path: config.routes.orderManager, component: orderManager, layout: Management },
  { path: config.routes.orderDetail, component: orderDetail, layout: Management },
  { path: config.routes.productManager, component: productManager, layout: Management },
  { path: config.routes.editProduct, component: editProduct, layout: Management },
  { path: config.routes.addProduct, component: addProduct, layout: Management },
  { path: config.routes.addEmployee, component: addEmployee, layout: Management },
  { path: config.routes.editUser, component: editUser, layout: Management },
];

const privateRoutes = [
//   { path: config.routes.wtf, component: wtf, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
