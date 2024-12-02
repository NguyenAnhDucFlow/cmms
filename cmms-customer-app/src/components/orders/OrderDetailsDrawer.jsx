import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function OrderDetailsDrawer({ order, onClose }) {
  if (!order) return null;

  return (
    <Transition appear show={!!order} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex justify-end">
          <Dialog.Panel className="w-full max-w-md bg-white shadow-xl">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-200">
              <Dialog.Title className="text-lg font-bold text-gray-800">
                Chi tiết đơn hàng #{order.orderCode}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-gray-600 font-semibold">Sản phẩm:</h3>
                {order.details.map((item) => (
                  <div
                    key={item.materialCode}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-800">
                      {formatCurrency(item.costPrice * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <p className="text-gray-600">Phí giao hàng:</p>
                  <p className="text-gray-800 font-medium">
                    {formatCurrency(order.shippingFee || 0)}
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-gray-600">Thuế:</p>
                  <p className="text-gray-800 font-medium">
                    {formatCurrency(order.tax || 0)}
                  </p>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <p>Tổng cộng:</p>
                  <p>{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">Trạng thái:</p>
                <p
                  className={`font-medium ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {getOrderStatusLabel(order.status)}
                </p>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
              >
                Đóng
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

// Format currency in VND
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

const getOrderStatusLabel = (status) => {
  const statusLabels = {
    PENDING: "Đang chờ thanh toán",
    PAID: "Đã thanh toán",
    SHIPPED: "Đang giao hàng",
    COMPLETED: "Đã hoàn thành",
    CANCELLED: "Đã hủy",
  };
  return statusLabels[status] || "Không xác định";
};
