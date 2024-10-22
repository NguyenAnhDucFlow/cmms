import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
const ProductSearch = ({ onSearch }) => {
  return (
    <Input
      placeholder="default size"
      prefix={<SearchOutlined />}
      className="w-32"
    />
  );
};

export default ProductSearch;
