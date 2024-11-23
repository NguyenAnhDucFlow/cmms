import { Input, List } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "../../utils/axios";
import useStore from "../../store/posStore";

const SearchCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const setCustomerInfo = useStore((state) => state.setCustomerInfo);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const response = await axios.get("/users/by-role/CUSTOMER");
        setCustomers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCustomer();
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCustomerSelect = (customer) => {
    setCustomerInfo(customer);
    setSearchTerm("");
  };

  const filteredList = customers.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <Input
        style={{ background: "#f3f4f6" }}
        placeholder="Tìm khách hàng"
        className="w-full "
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
                className="ml-4 flex items-center cursor-pointer"
                onClick={() => handleCustomerSelect(item)}
              >
                {item.username} - {item.phone}
                <div>{item.customerCode}</div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SearchCustomer;
