import React from "react";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import DropdownCheckbox from "../../components/dropdown/DropdownCheckbox";
import { useStore } from "../../hooks/useStore";

const statusOption = [
  { label: "Phiếu tạm", value: "TEMPORARY" },
  { label: "Đã nhập hàng", value: "CONFIRMED" },
  { label: "Đã hủy", value: "CANCELLED" },
];

const PurchaseOrderFilterSidebar = ({ setFilters }) => {
  const { stores } = useStore();

  const handleStoreChange = (storeId) => {
    setFilters({ storeId });
  };

  const handleStatusChange = (selectedStatuses) => {
    setFilters({ status: selectedStatuses });
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Phiếu nhập hàng</div>
      </h1>
      <DropdownSelectSearch
        title="Cửa hàng"
        options={stores}
        onOptionSelect={handleStoreChange}
      />
      <DropdownCheckbox
        title="Trạng thái"
        options={statusOption}
        onSelectionChange={handleStatusChange}
      />
    </div>
  );
};

export default PurchaseOrderFilterSidebar;
