export function getOrderSupplierStatus(status) {
  switch (status) {
    case "TEMPORARY":
      return "Phiếu tạm";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "RECEIVED":
      return "Hoàn thành";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
}

export function getOrderStatus(status) {
  switch (status) {
    case "TEMPORARY":
      return "Phiếu tạm";
    case "COMPLETED":
      return "Đã hoàn thành";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return "Không xác định";
  }
}
