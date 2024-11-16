import React from "react";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import DropdownCheckbox from "../../components/dropdown/DropdownCheckbox";
import { useStore } from "../../hooks/useStore";

const statusOption = [
  { label: "Phiếu tạm", value: "TEMPORARY" },
  { label: "Đã xác nhận NCC", value: "CONFIRMED" },
  { label: "Hoàn thành", value: "RECEIVED" },
  { label: "Đã hủy", value: "CANCELLED" },
];

const OrderSupplierFilterSidebar = ({ setFilters }) => {
  const { stores } = useStore();

  const handleStoreChange = (storeId) => {
    setFilters({ storeId });
  };

  const handleStatusChange = (selectedStatuses) => {
    setFilters({ status: selectedStatuses }); // Gửi danh sách trạng thái
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Phiếu đặt hàng nhập</div>
      </h1>
      <DropdownSelectSearch
        title="Cửa hàng"
        options={stores.map((store) => ({
          value: store.id,
          label: store.name,
        }))}
        onOptionSelect={handleStoreChange}
      />
      <DropdownCheckbox
        title="Trạng thái"
        options={statusOption}
        onSelectionChange={
          (selectedOptions) =>
            handleStatusChange(selectedOptions.map((opt) => opt.value)) // Chỉ lấy `value`
        }
      />
    </div>
  );
};

export default OrderSupplierFilterSidebar;
