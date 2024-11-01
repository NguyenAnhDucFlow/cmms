import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const StoreSearch = () => {
  return (
    <Input
      placeholder="Tìm cửa hàng"
      prefix={<SearchOutlined />}
      size="large"
      className="w-[40%]"
    />
  );
};

export default StoreSearch;
