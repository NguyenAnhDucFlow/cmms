import React, { useState } from "react";
import { Image, Divider, Button, Pagination } from "antd";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { FaCheckSquare, FaLock } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "../../utils/axios";
import { useStore } from "../../hooks/useStore";

const ProductTable = ({ products }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState({});
  const { storeId } = useStore();

  const fetchProductDetail = async (productId) => {
    try {
      const response = await axios.get(
        `/materials/${productId}/stores/${storeId}`
      );
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: response.data.data,
      }));
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRowClick = (index, productId) => {
    const isNewRowExpanding = expandedRow === null || expandedRow !== index;
    setExpandedRow(isNewRowExpanding ? index : null);
    setActiveTab(0);
    if (isNewRowExpanding && !productDetails[productId]) {
      fetchProductDetail(productId);
    }
  };

  const tabs = [
    { label: "Thông tin", content: "Content of tab 1" },
    { label: "Tab 2", content: "Content of tab 2" },
    { label: "Tab 3", content: "Content of tab 3" },
  ];

  return (
    <div className=" space-y-4">
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
                onClick={() => handleRowClick(index, row.id)}
                className={`cursor-pointer hover:bg-[#BBDEFB] ${
                  expandedRow === index
                    ? "border-x-2 border-t-2 border-blue-600 bg-[#BBDEFB]"
                    : "border-b border-gray-300"
                }`}
              >
                <td className="p-2 ">
                  <Image
                    className="ml-4"
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
                    <div className="flex bg-[#BBDEFB]">
                      <div className="ml-6">
                        {tabs.map((tab, tabIndex) => (
                          <button
                            key={tabIndex}
                            onClick={() => setActiveTab(tabIndex)}
                            className={`px-4 py-2 font-medium border-x border-t ${
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
                    <div className="p-6">
                      {activeTab === 0 && productDetails[row.id] ? (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="text-xl text-blue-600">
                              {productDetails[row.id]?.name || "No Name"}
                            </div>
                            <div>
                              {productDetails[row.id]?.point ? (
                                <div className="flex items-center ">
                                  <IoMdCheckmark className="text-green-500" />
                                  <div className="text-sm font-semibold gap-1">
                                    Tích điểm
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <IoMdClose className="text-red-700" />
                                  <div className="text-sm font-semibold">
                                    Không tích điểm
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-8">
                            <div className="flex gap-8">
                              <div className="flex gap-2 w-1/3">
                                <Image
                                  width={296}
                                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                              </div>
                              <div className="w-1/3 space-y-4">
                                <DetailRow
                                  label="Mã hàng:"
                                  data={productDetails[row.id]?.materialCode}
                                />
                                <Divider />
                                <DetailRow
                                  label="Mã vạch:"
                                  data={productDetails[row.id]?.barCode}
                                />
                                <Divider />
                                <DetailRow
                                  label="Nhóm hàng:"
                                  data={productDetails[row.id]?.category}
                                />
                                <Divider />
                                <DetailRow
                                  label="Thương hiệu:"
                                  data={productDetails[row.id]?.brand}
                                />
                                <Divider />
                                <DetailRow
                                  label="Định mức tồn:"
                                  data={`${
                                    productDetails[row.id]?.minStock
                                  } ➤ ${productDetails[row.id]?.maxStock}`}
                                />
                                <Divider />
                                <DetailRow
                                  label="Giá bán:"
                                  data={productDetails[row.id]?.salePrice}
                                />
                                <Divider />
                                <DetailRow
                                  label="Giá vốn:"
                                  data={productDetails[row.id]?.costPrice}
                                />
                                <Divider />
                                <DetailRow
                                  label="Trọng lượng:"
                                  data={`${
                                    productDetails[row.id]?.weightValue
                                  } ${productDetails[row.id]?.weightUnit}`}
                                />
                              </div>
                              <div className="w-1/3">
                                <DetailRow
                                  label="Mô tả:"
                                  data={productDetails[row.id]?.description}
                                />
                                <Divider />
                                <DetailRow
                                  label="Ghi chú đặt hàng:"
                                  data={productDetails[row.id]?.orderNotes}
                                />
                                <Divider />
                                <DetailRow
                                  label="Nhà cung cấp:"
                                  data={productDetails[row.id]?.supplier}
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-2 ">
                              <Button type="primary" icon={<FaCheckSquare />}>
                                Cập nhật
                              </Button>
                              <Button type="primary" icon={<FaLock />} danger>
                                Ngừng kinh doanh
                              </Button>
                              <Button
                                type="primary"
                                icon={<FaRegTrashCan />}
                                danger
                              >
                                xóa
                              </Button>
                            </div>
                          </div>
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
      <Pagination size="small" total={50} showSizeChanger />
    </div>
  );
};

const DetailRow = ({ label, data }) => (
  <div className="flex items-center">
    <div className="w-1/3 text-sm">{label}</div>
    <div className="w-2/3 text-sm">{data || "N/A"}</div>
  </div>
);

export default ProductTable;
