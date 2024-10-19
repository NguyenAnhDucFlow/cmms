import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animation - 1729164200868.json";
import ProgressBar from "./ProgressBar";

export default function LoadingScreen() {
  return (
    <>
      <ProgressBar />
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
