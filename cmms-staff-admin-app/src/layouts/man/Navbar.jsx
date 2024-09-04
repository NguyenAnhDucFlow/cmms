import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaExchangeAlt,
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaShoppingCart,
  FaCashRegister,
} from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const giaoDichItems = [
    { to: "/dat-hang", label: "Đặt hàng" },
    { to: "/hoa-don", label: "Hóa đơn" },
    { to: "/van-don", label: "Vận đơn" },
    { to: "/tra-hang", label: "Trả hàng" },
    { to: "/nhap-hang", label: "Nhập hàng" },
    { to: "/tra-hang-nhap", label: "Trả hàng nhập" },
    { to: "/xuat-huy", label: "Xuất hủy" },
  ];

  return (
    <nav className=" text-white  flex justify-between items-center max-w-[1491px] mx-auto">
      <div className="flex items-center space-x-6 ">
        <Link to="/" className="flex items-center space-x-2">
          <FaHome />
          <span>Tổng quan</span>
        </Link>
        <Link to="/products" className="flex items-center space-x-2">
          <FaBox />
          <span>Hàng hóa</span>
        </Link>
        <DropdownMenu
          label="Giao dịch"
          icon={FaExchangeAlt}
          items={giaoDichItems}
        />
        <Link to="/doi-tac" className="flex items-center space-x-2">
          <FaUsers />
          <span>Đối tác</span>
        </Link>
        <Link to="/nhan-vien" className="flex items-center space-x-2">
          <FaUserTie />
          <span>Nhân viên</span>
        </Link>
        <Link to="/so-quy" className="flex items-center space-x-2">
          <FaCashRegister />
          <span>Sổ quỹ</span>
        </Link>
        <Link to="/bao-cao" className="flex items-center space-x-2">
          <FaChartBar />
          <span>Báo cáo</span>
        </Link>
        <Link to="/ban-online" className="flex items-center space-x-2">
          <FaShoppingCart />
          <span>Bán Online</span>
        </Link>
      </div>
      <Link
        to="/ban-hang"
        className="bg-blue-800 text-white px-4 py-2 rounded-lg"
      >
        Bán hàng
      </Link>
    </nav>
  );
};

export default Navbar;
