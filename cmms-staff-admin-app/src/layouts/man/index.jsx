import React from "react";
import ManHeader from "./header";
import ManNavbar from "./navbar";
import { Outlet } from "react-router-dom";

const ManLayout = () => {
  return (
    <>
      <ManHeader />
      <ManNavbar />
      <main className=" bg-background">
        <div className="container py-4 ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ManLayout;
