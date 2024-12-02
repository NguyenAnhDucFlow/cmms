import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axios";
import useCart from "../stores/useCart";
import useAuth from "../stores/useAuth";
import Breadcrumb from "../components/Breadcrumb";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart, setCustomerInfo } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    address: "",
    paymentMethod: "COD",
    firstName: "",
    lastName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const breadcrumbItems = [
    { name: "Thanh toán", href: "/checkouts", current: true },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setCustomerInfo({
      email: formData.email,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    const price = Math.round(getTotal() * 1.1); // Tổng giá bao gồm thuế (10%)
    const tax = Math.round(getTotal() * 0.1);

    e.preventDefault();
    try {
      if (formData.paymentMethod === "OnlinePayment") {
        setIsProcessing(true);
        const baseUrl = window.location.origin; // Lấy URL gốc của ứng dụng
        const response = await axios.post(
          "/checkout-payos/create-payment-link",
          {
            baseUrl,
            productName: "",
            price,
          }
        );

        const { checkoutUrl } = response.data;
        if (checkoutUrl) {
          window.location.href = checkoutUrl; // Điều hướng đến trang thanh toán
        } else {
          throw new Error("Không nhận được URL thanh toán.");
        }
      } else {
        const orderDetails = items.map((item) => ({
          materialCode: item.materialCode,
          quantity: item.quantity,
          costPrice: item.salePrice,
          totalPrice: price,
          name: item.name,
          unitName: item.basicUnit,
        }));

        const orderData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          shippingAddress: formData.address,
          paymentMethod: "COD",
          orderDetails,
          tax,
        };

        const response = await axios.post("/orders", orderData);

        if (response.data && (response.data.code = 1000)) {
          clearCart();
          setCustomerInfo({
            email: "",
            address: "",
            paymentMethod: "COD",
          });
          navigate("/success");
        } else {
          throw new Error("Không thể tạo đơn hàng. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Biểu mẫu thanh toán */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Thanh toán</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Phương thức thanh toán
                </h3>
                <div className="space-y-2">
                  <label className="block">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Thanh toán khi nhận hàng (COD)
                  </label>
                  <label className="block">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="OnlinePayment"
                      checked={formData.paymentMethod === "OnlinePayment"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Thanh toán online
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-2 px-4 rounded-md transition-colors mt-6 ${
                  isProcessing
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {isProcessing ? "Đang xử lý..." : "Đặt hàng"}
              </button>
            </form>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-6">Tóm tắt đơn hàng</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <img
                      src={item.coverImageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {formatCurrency(item.salePrice * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Tạm tính</p>
                  <p className="font-medium">{formatCurrency(getTotal())}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600">Phí vận chuyển</p>
                  <p className="font-medium">{formatCurrency(0)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600">Thuế (10%)</p>
                  <p className="font-medium">
                    {formatCurrency(getTotal() * 0.1)}
                  </p>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <p className="font-bold">Tổng cộng</p>
                  <p className="font-bold">
                    {formatCurrency(getTotal() * 1.1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
