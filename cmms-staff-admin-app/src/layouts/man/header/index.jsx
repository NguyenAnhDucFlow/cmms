import React from "react";
import Lottie from "lottie-react";
import AccountPopover from "./AccountPopover";
import SettingPopover from "./SettingPopover";
import logo from "../../../assets/logo.json";

const ManHeader = () => {
  return (
    <header className="container flex items-center justify-between  h-[50px]">
      <div className="flex items-center ">
        <Lottie
          animationData={logo}
          className="mx-auto"
          style={{ height: 30, width: 30 }}
        />
        <div className="text-2xl font-sans text-primary">Cmms</div>
      </div>

      <div className="flex items-center">
        <SettingPopover />
        <AccountPopover />
      </div>
    </header>
  );
};

export default ManHeader;
