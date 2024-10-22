import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import router from "./routes";
import themeConfig from "./themes/themeConfig";
import { queryClient } from "./services/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
