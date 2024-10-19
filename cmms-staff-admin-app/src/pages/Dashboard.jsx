import React from "react";
import Page from "../components/Page";
import DailySalesReport from "../components/dashboard/DailySalesReport";
import NetIncomeOverview from "../components/dashboard/NetIncomeOverview";
import TopSellingProducts from "../components/dashboard/TopSellingProducts";
import Notification from "../components/dashboard/Notification";

const Dashboard = () => {
  return (
    <Page title="Dashboard">
      <div className="flex gap-4">
        <div
          className="space-y-4 w-4/5
    "
        >
          <DailySalesReport />
          <NetIncomeOverview />
          <TopSellingProducts />
        </div>
        <Notification className="w-1/5" />
      </div>
    </Page>
  );
};

export default Dashboard;
