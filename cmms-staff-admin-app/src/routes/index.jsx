import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const ManLayout = Loadable(lazy(() => import("../layouts/man/index")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Products = Loadable(lazy(() => import("../pages/Products")));
const ErrorPage = Loadable(lazy(() => import("../pages/ErrorPage")));
const PurchaseOrderNew = Loadable(
  lazy(() => import("../sections/purchase-order/PurchaseOrderNew"))
);
const PurchaseOrder = Loadable(lazy(() => import("../pages/PurchaseOrder")));
const OrderSupplierNew = Loadable(
  lazy(() => import("../sections/order-supplier/OrderSupplierNew"))
);
const OrderSupplierEdit = Loadable(
  lazy(() => import("../sections/order-supplier/OrderSupplierEdit"))
);
const PurchaseOrderByOrderSupplierGet = Loadable(
  lazy(() =>
    import("../sections/purchase-order/PurchaseOrderByOrderSupplierGet")
  )
);
const OrderSupplier = Loadable(lazy(() => import("../pages/OrderSupplier")));
const Stores = Loadable(lazy(() => import("../pages/Stores")));
const Users = Loadable(lazy(() => import("../pages/Users")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const PriceBook = Loadable(lazy(() => import("../pages/PriceBook")));
const StockTakes = Loadable(lazy(() => import("../pages/StockTakes")));
const Sale = Loadable(lazy(() => import("../layouts/sale/index")));
const PartnerDelivery = Loadable(lazy(() => import("../pages/Shipper")));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <ManLayout />
      </AuthGuard>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "products", element: <Products /> },
      {
        path: "purchase-order",
        element: <PurchaseOrder />,
      },
      { path: "purchase-order/new", element: <PurchaseOrderNew /> },
      {
        path: "order-supplier",
        element: <OrderSupplier />,
      },
      {
        path: "purchase-order/PurchaseOrderByOrderSupplierGet/:id",
        element: <PurchaseOrderByOrderSupplierGet />,
      },
      { path: "order-supplier/new", element: <OrderSupplierNew /> },
      { path: "order-supplier/:id/edit", element: <OrderSupplierEdit /> },
      { path: "stores", element: <Stores /> },
      { path: "users", element: <Users /> },
      { path: "price-book", element: <PriceBook /> },
      { path: "stock-takes", element: <StockTakes /> },
      { path: "partner-delivery", element: <PartnerDelivery /> },
    ],
  },
  {
    path: "/sale",
    element: <Sale />,
  },
  {
    path: "/login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
