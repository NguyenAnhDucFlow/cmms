import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SettingPopover from "./SettingPopover";
import AccountPopover from "./AccountPopover";

const Header = () => (
  <div className="flex justify-between items-center py-1.5 max-w-[1491px] mx-auto">
    <div className="font-bold text-2xl">Logo</div>
    <header className="flex items-center space-x-4 ">
      <SettingPopover />
      <AccountPopover />
    </header>
  </div>
);

const ManLayout = () => {
  return (
    <div>
      <Header />
      <div className="bg-blue-600">
        <Navbar />
      </div>
      <div className="bg-gray-100 pt-6 h-screen">
        <section className="max-w-[1491px] mx-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ManLayout;
