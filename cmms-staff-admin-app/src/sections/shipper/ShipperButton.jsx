import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ShipperButton = ({ onAddNewClick }) => {
  return (
    <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick}>
      Đối tác giao hàng
    </Button>
  );
};

export default ShipperButton;
