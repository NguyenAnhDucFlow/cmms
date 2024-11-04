import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import router from "./routes";
import themeConfig from "./themes/themeConfig";
import { queryClient } from "./services/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./contexts/StoreContext";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <HelmetProvider>
          <ConfigProvider theme={themeConfig}>
            <ToastContainer />
            <RouterProvider router={router} />
          </ConfigProvider>
        </HelmetProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
