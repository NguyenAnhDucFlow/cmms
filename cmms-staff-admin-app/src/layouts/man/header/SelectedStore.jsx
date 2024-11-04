import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { IoStorefront } from "react-icons/io5";
import axios from "../../../utils/axios";
import { useStore } from "../../../hooks/useStore";
import useAuth from "../../../hooks/useAuth";

const SelectedStore = () => {
  const [stores, setStores] = useState([]);
  const { user } = useAuth();
  const { storeId, changeStore } = useStore();
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("/stores");
        setStores(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStores();
  }, []);

  const handleStoreChange = (value) => {
    const selectedStore = stores.find((store) => store.id === value);
    if (selectedStore) {
      const { id, name } = selectedStore;
      changeStore(id, name);
    }
  };

  return (
    <Select
      className="w-full"
      showSearch
      defaultValue={user?.store?.id}
      placeholder="Chọn cửa hàng"
      optionFilterProp="label"
      suffixIcon={
        <IoStorefront style={{ color: "#1a1a1a", fontSize: "16px" }} />
      }
      onChange={handleStoreChange}
      variant="borderless"
      options={stores.map((store) => ({
        value: store.id,
        label: store.name,
      }))}
    />
  );
};

export default SelectedStore;
