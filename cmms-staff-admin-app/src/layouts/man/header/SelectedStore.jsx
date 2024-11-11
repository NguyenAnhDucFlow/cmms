import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";
import { IoStorefront } from "react-icons/io5";
import { useStore } from "../../../hooks/useStore";
import useAuth from "../../../hooks/useAuth";

const SelectedStore = () => {
  const { user } = useAuth();
  const { stores, changeStore, hasRoleAdmin } = useStore();
  const [defaultStore, setDefaultStore] = useState(null);

  const handleStoreChange = (value) => {
    const selectedStore = stores.find((store) => store.id === value);
    if (selectedStore) {
      const { id, name } = selectedStore;
      changeStore(id, name);
    }
  };

  // Determine which store should be the default based on the role
  useEffect(() => {
    const storeCentral = stores.find(
      (store) => store.name === "Cửa hàng trung tâm"
    );

    if (hasRoleAdmin && storeCentral) {
      setDefaultStore(storeCentral.id); // Default to the central store if user is admin
    } else {
      setDefaultStore(user?.store?.id); // Default to user's assigned store otherwise
    }
  }, [hasRoleAdmin, stores, user]);

  // Filter available stores based on role (Admins see all stores)
  const filteredStores = useMemo(() => {
    return hasRoleAdmin
      ? stores
      : stores.filter((store) => store.id === user?.store?.id);
  }, [hasRoleAdmin, stores, user]);

  return (
    <Select
      className="w-full"
      showSearch
      value={defaultStore}
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
