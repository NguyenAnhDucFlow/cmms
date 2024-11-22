import React, { useState } from "react";
import Page from "../components/Page";
import ShipperFilterSidebar from "../sections/shipper/ShipperFilterSidebar";
import ShipperTable from "../sections/shipper/ShipperTable";
import ShipperSearch from "../sections/shipper/ShipperSearch";
import ShipperButton from "../sections/shipper/ShipperButton";

const Shipper = () => {
  return (
    <Page title="Đối tác giao hàng">
      <div className="flex gap-6">
        <div className="w-[16%]">
          <ShipperFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <ShipperSearch />
            <ShipperButton />
          </div>
          <ShipperTable />
        </div>
      </div>
    </Page>
  );
};

export default Shipper;
