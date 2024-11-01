import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
const ProductSearch = ({ onSearch }) => {
  return (
    <Input
      placeholder="Tìm kiếm theo tên hàng"
      prefix={<SearchOutlined />}
      size="large"
      className="w-[40%]"
    />
  );
};

export default ProductSearch;
