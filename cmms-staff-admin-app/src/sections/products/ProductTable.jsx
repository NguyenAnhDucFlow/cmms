import React, { useState } from "react";
import {
  Image,
  Divider,
  Button,
  Pagination,
  Modal,
  message,
  Empty,
} from "antd";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { FaCheckSquare, FaLock } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "../../utils/axios";
import { useStore } from "../../hooks/useStore";
import UpdateProductModal from "../../components/modal/UpdateProductModal";

const ProductTable = ({ products, handleProductCreated }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const { storeId } = useStore();

  const hideModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const showModal = (productId) => {
    setModalVisible(true);
    setSelectedProduct(productId);
  };

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

  const handleConfirmAction = async () => {
    if (confirmAction && selectedProduct) {
      try {
        await axios.patch(
          `/materials/${selectedProduct}/status?status=${confirmAction}`
        );
        setConfirmModalVisible(false);
        message.success("Cập nhât trạng thái hàng hóa thành công");
        handleProductCreated();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const showConfirmModal = (productId, action) => {
    setSelectedProduct(productId);
    setConfirmAction(action);
    setConfirmModalVisible(true);
  };

  const tabs = [
    { label: "Thông tin", content: "Content of tab 1" },
    { label: "Tab 2", content: "Content of tab 2" },
    { label: "Tab 3", content: "Content of tab 3" },
  ];

  return (
    <>
      {isModalVisible && (
        <UpdateProductModal
          visible={isModalVisible}
          onClose={hideModal}
          productId={selectedProduct}
        />
      )}
      {isConfirmModalVisible && (
        <Modal
          title="Xác nhận"
          open={isConfirmModalVisible}
          onOk={handleConfirmAction}
          onCancel={() => setConfirmModalVisible(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>
            Bạn có chắc chắn muốn
            {confirmAction === "active" ? " cho phép" : " ngừng"} kinh doanh sản
            phẩm này không?
          </p>
        </Modal>
      )}
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
                    <td className="p-2">
                      <div className="ml-6">
                        <Image
                          width={40}
                          height={40}
                          src={
                            row?.coverImageUrl ||
                            "https://cdn-app.kiotviet.vn/retailler/Content/img/default-product-img.jpg"
                          }
                        />
                      </div>
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
                                    <div className="flex items-center gap-1">
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
                                  <div className="flex gap-3 ">
                                    <Image
                                      width={296}
                                      src={
                                        productDetails[row.id]?.coverImageUrl
                                      }
                                    />
                                    <div>
                                      {productDetails[row.id]?.images.map(
                                        (image, index) => (
                                          <div key={index}>
                                            <Image
                                              width={60}
                                              height={60}
                                              src={image}
                                            />
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-1/3 space-y-4">
                                    <DetailRow
                                      label="Mã hàng:"
                                      data={
                                        productDetails[row.id]?.materialCode
                                      }
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
                                  <div className="w-1/3 flex flex-col justify-between">
                                    <div>
                                      <div className="text-sm">Mô tả:</div>
                                      <Divider className="my-4" />
                                      <div className="text-sm">
                                        {productDetails[row.id]?.description ||
                                          "N/A"}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm">
                                        Ghi chú đặt hàng:
                                      </div>
                                      <Divider className="my-4" />
                                      <div className="text-sm">
                                        {productDetails[row.id]?.orderNotes ||
                                          ""}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm">
                                        Nhà cung cấp:
                                      </div>
                                      <Divider className="my-4" />
                                      <div className="text-sm">
                                        {productDetails[row.id]?.supplier || ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-end gap-2 ">
                                  <Button
                                    type="primary"
                                    icon={<FaCheckSquare />}
                                    onClick={() =>
                                      showModal(productDetails[row.id]?.id)
                                    }
                                  >
                                    Cập nhật
                                  </Button>
                                  {productDetails[row.id]?.isActive ? (
                                    <Button
                                      type="primary"
                                      icon={<FaLock />}
                                      danger
                                      onClick={() =>
                                        showConfirmModal(
                                          productDetails[row.id]?.id,
                                          "false"
                                        )
                                      }
                                    >
                                      Ngừng kinh doanh
                                    </Button>
                                  ) : (
                                    <Button
                                      type="primary"
                                      icon={<IoMdCheckmark />}
                                      onClick={() =>
                                        showConfirmModal(
                                          productDetails[row.id]?.id,
                                          "true"
                                        )
                                      }
                                    >
                                      Cho phép kinh doanh
                                    </Button>
                                  )}
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
              ))
            ) : (
              <tr>
                <td colSpan="6">
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

const DetailRow = ({ label, data }) => (
  <div className="flex items-center">
    <div className="w-1/3 text-sm">{label}</div>
    <div className="w-2/3 text-sm">{data || "N/A"}</div>
  </div>
);

export default ProductTable;
