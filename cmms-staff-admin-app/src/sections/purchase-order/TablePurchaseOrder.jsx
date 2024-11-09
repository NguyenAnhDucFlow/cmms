import React from "react";
import { Empty } from "antd";

const TablePurchaseOrder = ({ products }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 h-[88%]">
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
      <tbody className="overflow-y-auto">
        {products && products.length > 0 ? (
          products.map((row, index) => (
            <React.Fragment key={index}>
              <tr className="cursor-pointer hover:bg-[#BBDEFB]">
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
              <Empty description="No data available" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TablePurchaseOrder;
