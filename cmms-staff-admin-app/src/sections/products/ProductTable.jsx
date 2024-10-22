import React, { useState } from "react";
import { Flex, Table, ConfigProvider, Button } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const dataSource = Array.from({
  length: 10,
}).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

const ProductTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKey, setExpandedRowKey] = useState(null);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleExpand = (expanded, record) => {
    setExpandedRowKey(expanded ? record.key : null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgContainer: "#FFFFFF",
        },
        components: {
          Table: {
            headerBg: "#BBDEFB",
            rowHoverBg: "#BBDEFB",
            borderColor: "#BBDEFB",
            expandIconBg: "#BBDEFB",
            algorithm: true,
          },
        },
      }}
    >
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>
        <Table
          pagination={false}
          className="border"
          rowSelection={rowSelection}
          columns={columns}
          expandable={{
            expandRowByClick: true,
            expandedRowRender: (record) => <div>test </div>,
            onExpand: handleExpand, // Điều khiển mở/đóng hàng
            expandedRowKeys: [expandedRowKey],
            rowExpandable: (record) => record.name !== "Not Expandable",
            expandIcon: () => null,
            expandIconColumnIndex: -1,
          }}
          dataSource={dataSource}
          onRow={(record, index) => ({
            onClick: () => handleExpand(expandedRowKey !== record.key, record),
            className: `
              ${
                expandedRowKey === record.key
                  ? "bg-blue-200 border-2 border-blue-500"
                  : ""
              } 
              ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} 
              cursor-pointer`,
          })}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default ProductTable;
