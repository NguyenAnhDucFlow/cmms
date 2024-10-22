import React from "react";
import { PlusOutlined, ImportOutlined, ExportOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ProductButtonGroup = ({ onAddNewClick }) => {
  return (
    <div className="space-x-2">
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick}>
        Thêm mới
      </Button>

      <Button type="primary" icon={<ImportOutlined />}>
        Import
      </Button>
      
      <Button type="primary" icon={<ExportOutlined />}>
        Xuất file
      </Button>
    </div>
  );
};

export default ProductButtonGroup;
