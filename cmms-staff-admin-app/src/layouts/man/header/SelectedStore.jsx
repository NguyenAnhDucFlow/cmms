import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { IoStorefront } from "react-icons/io5";
import { useStore } from "../../../hooks/useStore";
import useAuth from "../../../hooks/useAuth";

const SelectedStore = () => {
  const { user } = useAuth();
  const { stores, changeStore } = useStore();
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
      defaultValue={user?.store}
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
