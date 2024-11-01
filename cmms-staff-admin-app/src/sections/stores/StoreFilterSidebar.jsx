import React from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";

const status = ["Đang hoạt động", "Ngừng hoạt động"];

const StoreFilterSidebar = () => {
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Cửa hàng</div>
      </h1>
      <DropdownRadio title="Trạng thái" options={status} />
    </div>
  );
};

export default StoreFilterSidebar;
