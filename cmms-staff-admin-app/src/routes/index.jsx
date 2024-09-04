import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";

// Lazy load components for better performance
const ManLayout = lazy(() => import("../layouts/man"));
const Products = lazy(() => import("../pages/Products"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* Show a loading indicator while components load */}
        <ManLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
