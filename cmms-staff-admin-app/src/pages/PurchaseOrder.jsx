import React from "react";
import SearchBar from "../sections/purchase-order/SearchBar";
import TablePurchaseOrder from "../sections/purchase-order/TablePurchaseOrder";

const PurchaseOrder = () => {
  return (
    <div>
      <SearchBar />
      <TablePurchaseOrder />
    </div>
  );
};

export default PurchaseOrder;
