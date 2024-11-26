import React, { useState } from "react";
import { Divider, Button, Modal, message, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import UpdateProductModal from "../../components/modal/UpdateProductModal";
import { formatDate, formatDateVN } from "../../utils/formatDate";
import { getOrderStatus } from "../../utils/getStatusLabel";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { IoArrowRedo } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";

const PurchaseOrderTable = ({ products, handleProductCreated }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const hideModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleRowClick = (index) => {
    setExpandedRow((prevRow) => (prevRow === index ? null : index));
    setActiveTab(0); // Reset về tab đầu tiên khi mở một hàng mới
  };

  const tabs = [{ label: "Thông tin", key: "info" }];

  return (
    <>
      {isModalVisible && (
        <UpdateProductModal
          visible={isModalVisible}
          onClose={hideModal}
          productId={selectedProduct}
        />
      )}
      <div className="space-y-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-[#BBDEFB]">
              <th className="px-4 py-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%]">
                Mã Nhập hàng
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%]">
                Thời gian
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300 text-sm font-semibold w-[30%]">
                Nhà cung cấp
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%]">
                Cần trả NCC
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300 text-sm font-semibold w-[10%]">
                Tiền đã trả NCC
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((row, index) => (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => handleRowClick(index, row.id)}
                    className={`cursor-pointer hover:bg-[#BBDEFB] ${
                      expandedRow === index
                        ? "border-x-2 border-t-2 border-blue-600 bg-[#BBDEFB]"
                        : "border-b border-gray-300"
                    } `}
                  >
                    <td className="p-4">{row.goodsReceiptCode}</td>
                    <td className="p-4">{formatDateVN(row.createdAt)}</td>
                    <td className="p-4">{row.supplierName}</td>
                    <td className="p-4">
                      {formatDate(row.estimatedDeliveryDate)}
                    </td>
                    <td className="p-4">{row.totalAmount}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td
                        colSpan="5"
                        className="border-x-2 border-blue-600 border-b-2 p-0"
                      >
                        <div>
                          {/* Tabs Header */}
                          <div className="flex bg-[#BBDEFB]">
                            {tabs.map((tab, tabIndex) => (
                              <button
                                key={tabIndex}
                                onClick={() => setActiveTab(tabIndex)}
                                className={`px-4 ml-6 py-2 font-medium border-x border-t ${
                                  activeTab === tabIndex
                                    ? "border-gray-300 text-blue-500 bg-white"
                                    : "border-transparent text-gray-500"
                                } hover:text-blue-500`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Tabs Content */}
                          <div className=" bg-white">
                            {activeTab === 0 && (
                              <>
                                <div className="flex gap-2 p-6">
                                  <div className="w-1/3 space-y-4">
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3 ">
                                        Mã đặt hàng nhập:
                                      </div>
                                      <div className="text-sm w-2/3 font-bold">
                                        {row.goodsReceiptCode}
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3">
                                        Thời gian:
                                      </div>
                                      <div className="text-sm w-2/3">
                                        {formatDate(row.createdAt)}
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3">
                                        Nhà cung cấp:
                                      </div>
                                      <div className="text-sm w-2/3">
                                        {row.supplierName}
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3">
                                        Người tạo:
                                      </div>
                                      <div className="text-sm w-2/3">
                                        {row.createdBy}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-1/3 space-y-4">
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3 ">
                                        Trạng thái:
                                      </div>
                                      <div className="text-sm w-2/3 ">
                                        {getOrderStatus(row.status)}
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="text-sm font-sans w-1/3">
                                        Cửa hàng:
                                      </div>
                                      <div className="text-sm w-2/3">
                                        {row.storeName}
                                      </div>
                                    </div>
                                  </div>
                                  <Divider
                                    type="vertical"
                                    style={{
                                      alignSelf: "stretch",
                                      height: "auto",
                                    }}
                                  />
                                  <div className="w-1/3 flex items-center">
                                    <div className="space-y-1 w-full">
                                      <div className="text-sm font-sans">
                                        Ghi chú:
                                      </div>
                                      <TextArea
                                        variant="borderless"
                                        rows={6}
                                        placeholder={row.note}
                                        maxLength={6}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-white border border-gray-300 h-[88%] flex flex-col">
                                  <div className="flex bg-[#E6F1FE] font-semibold text-sm border-b border-gray-300">
                                    <div className="p-2 w-[10%] ml-4">
                                      Mã hàng
                                    </div>
                                    <div className="p-2 w-[40%]">Tên hàng</div>
                                    <div className="p-2 w-[10%]">Số lượng</div>
                                    <div className="p-2 w-[10%]">Đơn giá</div>
                                    <div className="p-2 w-[10%]">Giảm giá</div>
                                    <div className="p-2 w-[10%]">Giá nhập</div>
                                    <div className="p-2 w-[10%]">
                                      Thành tiền
                                    </div>
                                  </div>
                                  <div className="flex-1 overflow-auto">
                                    {row.details.length > 0 ? (
                                      row.details.map((item, index) => (
                                        <div
                                          key={item.id}
                                          className="flex items-center border-b border-gray-300 text-sm"
                                        >
                                          <div className="p-2 w-[10%] ml-4">
                                            {item.materialCode}
                                          </div>
                                          <div className="p-2 w-[40%]">
                                            {`${item.name} (${item.unitName})`}
                                          </div>
                                          <div className="p-2 w-[10%]">
                                            {item.quantity}
                                          </div>
                                          <div className="p-2 w-[10%]">
                                            {item.costPrice}
                                          </div>
                                          <div className="p-2 w-[10%]"></div>
                                          <div className="p-2 w-[10%]">
                                            {item.costPrice}
                                          </div>
                                          <div className="p-2 w-[10%] font-bold">
                                            {item.totalPrice}
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="flex justify-center items-center h-full">
                                        <Empty description="No data available" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="p-6 mr-8 space-y-3">
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Tổng số lượng:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      {row.totalQuantity}
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Tổng số mặt hàng:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      {row.totalItems}
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Tổng tiền hàng:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      {row.totalAmount}
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Giảm giá:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      0
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Tổng cộng:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      {row.totalAmount}
                                    </div>
                                  </div>
                                  <div className="flex justify-end items-center">
                                    <div className="text-sm font-sans w-32 text-right">
                                      Tiền đã trả NCC:
                                    </div>
                                    <div className="font-bold text-sm w-20 text-right">
                                      {row.paidAmount}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-3 p-6">
                                  {row.status == "CONFIRMED" && (
                                    <Button
                                      type="primary"
                                      icon={<PlusOutlined />}
                                    >
                                      Tạo phiếu nhâp
                                    </Button>
                                  )}
                                  <Button
                                    type="primary"
                                    icon={<IoArrowRedo />}
                                    onClick={() =>
                                      navigate(`/order-supplier/${row.id}/edit`)
                                    }
                                  >
                                    Mở phiếu
                                  </Button>
                                  <Button
                                    type="primary"
                                    icon={<MdOutlineClear />}
                                    className="bg-red-500"
                                  >
                                    Hủy bỏ
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
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
    </>
  );
};

export default PurchaseOrderTable;
