import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
const StockTakesSearch = ({ onSearch }) => {
  return (
    <Input
      placeholder="Theo mã phiếu kiểm"
      prefix={<SearchOutlined />}
      size="large"
      className="w-[40%]"
    />
  );
};

export default StockTakesSearch;
