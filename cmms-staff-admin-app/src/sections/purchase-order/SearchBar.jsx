import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, List, Avatar } from "antd";
import { useData } from "../../hooks/useData";

const SearchBar = ({ onItemSelect }) => {
  const { importList } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemSelect = (item) => {
    onItemSelect(item);
    setSearchTerm("");
  };

  const filteredList = importList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative", width: "40%" }}>
      <Input
        placeholder="Tìm kiếm theo tên hàng"
        prefix={<SearchOutlined />}
        size="large"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {searchTerm && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: 4,
            maxHeight: 300,
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredList}
            renderItem={(item) => (
              <List.Item
                className="ml-4 flex items-center cursor-pointer"
                onClick={() => handleItemSelect(item)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      src={
                        item.coverImageUrl ||
                        "https://tse1.mm.bing.net/th?id=OIP.FR4m6MpuRDxDsAZlyvKadQHaFL&pid=Api&P=0&h=220"
                      }
                    />
                  }
                  title={`${item.name} (${item.unitName})`}
                  description={`Giá: ${item.costPrice} - Tồn: ${item.quantity}`}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
