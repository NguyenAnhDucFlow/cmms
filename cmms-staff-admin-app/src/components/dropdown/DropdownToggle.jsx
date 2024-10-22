import React from "react";
import { DownOutlined } from "@ant-design/icons";

const DropdownToggle = ({ isOpen, toggleDropdown }) => (
  <button className="btn btn-circle btn-ghost btn-xs" onClick={toggleDropdown}>
    <div className="flex items-center gap-2">
      <DownOutlined
        size={16}
        className={`transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  </button>
);

export default DropdownToggle;
