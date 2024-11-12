import React from "react";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import { useData } from "../../hooks/useData";
import DropdownCheckbox from "../../components/dropdown/DropdownCheckbox";

const statusOption = ["Phiếu tạm", "Đã nhập hàng"];

const PurchaseOrderFilterSidebar = ({ setFilters }) => {
  const { brands, categories } = useData();

  const handleBrandChange = (brandId) => {
    setFilters((prevFilters) => ({ ...prevFilters, brand: brandId }));
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Phiếu nhập hàng</div>
      </h1>
      <DropdownCheckbox title="Trạng thái" options={statusOption} />
      <DropdownSelectSearch
        title="Người tạo"
        options={brands}
        onOptionSelect={handleBrandChange}
      />
    </div>
  );
};

export default PurchaseOrderFilterSidebar;
