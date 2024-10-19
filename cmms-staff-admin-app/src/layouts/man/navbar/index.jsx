import React from "react";
import navConfig from "./navConfig";
import DropDownItem from "./DropDownItem";

const ManNavbar = () => {
  return (
    <nav className="bg-primary">
      <div className="container flex items-center justify-start  h-[44px]">
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
    </nav>
  );
};

export default ManNavbar;
