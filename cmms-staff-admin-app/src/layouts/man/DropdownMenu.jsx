import React from "react";
import { Link } from "react-router-dom";

const DropdownMenu = ({ label, icon: Icon, items }) => {
  return (
    <div className="relative group">
      <Link to="#" className="flex items-center space-x-2">
        <Icon />
        <span>{label}</span>
      </Link>
      <div className="absolute left-0 mt-2 w-48 bg-blue-600 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {items.map((item, index) => (
          <Link key={index} to={item.to} className="block px-4 py-2">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
