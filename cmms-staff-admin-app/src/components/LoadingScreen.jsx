import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animation - 1729164200868.json";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    return () => {
      setTimeout(() => {
        NProgress.done();
      }, 1000);
    };
  }, []);
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Lottie
          animationData={loadingAnimation}
          className="mx-auto"
          style={{ height: 120, width: 120 }}
        />
      </div>
    </>
  );
}
