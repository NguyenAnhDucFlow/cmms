import React from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";

const ProductFilterSidebar = () => {
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Hàng hóa</div>
      </h1>
      <DropdownRadio />
      <DropdownRadio />
      <DropdownRadio />
      <DropdownSelectSearch />
    </div>
  );
};

export default ProductFilterSidebar;
