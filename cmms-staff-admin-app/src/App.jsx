import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import router from "./routes";
import themeConfig from "./themes/themeConfig";
import { queryClient } from "./services/queryClient";

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

// const App = () => (
//   <ConfigProvider
//     theme={{
//       algorithm: defaultAlgorithm,
//       token: {
//         colorPrimary: lightThemeColors.primary, // Màu chủ đạo
//         colorSuccess: lightThemeColors.success, // Màu trạng thái thành công
//         colorWarning: lightThemeColors.warning, // Màu cảnh báo
//         colorError: lightThemeColors.error, // Màu lỗi
//         colorBgBase: lightThemeColors.background, // Màu nền
//         colorTextBase: lightThemeColors.text, // Màu chữ chính
//         colorTextSecondary: lightThemeColors.textSecondary, // Màu chữ phụ
//       },
//     }}
//   >
//     <div className="p-6 bg-background text-text">
//       <h1 className="text-error text-2xl">Dashboard quản lý vật liệu</h1>
//       <Button type="primary">Thêm vật liệu</Button>
//     </div>
//     <div className="p-6 bg-background text-text">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="col-span-1">
//             <h2 className="text-primary">Vật liệu tồn kho</h2>
//             <p className="text-secondary">Cập nhật lần cuối: hôm nay</p>
//           </div>
//           <div className="col-span-2">
//             <table className="table w-full">
//               <thead>
//                 <tr>
//                   <th>Tên vật liệu</th>
//                   <th>Số lượng</th>
//                   <th>Giá</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Cát</td>
//                   <td>200 tấn</td>
//                   <td>500,000 VND</td>
//                 </tr>
//                 <tr>
//                   <td>Xi măng</td>
//                   <td>150 tấn</td>
//                   <td>800,000 VND</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </ConfigProvider>
// );

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ConfigProvider theme={themeConfig}>
          <RouterProvider router={router} />
        </ConfigProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
