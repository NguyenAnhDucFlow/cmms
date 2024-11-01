import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const StoreButton = ({ onAddNewClick }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick}>
      Cửa hàng
    </Button>
  );
};

export default StoreButton;
