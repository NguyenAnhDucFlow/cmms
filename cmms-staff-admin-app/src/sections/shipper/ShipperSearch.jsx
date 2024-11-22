import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const ShipperSearch = () => {
  return (
    <Input
      placeholder="Tìm theo tên"
      prefix={<SearchOutlined />}
      size="large"
      className="w-[40%]"
    />
  );
};

export default ShipperSearch;
