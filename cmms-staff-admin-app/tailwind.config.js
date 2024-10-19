/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        "2xl": "1476px",
      },
      colors: {
        primary: "#1E88E5", // Màu chủ đạo
        secondary: "#FFB300", // Màu phụ
        success: "#43A047", // Màu thành công
        warning: "#FB8C00", // Màu cảnh báo
        error: "#E53935", // Màu lỗi
        background: "#F4F6F9", // Nền chung
        text: "#212121", // Màu chữ chính
        textSecondary: "#757575", // Màu chữ phụ
        hoverPrimary: "#1565C0", // Màu hover khi nền là primary
      },
    },
  },
  plugins: [require("daisyui")],
};
