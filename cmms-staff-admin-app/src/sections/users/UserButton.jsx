import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const UserButton = ({ onAddNewClick }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick}>
      Người dùng
    </Button>
  );
};

export default UserButton;
