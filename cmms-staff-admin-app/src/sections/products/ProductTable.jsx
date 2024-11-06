import React, { useState } from "react";
import { Image } from "antd";
import axios from "../../utils/axios";

const ProductTable = ({ products }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState({});

  const fetchProductDetail = async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRowClick = (index, productId) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle the expanded row
    setActiveTab(0); // Reset tab to the first one when opening a new row

    // Nếu mở dòng mới và chi tiết sản phẩm chưa được tải, thì fetch dữ liệu
    if (isExpandingNewRow && !productDetails[productId]) {
      fetchProductDetail(productId);
    }
  };

  // Tab contents and labels
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
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-1/12"></th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-1/12">
              Mã hàng
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-2/6">
              Tên hàng
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-1/6">
              Giá bán
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-1/6">
              Giá vốn
            </th>
            <th className="p-2 text-left border-b border-gray-300 text-sm font-semibold w-1/6">
              Tồn kho
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => handleRowClick(index)}
                className={`cursor-pointer hover:bg-[#BBDEFB] ${
                  expandedRow === index
                    ? "border-x-2 border-t-2 border-blue-600 bg-[#BBDEFB]"
                    : "border-b border-gray-300"
                }`}
              >
                <td className="p-2">
                  <Image
                    width={40}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </td>
                <td className="p-2">{row.materialCode}</td>
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.salePrice}</td>
                <td className="p-2">{row.costPrice}</td>
                <td className="p-2">{row.quantity}</td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td
                    colSpan="6"
                    className="border-x-2 border-blue-600 border-b-2 p-0"
                  >
                    <div className="flex mb-4 bg-[#BBDEFB]">
                      <div className="ml-6">
                        {tabs.map((tab, tabIndex) => (
                          <button
                            key={tabIndex}
                            onClick={() => setActiveTab(tabIndex)}
                            className={`px-4 py-2 font-medium border-x-1 border-t ${
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
                    <div className="p-4">
                      {activeTab === 0 && productDetails[row.id] ? (
                        <div>
                          <p>
                            <strong>Description:</strong>{" "}
                            {productDetails[row.id].description}
                          </p>
                          <p>
                            <strong>Category:</strong>{" "}
                            {productDetails[row.id].category}
                          </p>
                        </div>
                      ) : activeTab === 0 ? (
                        <p>Loading product details...</p>
                      ) : (
                        <div>{tabs[activeTab].content}</div>
                      )}
                    </div>
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

export default ProductTable;
