import React from "react";
import SearchBar from "../sections/purchase-order/SearchBar";
import TablePurchaseOrder from "../sections/purchase-order/TablePurchaseOrder";
import InfoPurchaseOrder from "../sections/purchase-order/InfoPurchaseOrder";

const PurchaseOrder = () => {
  return (
    <div className="flex gap-4 h-[600px]">
      <div className="w-[76%] space-y-4 ">
        <SearchBar />
        <TablePurchaseOrder />
      </div>
      <div className="w-[24%]">
        <InfoPurchaseOrder />
      </div>
    </div>
  );
};

export default PurchaseOrder;
