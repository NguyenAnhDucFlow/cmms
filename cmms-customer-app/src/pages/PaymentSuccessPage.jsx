import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import TransactionDetails from "../components/payment/TransactionDetails";
import ActionButtons from "../components/payment/ActionButtons";
import { trackPaymentSuccess } from "../utils/analytics";

export default function PaymentSuccessPage() {
  const location = useLocation();
  const transaction = location.state?.transaction;

  useEffect(() => {
    if (transaction) {
      trackPaymentSuccess(transaction);
    }
  }, [transaction]);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Invalid Transaction
          </h2>
          <p className="mt-2 text-gray-600">No transaction details found.</p>
          <ActionButtons type="success" />
        </div>
      </div>
    );
  }

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
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100"
          >
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>

          <div className="mt-8">
            <TransactionDetails transaction={transaction} />
          </div>

          <div className="mt-8">
            <ActionButtons type="success" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
