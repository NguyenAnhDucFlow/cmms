import React, { useState } from "react";
import { Drawer, Radio, Button, Spin, Modal, message } from "antd";
import useStore from "../../store/posStore";
import axiosInstance from "../../utils/axios";
import { QRCodeCanvas } from "qrcode.react";
import { useStore as STORE } from "../../hooks/useStore";

const CheckoutDrawer = ({ open, onClose }) => {
  const { storeId } = STORE();
  const { orders, activeOrderId } = useStore();
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Default to cash
  const [amountPaid, setAmountPaid] = useState(0);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const activeOrder = orders.find((order) => order.id === activeOrderId);
  const total = activeOrder?.total || 0;
  const customerInfo = activeOrder?.customerInfo;

  const handleAmountClick = (amount) => {
    setAmountPaid(amount);
  };

  // Helper function to generate payment suggestions
  const suggestPaymentAmounts = (total) => {
    const suggestions = [];
    const rounded = Math.ceil(total / 1000) * 1000;
    suggestions.push(rounded);
    suggestions.push(rounded + 5000);
    suggestions.push(rounded + 10000);

    [100000, 200000, 500000].forEach((amount) => {
      if (amount > total) suggestions.push(amount);
    });

    return suggestions;
  };

  const fetchQrCode = () => {
    setLoading(true);
    setTimeout(() => {
      const qrCodeData =
        "00020101021238620010A000000727013200069704480118CAS0241000099910050208QRIBFTTA5303704540412305802VN62350831CSVB26HOJ02 Thanh toan don hang63041E35";
      setQrCode(qrCodeData);
      setLoading(false);
    }, 2000); // Simulate API call delay
  };

  const handleShowQrClick = () => {
    setShowQr((prev) => !prev); // Toggle visibility
    if (!showQr) {
      fetchQrCode(); // Fetch QR code only when showing it
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setQrCode(null); // Reset QR code when switching payment methods
    setQrModalVisible(false); // Close modal if open
  };

  const showQrModal = () => {
    if (!qrCode) fetchQrCode(); // Fetch QR code if not already loaded
    setQrModalVisible(true); // Show modal
  };

  const closeQrModal = () => {
    setQrModalVisible(false); // Hide modal
  };

  const handleCheckout = async () => {
    if (!activeOrder) {
      return alert("Không có đơn hàng nào đang hoạt động!");
    }

    if (customerInfo == null) {
      message.error("Vui lòng chọn khách hàng!");
      return;
    }

    // Dữ liệu hóa đơn gửi đến API
    const invoiceData = {
      storeId,
      customerId: customerInfo?.id || null,
      totalAmount: total,
      paidAmount: amountPaid,
      note: "Thanh toán tại POS",
      details: activeOrder.items.map((item) => ({
        materialCode: item.materialCode,
        name: item.name,
        quantity: item.quantity,
        costPrice: item.salePrice,
        unitName: item.unitName,
      })),
    };

    try {
      // Hiển thị trạng thái loading
      setLoading(true);

      // Gọi API tạo hóa đơn
      const response = await axiosInstance.post("/invoices", invoiceData);

      // Nếu thành công
      if (response.data.code === 201) {
        alert("Hóa đơn đã được tạo thành công!");
        onClose(); // Đóng drawer
        useStore.getState().removeOrder(activeOrderId);
      } else {
        alert("Đã xảy ra lỗi khi tạo hóa đơn.");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Không thể tạo hóa đơn. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      width={460}
      title="Thanh toán"
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4 p-3">
          {/* Customer Information */}
          <div className="font-semibold whitespace-nowrap">
            {customerInfo?.username || "Khách lẻ"}
          </div>

          {/* Order Details */}
          <div className="flex items-center justify-between">
            <div>Tổng tiền hàng</div>
            <div>{total.toLocaleString()} VND</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Giảm giá</div>
            <div className="border-b pb-1 w-20 text-right text-gray-300">0</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-semibold">Khách cần trả</div>
            <div className="text-[18px] text-primary">
              {total.toLocaleString()} VND
            </div>
          </div>

          {/* Payment Amount Input */}
          <div className="flex items-center justify-between">
            <div className="font-semibold">Khách thanh toán</div>
            <div dir="rtl" className="text-primary">
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="text-right w-20 text-[18px] appearance-none border-none text-primary rtl"
              />
            </div>
          </div>

          {/* Payment Method Options */}
          <div className="flex flex-col gap-3">
            <Radio.Group
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
              value={paymentMethod}
            >
              <Radio value="cash">Tiền mặt</Radio>
              <Radio value="transfer">Chuyển khoản</Radio>
            </Radio.Group>
          </div>

          {paymentMethod === "cash" && (
            <div className="flex flex-wrap gap-2 mt-2 bg-gray-100 p-2 rounded-md shadow-md">
              {suggestPaymentAmounts(total).map((amount) => (
                <Button
                  key={amount}
                  onClick={() => handleAmountClick(amount)}
                  className="px-4 py-2 border rounded-lg"
                >
                  {amount.toLocaleString()} VND
                </Button>
              ))}
            </div>
          )}
          {paymentMethod === "transfer" && (
            <div className="mt-4 flex flex-col items-center">
              <Button type="primary" onClick={showQrModal} className="mb-3">
                Hiện mã QR toàn màn hình
              </Button>
              {loading ? (
                <Spin size="large" />
              ) : qrCode ? (
                <QRCodeCanvas value={qrCode} size={100} />
              ) : (
                <div>QR Code not available</div>
              )}
            </div>
          )}
        </div>
        <Button
          type="primary"
          className="w-full h-12 font-bold"
          onClick={handleCheckout}
        >
          THANH TOÁN
        </Button>
      </div>
      <Modal
        visible={qrModalVisible}
        onCancel={closeQrModal}
        footer={null}
        centered
        bodyStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {loading ? (
          <Spin size="large" />
        ) : qrCode ? (
          <QRCodeCanvas value={qrCode} size={300} />
        ) : (
          <div>QR Code not available</div>
        )}
      </Modal>
    </Drawer>
  );
};

export default CheckoutDrawer;
