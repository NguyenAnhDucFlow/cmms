import React from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";

const status = ["Đang hoạt động", "Ngừng hoạt động"];

const UserFilterSidebar = () => {
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Người dùng</div>
      </h1>
      <DropdownSelectSearch title="Vai trò" />
      <DropdownRadio title="Trạng thái" options={status} />
    </div>
  );
};

export default UserFilterSidebar;
