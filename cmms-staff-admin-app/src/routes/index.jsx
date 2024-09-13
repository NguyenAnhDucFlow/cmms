import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";

// Lazy load components for better performance
const ManLayout = lazy(() => import("../layouts/man"));
const Products = lazy(() => import("../pages/Products"));

const PATH_AFTER_LOGIN = "/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        {" "}
        {/* Show a loading indicator while components load */}
        <ManLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
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
