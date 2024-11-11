import React, { useMemo } from "react";
import { Select } from "antd";
import { IoStorefront } from "react-icons/io5";
import { useStore } from "../../../hooks/useStore";
import useAuth from "../../../hooks/useAuth";

const SelectedStore = () => {
  const { user } = useAuth();
  const { stores, storeId, changeStore, hasRoleAdmin } = useStore();

  const handleStoreChange = (value) => {
    const selectedStore = stores.find((store) => store.id === value);
    if (selectedStore) {
      const { id, name } = selectedStore;
      changeStore(id, name);
    }
  };

  const filteredStores = useMemo(() => {
    return hasRoleAdmin
      ? stores
      : stores.filter((store) => store.id === user?.store?.id);
  }, [hasRoleAdmin, stores, user]);

  return (
    <Select
      className="w-full"
      showSearch
      value={storeId}
      placeholder="Chọn cửa hàng"
      variant="borderless"
      optionFilterProp="label"
      suffixIcon={
        <IoStorefront style={{ color: "#1a1a1a", fontSize: "16px" }} />
      }
      onChange={handleStoreChange}
      options={filteredStores.map((store) => ({
        value: store.id,
        label: store.name,
      }))}
    />
  );
};

export default SelectedStore;
