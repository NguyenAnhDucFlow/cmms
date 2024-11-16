export function getOrderSupplierStatus(status) {
  switch (status) {
    case "TEMPORARY":
      return "Phiếu tạm";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "RECEIVED":
      return "Đã nhận hàng";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
}
