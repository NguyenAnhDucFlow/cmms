import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState(
    localStorage.getItem("selectedStoreId") || null
  );

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
        toast.error("Failed to load stores.");
      }
    };
    loadStores();
  }, []);

  const changeStore = (newStoreId, storeName) => {
    setStoreId(newStoreId);
    localStorage.setItem("selectedStoreId", newStoreId);
    toast.success(`Đã chuyển sang cửa hàng ${storeName}`);
  };

  return (
    <StoreContext.Provider value={{ stores, storeId, changeStore }}>
      {children}
    </StoreContext.Provider>
  );
};
