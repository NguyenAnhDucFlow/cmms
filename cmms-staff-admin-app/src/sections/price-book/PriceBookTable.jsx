import React from "react";
import { Pagination } from "antd";
import { Empty } from "antd";

const PriceBookTable = ({ products }) => {
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-300 ">
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
          {products && products.lenght > 0 ? (
            products.map((row, index) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <Empty className="py-8" description="No data available" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PriceBookTable;
