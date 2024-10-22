import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "nprogress/nprogress.css";
import "antd/dist/reset.css";
// import "rsuite/dist/rsuite-no-reset.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
