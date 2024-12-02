import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoadingScreen from "./components/Loading";
import useAuth from "./hooks/useAuth";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// Lazy-loaded components
const MainLayout = Loadable(lazy(() => import("./layouts")));
const HomePage = Loadable(lazy(() => import("./pages/HomePage")));
const ProductsPage = Loadable(lazy(() => import("./pages/ProductsPage")));
const ProductDetail = Loadable(lazy(() => import("./pages/ProductDetail")));
const CheckoutPage = Loadable(lazy(() => import("./pages/CheckoutPage")));
const LoginPage = Loadable(lazy(() => import("./pages/LoginPage")));
const PaymentSuccessPage = Loadable(
  lazy(() => import("./pages/PaymentSuccessPage"))
);
const PaymentCancelPage = Loadable(
  lazy(() => import("./pages/PaymentCancelPage"))
);
const MyOrdersPage = Loadable(lazy(() => import("./pages/MyOrdersPage")));

const GOOGLE_CLIENT_ID =
  "229203659707-kpvju7vl0mpc0j4gnd2s5eiclnuoaf6q.apps.googleusercontent.com";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },

      {
        path: "my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "cancel",
        element: <PaymentCancelPage />,
      },
      {
        path: "success",
        element: <PaymentSuccessPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
