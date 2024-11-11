import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const { user, roles } = useAuth();
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const response = await axios.get("/stores");
        setStores(response.data.data);
      } catch (error) {
        console.error(
          "Error loading stores:",
          error.response?.data || error.message
        );
      }
    };
    loadStores();
  }, []);

  const hasRoleAdmin = useMemo(
    () => roles.some((role) => role.name === "SENIOR_MANAGEMENT"),
    [roles]
  );

  useEffect(() => {
    const storeCentral = stores.find(
      (store) => store.name === "Cửa hàng trung tâm"
    );

    if (hasRoleAdmin && storeCentral) {
      setStoreId(storeCentral.id);
    } else {
      setStoreId(user?.store?.id);
    }
  }, [hasRoleAdmin, stores, user]);

  const changeStore = (newStoreId, storeName) => {
    setStoreId(newStoreId);
    toast.success(`Đã chuyển sang cửa hàng ${storeName}`);
  };

  return (
    <StoreContext.Provider
      value={{ stores, storeId, changeStore, hasRoleAdmin }}
    >
      {children}
    </StoreContext.Provider>
  );
};
