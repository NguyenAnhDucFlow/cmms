import { Form, Input, List, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "../../utils/axios";
import useStore from "../../store/posStore";
import CreateCustomerModal from "../../components/modal/CreateCustomerModal";

const SearchCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCustomer(null);
  };

  const handleCustomerSelect = (customer) => {
    setCustomerInfo(customer);
    setSelectedCustomer(customer);
    setSearchTerm(customer?.username);
  };

  const handleClearSelection = () => {
    setSearchTerm("");
    setSelectedCustomer(null);
  };

  const openCreateCustomerModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateCustomer = async (values) => {
    try {
      await axios.post("/users/register", values);
      message.success("Thêm mới khách hàng thành công");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const filteredList = customers.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <Input
        style={{ background: "#f3f4f6", width: "100%" }}
        placeholder="Tìm khách hàng"
        className="w-full "
        prefix={selectedCustomer ? <UserOutlined /> : <SearchOutlined />}
        value={searchTerm}
        onChange={handleInputChange}
        suffix={
          selectedCustomer ? (
            <CloseCircleOutlined
              style={{ cursor: "pointer", color: "#aaa" }}
              onClick={handleClearSelection}
            />
          ) : (
            <PlusOutlined
              style={{ cursor: "pointer", color: "#aaa" }}
              onClick={openCreateCustomerModal}
            />
          )
        }
      />

      {searchTerm && !selectedCustomer && (
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
      <CreateCustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateCustomer={handleCreateCustomer}
      />
    </div>
  );
};

export default SearchCustomer;
