import { theme } from "antd";
const { defaultAlgorithm } = theme;

const lightThemeColors = {
  primary: "#1E88E5",
  secondary: "#FFB300",
  success: "#43A047",
  warning: "#FB8C00",
  error: "#E53935",
  background: "#F4F6F9",
  text: "#212121",
  textSecondary: "#757575",
};

const themeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: lightThemeColors.primary, // Màu chủ đạo
    colorSuccess: lightThemeColors.success, // Màu trạng thái thành công
    colorWarning: lightThemeColors.warning, // Màu cảnh báo
    colorError: lightThemeColors.error, // Màu lỗi
    colorBgBase: lightThemeColors.background, // Màu nền
    colorTextBase: lightThemeColors.text, // Màu chữ chính
    colorTextSecondary: lightThemeColors.textSecondary, // Màu chữ phụ
  },
};

export default themeConfig;
