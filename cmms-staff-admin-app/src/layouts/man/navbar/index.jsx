import React from "react";
import navConfig from "./navConfig";
import DropDownItem from "./DropDownItem";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManNavbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container flex items-center justify-between h-[44px]">
        <div>
          {navConfig.map((dropdown, index) => (
            <DropDownItem
              key={index}
              title={dropdown.title}
              icon={dropdown.icon}
              items={dropdown.items}
              path={dropdown.path}
            />
          ))}
        </div>
        <Link to="/sale">
          <div className="btn btn-ghost btn-sm my-2 bg-hoverPrimary rounded-md ">
            <FaShoppingCart size={16} className="text-white" />
            <span className="text-white font-medium">Bán hàng</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default ManNavbar;
