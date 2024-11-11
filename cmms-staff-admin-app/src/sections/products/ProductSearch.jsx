import React, { useState, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import debounce from "lodash.debounce";

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm debounce gọi API khi người dùng dừng gõ
  const debounceSearch = useCallback(
    debounce((query) => onSearch(query), 500), // 500ms là khoảng thời gian debounce
    [onSearch]
  );

  // Xử lý sự thay đổi input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounceSearch(value); // Gọi hàm debounce
  };

  return (
    <Input
      placeholder="Tìm kiếm theo tên hàng"
      prefix={<SearchOutlined />}
      size="large"
      value={searchTerm}
      onChange={handleInputChange}
      className="w-[40%]"
    />
  );
};

export default ProductSearch;
