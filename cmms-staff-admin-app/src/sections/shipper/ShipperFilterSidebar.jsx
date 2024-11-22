import React from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";

const status = ["Đang hoạt động", "Ngừng hoạt động"];

const ShipperFilterSidebar = () => {
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Đối tác giao hàng</div>
      </h1>
      <DropdownRadio title="Trạng thái" options={status} />
    </div>
  );
};

export default ShipperFilterSidebar;
