import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const OrderSupplierButtonGroup = () => {
  const navigate = useNavigate();
  return (
    <div className="space-x-2">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate("new")}
      >
        Đặt hàng nhập
      </Button>
    </div>
  );
};

export default OrderSupplierButtonGroup;
