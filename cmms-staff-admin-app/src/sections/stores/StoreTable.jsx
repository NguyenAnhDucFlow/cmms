import React, { useState } from "react";

const StoreTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setActiveTab(0); // Reset to the first tab when expanding a new row
  };

  const stores = [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
    },
    { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    {
      name: "Gingerbread",
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
    },
  ];

  const tabs = [
    { label: "Tab 1", content: "Content of tab 1" },
    { label: "Tab 2", content: "Content of tab 2" },
    { label: "Tab 3", content: "Content of tab 3" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-[#BBDEFB]">
            <th className="p-3 text-left border-b border-gray-300 text-sm font-semibold w-2/5">
              Tên cửa hàng
            </th>
            <th className="p-3 text-left border-b border-gray-300 text-sm font-semibold">
              Địa chỉ
            </th>
            <th className="p-3 text-left border-b border-gray-300 text-sm font-semibold">
              Điện thoại
            </th>
            <th className="p-3 text-left border-b border-gray-300 text-sm font-semibold">
              Số lượng người dùng
            </th>
            <th className="p-3 text-left border-b border-gray-300 text-sm font-semibold">
              Trạng thai
            </th>
          </tr>
        </thead>
        <tbody>
          {stores.map((row, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr
                onClick={() => handleRowClick(index)}
                className={`cursor-pointer hover:bg-[#BBDEFB] ${
                  expandedRow === index
                    ? "border-x-2 border-t-2 border-blue-600 bg-[#BBDEFB]"
                    : "border-b border-gray-300"
                }`}
              >
                <td className="p-4">{row.name}</td>
                <td className="p-4">{row.calories}</td>
                <td className="p-4">{row.fat}</td>
                <td className="p-4">{row.carbs}</td>
                <td className="p-4">{row.protein}</td>
              </tr>
              {/* Expanded Row with Custom Tabs */}
              {expandedRow === index && (
                <tr>
                  <td
                    colSpan="5"
                    className="border-x-2 border-blue-600 border-b-2 p-0 "
                  >
                    <div className="flex mb-4 bg-[#BBDEFB]">
                      <div className="ml-6">
                        {tabs.map((tab, tabIndex) => (
                          <button
                            key={tabIndex}
                            onClick={() => setActiveTab(tabIndex)}
                            className={`px-4 py-2 font-medium border-x-1 border-t   ${
                              activeTab === tabIndex
                                ? "border-gray-300 text-blue-500 bg-white"
                                : "border-transparent text-gray-500"
                            } hover:text-blue-500`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">{tabs[activeTab].content}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
