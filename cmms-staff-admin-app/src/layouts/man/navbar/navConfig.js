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
import { FaTruckFront } from "react-icons/fa6";
import { BsBoxes } from "react-icons/bs";
import { LuTags } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

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
      { label: "Thiết lập giá", path: "/price-book", icon: LuTags },
      {
        label: "Kiểm kho",
        path: "/stock-takes",
        icon: MdOutlineInventory,
      },
    ],
  },
  {
    title: "Giao dịch",
    icon: FaExchangeAlt,
    items: [
      { label: "Nhập hàng", path: "/purchase-order", icon: FaTruckLoading },
      {
        label: "Đặt hàng nhập",
        path: "/order-supplier",
        icon: FaTruckFront,
      },
      { label: "Tạo giao dịch mới", path: "/giao-dich/tao-moi" },
    ],
  },
  {
    title: "Đối tác",
    icon: FaUsers,
    items: [
      {
        label: "Khách hàng",
        path: "/customer",
        icon: FaUserAlt,
      },
      {
        label: "Nhà cung cấp",
        path: "/suppliers",
        icon: FaChalkboardTeacher,
      },
      {
        label: "Đối tác giao hàng",
        path: "/partner-delivery",
        icon: MdDeliveryDining,
      },
    ],
  },
  {
    title: "Sổ quỹ",
    icon: FaCashRegister,
    path: "/cash-flow",
  },
];

export default navConfig;
