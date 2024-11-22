import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, List, Avatar } from "antd";
import { useStore as Store } from "../../hooks/useStore";
import axios from "../../utils/axios";
import { formatCurrency } from "../../utils/formatCurrency";
import useStore from "../../store/posStore";

const SearchBar = () => {
  const { storeId } = Store();
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const { addItemToOrder } = useStore();

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        const response = await axios.get(`/materials/getAll/${storeId}`);
        setMaterials(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadMaterials();
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemSelect = (item) => {
    addItemToOrder(item);
    setSearchTerm("");
  };

  const filteredList = materials.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <Input
        size="large"
        placeholder="Tìm kiếm theo tên hàng"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {searchTerm && (
        <div
          style={{
            position: "absolute",
            top: "110%",
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
                className="ml-4 flex items-center cursor-pointer "
                onClick={() => handleItemSelect(item)}
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    size="large"
                    shape="square"
                    src={
                      item.coverImageUrl ||
                      "https://tse1.mm.bing.net/th?id=OIP.FR4m6MpuRDxDsAZlyvKadQHaFL&pid=Api&P=0&h=220"
                    }
                  />
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      {item.name}
                      <div className="text-primary font-medium">
                        ({item.unitName !== null ? item.unitName : ""})
                      </div>
                    </div>
                    <div>{item.materialCode}</div>
                    <div>Tồn: {item.quantity}</div>
                  </div>
                </div>
                <div className="mr-2 text-[17px] font-bold text-primary">
                  {formatCurrency(item.salePrice || 0)}
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
