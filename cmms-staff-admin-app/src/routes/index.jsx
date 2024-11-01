import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";

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
const PurchaseOrder = Loadable(lazy(() => import("../pages/PurchaseOrder")));
const Stores = Loadable(lazy(() => import("../pages/Stores")));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "/products", element: <Products /> },
      { path: "/purchase-order", element: <PurchaseOrder /> },
      { path: "/stores", element: <Stores /> },
    ],
  },
]);

export default router;
