import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const { roles, user } = useAuth();
  const initialStoreId = localStorage.getItem("storeId");
  const [storeId, setStoreId] = useState(initialStoreId || null);
  const [storeName, setStoreName] = useState("");

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

  const storeCentral = stores.find(
    (store) => store.name === "Cửa hàng trung tâm"
  );

  useEffect(() => {
    if (!initialStoreId) {
      if (hasRoleAdmin) {
        setStoreName(storeCentral.name);
        setStoreId(storeCentral.id);
      } else if (user?.store?.id) {
        setStoreId(user.store.id);
        setStoreName(user.store.name);
      }
    }
  }, [hasRoleAdmin, user, initialStoreId]);

  const changeStore = (newStoreId, storeName) => {
    setStoreId(newStoreId);
    setStoreName(storeName);
    localStorage.setItem("storeId", newStoreId);
    window.location.reload();
    toast.success(`Đã chuyển sang cửa hàng ${storeName}`);
  };

  return (
    <StoreContext.Provider
      value={{ stores, storeId, changeStore, hasRoleAdmin, storeName }}
    >
      {children}
    </StoreContext.Provider>
  );
};
