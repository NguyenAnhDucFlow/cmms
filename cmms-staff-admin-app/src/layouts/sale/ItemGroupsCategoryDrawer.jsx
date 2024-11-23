import { Checkbox, Drawer, Input, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useData } from "../../hooks/useData";

const ItemGroupsCategoryDrawer = ({ open, onClose, onFilterChange }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);

  const { categories } = useData();
  // Lọc nhóm hàng dựa trên từ khóa
  const filteredGroups = categories.filter((group) =>
    group.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Xử lý khi chọn/bỏ chọn checkbox
  const handleCheckboxChange = (groupId) => {
    setSelectedGroups(
      (prevSelected) =>
        prevSelected.includes(groupId)
          ? prevSelected.filter((id) => id !== groupId) // Bỏ chọn
          : [...prevSelected, groupId] // Chọn mới
    );
  };

  // Gửi danh sách đã chọn ra ngoài qua prop onFilterChange
  const applyFilter = () => {
    onFilterChange(selectedGroups);
  };

  return (
    <Drawer
      title="Lọc theo nhóm hàng"
      placement="right"
      closable={false}
      onClose={onClose}
      open={open}
      footer={
        <button
          onClick={applyFilter}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Áp dụng bộ lọc
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Thanh tìm kiếm */}
        <div className="flex items-center gap-4">
          <div className="font-semibold whitespace-nowrap">Nhóm hàng</div>
          <Input
            className="w-full"
            placeholder="Tìm nhóm hàng"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        {/* Danh sách nhóm hàng */}
        <List
          className="mt-2"
          dataSource={filteredGroups}
          renderItem={(item) => (
            <List.Item
              className="border-b flex items-center gap-2"
              key={item.id}
            >
              <Checkbox
                className="mr-2"
                checked={selectedGroups.includes(item.name)}
                onChange={() => handleCheckboxChange(item.name)}
              />
              {item.name}
            </List.Item>
          )}
        />
      </div>
    </Drawer>
  );
};

export default ItemGroupsCategoryDrawer;
