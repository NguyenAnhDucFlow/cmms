import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import ActionButtons from "../components/payment/ActionButtons";
import useCart from "../stores/useCart";
import axios from "../utils/axios";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const { items, getTotal, clearCart, setCustomerInfo, customerInfo } =
    useCart();
  const location = useLocation();

  useEffect(() => {
    // Lấy query parameter từ URL
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code === "00") {
      const price = Math.round(getTotal() * 1.1);
      const createOrder = async () => {
        try {
          const orderDetails = items.map((item) => ({
            materialCode: item.materialCode,
            quantity: item.quantity,
            costPrice: item.salePrice,
            totalPrice: price,
            name: item.name,
            unitName: item.basicUnit,
          }));

          const orderData = {
            shippingAddress: customerInfo.address,
            paymentMethod: "BANK_TRANSFER",
            orderDetails,
          };

          const response = await axios.post("/orders", orderData);

          if (response.data && response.data.code === 1000) {
            clearCart();
            setCustomerInfo({
              email: "",
              address: "",
              paymentMethod: "COD",
            });
          } else {
            throw new Error("Không thể tạo đơn hàng.");
          }
        } catch (error) {
          console.error("Lỗi khi tạo đơn hàng:", error);
          alert("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.");
        }
      };

      createOrder();
    }
  }, []);

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
            Thanh toán thành công!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cảm ơn bạn đã mua hàng. Thanh toán của bạn đã được xử lý thành công.
          </p>

          <div className="mt-8">
            <ActionButtons type="success" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
