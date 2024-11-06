import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const response = await axios.get("/stores");
        setStores(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadStores();
  }, []);

  const changeStore = (newStoreId, storeName) => {
    setStoreId(newStoreId);
    toast.success(`Đã chuyển sang cửa hàng ${storeName}`);
  };

  return (
    <StoreContext.Provider value={{ stores, storeId, changeStore }}>
      {children}
    </StoreContext.Provider>
  );
};
