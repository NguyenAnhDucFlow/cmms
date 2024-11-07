import React from "react";
import { ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PriceBookButton = ({ onAddNewClick }) => {
  return (
    <Button type="primary" icon={<ExportOutlined />}>
      Xuất file
    </Button>
  );
};

export default PriceBookButton;
