import React, { useState } from "react";
import { Pagination } from "antd";

const PriceBookTable = ({ products }) => {
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[#BBDEFB]">
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%]">
              Mã hàng
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold ">
              Tên hàng
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%] ">
              Giá vốn
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%] ">
              Giá nhập cuối
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%] ">
              Giá chung
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                className={`cursor-pointer hover:bg-[#BBDEFB] ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-4">{row.materialCode}</td>
                <td className="p-4">{row.name}</td>
                <td className="p-4">{row.salePrice}</td>
                <td className="p-4">{row.costPrice}</td>
                <td className="p-4">{row.quantity}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination size="small" total={50} showSizeChanger />
    </div>
  );
};

export default PriceBookTable;
