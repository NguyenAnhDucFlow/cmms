import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";

const AccountPopover = () => {
  const { logout, user } = useAuth();
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn glass btn-sm my-1 text-sm rounded-md "
      >
        <div className="whitespace-nowrap flex items-center gap-2">
          <div>{user?.username}</div>
          <FaUserCircle size={16} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link>
            <CgProfile />
            Tài khoản
          </Link>
        </li>
        <li>
          <button onClick={logout}>
            <LuLogOut />
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountPopover;
