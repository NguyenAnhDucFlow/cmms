import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { FaRegListAlt } from "react-icons/fa";

const MenuDropdown = () => {
  const { logout } = useAuth();

  const items = [
    {
      label: (
        <Link to="#" className="flex items-center gap-2">
          <MdOutlineShoppingBag size={20} />
          <div>Xử lí đặt hàng</div>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <button className="flex items-center gap-2">
          <IoArrowUndoCircleOutline size={20} />
          <div>Chọn hóa đơn trả hàng</div>
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <button className="flex items-center gap-2">
          <PiNotePencil size={20} />
          <div>Lập phiếu thu</div>
        </button>
      ),
      key: "2",
    },
    {
      label: (
        <Link to="/" className="flex items-center gap-2">
          <FaRegListAlt size={18} />
          <div>Quản lí</div>
        </Link>
      ),
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <LuLogOut />
          Đăng xuất
        </button>
      ),
      key: "4",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Button
          type="primary"
          shape="circle"
          icon={<AiOutlineMenu size={19} />}
        />
      </a>
    </Dropdown>
  );
};

export default MenuDropdown;
