import React from "react";
import Page from "../components/Page";
import SaleResults from "../components/dashboard/SaleResults";
import Revenue from "../components/dashboard/Revenue";
import TopProducts from "../components/dashboard/TopProducts";
import Notifications from "../components/dashboard/Notifications";

const Dashboard = () => {
  return (
    <Page title="Dashboard">
      <div className="grid grid-cols-[8fr,2fr] gap-x-4 gap-y-6">
        <div className="space-y-6">
          <SaleResults />
          <Revenue />
          <TopProducts />
        </div>

        <div className="">
          <Notifications />
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
