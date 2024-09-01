import React, { useState, useRef } from "react";
import { FaCog } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

const SettingIcon = () => <FaCog className="w-4 h-4 black" />;

const SettingPopoverItem = ({ to, Icon, label }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    <div className="flex items-center">
      <Icon className="w-5 h-5 mr-2 text-gray-500" />
      <span>{label}</span>
    </div>
  </Link>
);

const Popover = ({ isOpen, handleMouseEnter, handleMouseLeave }) =>
  isOpen && (
    <div
      className="absolute bg-white right-0 mt-2 w-64 shadow-lg border border-gray-200 rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2">
        <SettingPopoverItem
          to="#"
          Icon={MdOutlineManageAccounts}
          label="Quản lí người dùng"
        />
      </div>
    </div>
  );

const SettingPopover = () => {
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
    }, 100);
  };
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hover:bg-gray-300 rounded py-1 px-2">
        <SettingIcon />
        <Popover
          isOpen={isOpen}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default SettingPopover;
