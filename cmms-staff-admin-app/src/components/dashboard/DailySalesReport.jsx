import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { BsArrowUpCircleFill } from "react-icons/bs";

const DailySalesReport = () => {
  return (
    <div className="card shadow-md bg-white rounded-md">
      <h3 className="font-bold px-4 pt-4 text-sm">KẾT QUẢ BÁN HÀNG HÔM NAY</h3>
      <ul className="flex px-4 pt-1">
        <li className="flex items-center gap-2">
          <AiFillDollarCircle size={30} className="text-primary" />
          <div className="mt-2 ">
            <div className="text-xs ml-1">1 Hóa đơn</div>
            <div className="text-primary text-2xl font-medium">7,777,000</div>
            <div className="text-xs ml-1">Doanh thu</div>
          </div>
          <div className="divider divider-horizontal"></div>
        </li>
        <li className="flex items-center gap-2">
          <IoArrowUndoCircleSharp size={30} className="text-secondary" />
          <div className="mt-2 ">
            <div className="text-xs ml-1">0 phiếu</div>
            <div className="text-secondary text-2xl font-medium">0</div>
            <div className="text-xs ml-1">Trả hàng</div>
          </div>
          <div className="divider divider-horizontal"></div>
        </li>
        <li className="flex items-center gap-2">
          <BsArrowUpCircleFill size={30} className="text-error" />
          <div className="mt-2 ">
            <div className="text-xs ml-1 invisible">placeholder</div>
            <div className="text-error text-2xl font-medium">-27.46%</div>
            <div className="text-xs ml-1">So với hôm qua</div>
          </div>
          <div className="divider divider-horizontal"></div>
        </li>
        <li className="flex items-center gap-2">
          <BsArrowUpCircleFill size={30} className="text-error" />
          <div className="mt-2 ">
            <div className="text-xs ml-1 invisible">placeholder</div>
            <div className="text-error text-2xl font-medium">-57.78%</div>
            <div className="text-xs ml-1">So với cùng kì tháng trước</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DailySalesReport;
