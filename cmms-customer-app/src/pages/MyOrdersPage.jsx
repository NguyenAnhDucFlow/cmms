import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";
import Breadcrumb from "../components/Breadcrumb";
import OrderDetailsDrawer from "../components/orders/OrderDetailsDrawer";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/${user?.username}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        alert("Không thể tải đơn hàng. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user?.username]);

  const breadcrumbItems = [
    { name: "Đơn hàng của tôi", href: "/my-orders", current: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Đơn hàng của tôi
        </h2>

        {isLoading ? (
          <p className="text-lg text-gray-600">Đang tải...</p>
        ) : (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <p className="text-lg text-gray-500">Không có đơn hàng nào.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Đơn hàng #{order.orderCode}
                  </h3>

                  <div className="space-y-4">
                    {order.details.map((item) => (
                      <div
                        key={item.materialCode}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <h4 className="text-gray-800 font-medium">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <p className="text-gray-800 font-medium">
                          {formatCurrency(item.totalPrice)}
                        </p>
                      </div>
                    ))}

                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                      <p className="font-bold text-gray-700">Tổng cộng</p>
                      <p className="font-bold text-gray-800">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(order)} // Open the drawer with the selected order
                      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Render the drawer */}
        {selectedOrder && (
          <OrderDetailsDrawer
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)} // Close the drawer
          />
        )}
      </div>
    </div>
  );
}

// Format currency in VND
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
