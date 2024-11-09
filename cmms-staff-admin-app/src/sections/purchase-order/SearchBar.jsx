import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "antd";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-start gap-6 whitespace-nowrap">
      <FaArrowLeft />
      <h1 className="m-0">Nhập hàng</h1>
      <Input
        size="large"
        placeholder="large size"
        prefix={<IoSearchOutline />}
      />
    </div>
  );
};

export default SearchBar;
