import React from "react";
import { Link } from "react-router-dom";

const DropDownItem = ({ title, path, items, icon: Icon }) => {
  return (
    <div className="dropdown dropdown-hover">
      {items && items.length > 0 ? (
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-sm my-2 rounded-md hover:bg-hoverPrimary"
        >
          <Icon size={16} className="text-white" />
          <span className="text-white font-medium">{title}</span>
        </div>
      ) : (
        <Link
          to={path}
          className=" btn btn-ghost btn-sm my-2 rounded-md hover:bg-hoverPrimary"
        >
          <Icon size={16} className="text-white" />
          <span className="text-white font-medium">{title}</span>
        </Link>
      )}

      {items && items.length > 0 && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
        >
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                {item.icon && <item.icon />}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownItem;
