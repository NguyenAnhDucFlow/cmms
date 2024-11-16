export const formatDateVN = (isoDate) => {
  const date = new Date(isoDate);

  const datePart = date.toLocaleDateString("vi-VN"); // Lấy phần ngày
  const timePart = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24h format
  }); // Lấy phần giờ

  return `${datePart} ${timePart}`;
};

export function formatDate(dateString) {
  // Kiểm tra xem chuỗi đầu vào có hợp lệ không
  if (!dateString) {
    return "";
  }

  // Tạo một đối tượng Date từ chuỗi đầu vào
  const date = new Date(dateString);

  // Kiểm tra xem có phải là một ngày hợp lệ
  if (isNaN(date.getTime())) {
    return "";
  }

  // Lấy ngày, tháng, năm từ đối tượng Date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getFullYear();

  // Trả về chuỗi theo định dạng "ngày/tháng/năm"
  return `${day}/${month}/${year}`;
}
