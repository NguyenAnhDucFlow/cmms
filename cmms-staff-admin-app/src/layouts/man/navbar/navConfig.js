import {
  FaEye,
  FaExchangeAlt,
  FaUsers,
  FaUserTie,
  FaCashRegister,
  FaChartBar,
  FaShoppingCart,
  FaRegListAlt,
} from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { LuTags } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";

const navConfig = [
  {
    title: "Tổng quan",
    icon: FaEye,
    path: "/",
  },
  {
    title: "Hàng hóa",
    icon: BsBoxes,
    items: [
      { label: "Danh mục", path: "/products", icon: FaRegListAlt },
      { label: "Thiết lập giá", path: "/hang-hoa/them-moi", icon: LuTags },
      {
        label: "Kiểm kho",
        path: "/hang-hoa/them-moi",
        icon: MdOutlineInventory,
      },
    ],
  },
  {
    title: "Giao dịch",
    icon: FaExchangeAlt,
    items: [
      { label: "Nhập hàng", path: "/purchase-order", icon: FaTruckLoading },
      { label: "Tạo giao dịch mới", path: "/giao-dich/tao-moi" },
    ],
  },
  {
    title: "Đối tác",
    icon: FaUsers,
    items: [
      { label: "Danh sách đối tác", path: "/doi-tac/danh-sach" },
      { label: "Thêm đối tác mới", path: "/doi-tac/them-moi" },
    ],
  },
  {
    title: "Nhân viên",
    icon: FaUserTie,
    items: [
      { label: "Danh sách nhân viên", path: "/nhan-vien/danh-sach" },
      { label: "Thêm nhân viên mới", path: "/nhan-vien/them-moi" },
    ],
  },
  {
    title: "Sổ quỹ",
    icon: FaCashRegister,
    items: [
      { label: "Xem sổ quỹ", path: "/so-quy/xem" },
      { label: "Thêm giao dịch", path: "/so-quy/them-giao-dich" },
    ],
  },
  {
    title: "Báo cáo",
    icon: FaChartBar,
    items: [
      { label: "Báo cáo doanh thu", path: "/bao-cao/doanh-thu" },
      { label: "Báo cáo chi phí", path: "/bao-cao/chi-phi" },
    ],
  },
  {
    title: "Bán Online",
    icon: FaShoppingCart,
    items: [
      { label: "Quản lý đơn hàng", path: "/ban-online/quan-ly-don-hang" },
      { label: "Cài đặt cửa hàng", path: "/ban-online/cai-dat-cua-hang" },
    ],
  },
];

export default navConfig;
