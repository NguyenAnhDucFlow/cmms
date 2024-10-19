import React from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import {
  MdOutlineStoreMallDirectory,
  MdOutlineManageAccounts,
} from "react-icons/md";

const SettingPopover = () => {
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn glass btn-sm my-1 text-sm rounded-md "
      >
        <FaCog size={16} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link>
            <MdOutlineManageAccounts />
            Quản lí người dùng
          </Link>
        </li>
        <li>
          <Link>
            <MdOutlineStoreMallDirectory />
            Quản lí chi nhánh
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingPopover;
