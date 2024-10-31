import React, { useState } from "react";
import { Flex, Table, ConfigProvider, Button, Tabs } from "antd";

const columns = [
  {
    title: "Mã hàng",
    dataIndex: "name",
  },
  {
    title: "Tên hàng",
    dataIndex: "age",
  },
  {
    title: "Giá bán",
    dataIndex: "address",
  },
  {
    title: "Giá vốn",
    dataIndex: "address",
  },
  {
    title: "Tồn kho",
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
          {/* <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button> */}
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>
        <Table
          pagination={false}
          className="border"
          rowSelection={rowSelection}
          columns={columns}
          expandable={{
            expandRowByClick: true,
            expandedRowRender: (record) => (
              <div>
                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  items={new Array(3).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                      label: `Card Tab ${id}`,
                      key: id,
                      children: `Content of card tab ${id}`,
                    };
                  })}
                />
              </div>
            ),
            onExpand: handleExpand,
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
