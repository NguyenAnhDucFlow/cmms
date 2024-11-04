import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(null);

  const changeStore = (newStoreId, storeName) => {
    setStoreId(newStoreId);
    toast.success(`Đã chuyển sang cửa hàng ${storeName}`);
  };

  return (
    <StoreContext.Provider value={{ storeId, changeStore }}>
      {children}
    </StoreContext.Provider>
  );
};
