import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

// AccountIcon Component
const AccountIcon = () => (
  <div className="flex items-center space-x-1 cursor-pointer">
    <span className="text-sm">0837525245</span>
    <div className="w-8 h-8  rounded-full flex items-center justify-center">
      <FaUserCircle className="w-4 h-4" />
    </div>
  </div>
);

// PopoverItem Component
const PopoverItem = ({ to, Icon, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-2 text-gray-500 " />
      <span>{label}</span>
    </div>
  </Link>
);

// Popover Component
const Popover = ({ isOpen, handleMouseEnter, handleMouseLeave }) =>
  isOpen && (
    <div
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2">
        <PopoverItem to="#" Icon={FaRegUserCircle} label="Tài khoản" />
        <PopoverItem to="#" Icon={AiOutlineLogout} label="Đăng xuất" />
      </div>
    </div>
  );

const AccountPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Delay closing to allow movement between elements
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hover:bg-gray-300 rounded py-1 px-2">
        <AccountIcon />
        <Popover
          isOpen={isOpen}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default AccountPopover;
