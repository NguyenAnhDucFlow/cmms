import React from "react";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import DropdownCheckbox from "../../components/dropdown/DropdownCheckbox";
import { useStore } from "../../hooks/useStore";

const statusOption = ["Phiếu tạm", "Đã xác nhận NCC", "Hoàn thành", "Đã hủy"];

const OrderSupplierFilterSidebar = ({ setFilters }) => {
  const { stores } = useStore();

  const handleBrandChange = (brandId) => {
    setFilters((prevFilters) => ({ ...prevFilters, brand: brandId }));
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Phiếu đặt hàng nhập</div>
      </h1>
      <DropdownSelectSearch
        title="Cửa hàng"
        options={stores}
        onOptionSelect={handleBrandChange}
      />
      <DropdownCheckbox title="Trạng thái" options={statusOption} />
    </div>
  );
};

export default OrderSupplierFilterSidebar;
