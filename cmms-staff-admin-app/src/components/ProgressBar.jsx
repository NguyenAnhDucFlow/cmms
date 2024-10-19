import { useEffect, useMemo } from "react";
import NProgress from "nprogress";

export default function ProgressBar() {
  NProgress.configure({
    showSpinner: false,
  });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return null;
}
