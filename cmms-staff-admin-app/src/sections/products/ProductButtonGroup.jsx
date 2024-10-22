import React, { useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";
import {
  PlusOutlined,
  ImportOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Tab 1",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const ProductButtonGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-x-2">
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm mới
      </Button>
      {isModalOpen && (
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                headerBg: "313131",
              },
            },
          }}
        >
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Modal>
        </ConfigProvider>
      )}

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
