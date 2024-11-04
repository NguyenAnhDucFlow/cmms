import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const UserSearch = () => {
  return (
    <Input
      placeholder="Tên người dùng"
      prefix={<SearchOutlined />}
      size="large"
      className="w-[40%]"
    />
  );
};

export default UserSearch;
