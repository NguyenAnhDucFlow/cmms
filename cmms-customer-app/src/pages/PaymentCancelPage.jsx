import { useEffect } from "react";
import { motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import ActionButtons from "../components/payment/ActionButtons";
import { getErrorMessage } from "../utils/paymentHelpers";
import { trackPaymentFailure } from "../utils/analytics";

export default function PaymentCancelPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const errorData = location.state?.error;

  useEffect(() => {
    if (errorData) {
      trackPaymentFailure(errorData);
    }
  }, [errorData]);

  const handleRetry = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-lg mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100"
          >
            <XCircleIcon className="h-10 w-10 text-red-600" />
          </motion.div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Payment Unsuccessful
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {errorData
              ? getErrorMessage(errorData.errorCode)
              : "Your payment could not be processed."}
          </p>

          {errorData?.details && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">{errorData.details}</p>
            </div>
          )}

          <div className="mt-8">
            <ActionButtons type="cancel" onRetry={handleRetry} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
