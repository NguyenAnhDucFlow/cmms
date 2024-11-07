import React from "react";
import { PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";

const StockTakesButton = ({ onAddNewClick }) => {
  return (
    <div className="space-x-2">
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick}>
        Kiểm kho
      </Button>

      <Button type="primary" icon={<ExportOutlined />}>
        Xuất file
      </Button>
    </div>
  );
};

export default StockTakesButton;
