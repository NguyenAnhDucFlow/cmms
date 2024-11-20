import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Input, DatePicker, Empty, Button, Popconfirm, message } from "antd";
import { CiInboxOut } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCheck, FaRegTrashCan } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../hooks/useData";
import { formatCurrency } from "../../utils/formatCurrency";
import { useStore } from "../../hooks/useStore";
import axios from "../../utils/axios";
import { CustomSelect } from "../../utils/Css-in-js";
import { MdPayments } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const schema = Yup.object().shape({
  supplierId: Yup.string().required("Supplier ID is required"),
  storeId: Yup.string().required("Store ID is required"),
});

const PurchaseOrderByOrderSupplierGet = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { suppliers } = useData();
  const { stores } = useStore();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/purchase-order/${id}`);
        const {
          supplierName,
          storeName,
          purchaseOrderCode,
          note,
          estimatedDeliveryDate,
          details,
          status,
        } = response.data.data;
        const supplier = suppliers.find((s) => s.name === supplierName);
        const store = stores.find((s) => s.name === storeName);
        setSelectedItems(
          details.map((item) => ({
            ...item,
            orderedQuantity: item.quantity, // Gán số lượng từ đơn đặt hàng
            quantity: item.quantity, // Giá trị mặc định cho số lượng thực tế là số lượng đặt hàng
          }))
        );
        reset({
          supplierId: supplier?.id || "",
          storeId: store?.id || "",
          note,
          estimatedDeliveryDate: estimatedDeliveryDate
            ? dayjs(estimatedDeliveryDate) // Chuyển thành dayjs object
            : null,
          status,
          purchaseOrderCode,
        });
      } catch (error) {
        message.error("Không thể tải dữ liệu đơn hàng.");
      }
    };

    if (id) {
      fetchOrderDetails();
    }
  }, [id, reset]);

  const handleSelectItem = (item) => {
    const existingItemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.materialCode === item.materialCode
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = quantity || 1;
    setSelectedItems(updatedItems);
  };

  const handleCostPriceChange = (index, costPrice) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].costPrice = costPrice;
    setSelectedItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const calculateTotal = (item) => {
    const { quantity, costPrice } = item;
    return quantity * costPrice;
  };

  const totalAmount = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => sum + item.quantity * item.costPrice,
        0
      ),
    [selectedItems]
  );

  const totalQuantity = useMemo(
    () => selectedItems.reduce((total, item) => total + item.quantity, 0),
    [selectedItems]
  );

  const paidAmount = watch("paidAmount", 0);
  const debtAmount = totalAmount - paidAmount;

  const onSubmit = async (data, status) => {
    try {
      const payload = {
        purchaseOrderId: id,
        ...data,
        status,
        details: selectedItems.map((item) => ({
          materialCode: item.materialCode,
          quantity: item.quantity,
          costPrice: item.costPrice,
          name: item.name,
          unitName: item.unitName,
        })),
      };
      await axios.post(`/goods-receipts/purchase-order`, payload);
      navigate(-1);
      message.success(
        `Phiếu Nhập hàng ${
          status === "TEMPORARY" ? "lưu tạm" : "hoàn thành"
        } thành công!`
      );
    } catch (error) {
      message.error(
        `Đã có lỗi xảy ra khi ${
          status === "TEMPORARY" ? "lưu tạm" : "hoàn thành"
        } phiếu nhập hàng.`
      );
    }
  };

  const onSubmitWithValidation = async (data, status) => {
    if (selectedItems.length === 0) {
      message.error("Danh sách sản phẩm đang trống. Vui lòng thêm sản phẩm.");
      return;
    }
    onSubmit(data, status);
  };

  return (
    <form className="flex gap-4 h-[600px]">
      <div className="w-[76%] space-y-4">
        <div className="flex items-center gap-8">
          <div>
            <div className="font-bold text-xl flex items-center gap-2">
              <IoArrowBackSharp
                onClick={() => navigate(-1)}
                className="cursor-pointer"
              />
              <div>Nhập hàng</div>
            </div>
          </div>
          <SearchBar onItemSelect={handleSelectItem} />
        </div>
        <div className="bg-white border border-gray-300 h-[88%] flex flex-col">
          <div className="flex bg-[#BBDEFB] font-semibold text-sm border-b border-gray-300">
            <div className="p-2 w-[3%]"></div>
            <div className="p-2 w-[5%]">STT</div>
            <div className="p-2 w-[15%]">Mã hàng</div>
            <div className="p-2 flex-1">Tên hàng</div>
            <div className="p-2 w-[10%]">Đơn vị tính</div>
            <div className="p-2 w-[10%]">Số lượng</div>
            <div className="p-2 w-[10%]">Đơn giá</div>
            <div className="p-2 w-[10%]">Thành tiền</div>
          </div>
          <div className="flex-1 overflow-auto">
            {selectedItems.length > 0 ? (
              selectedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-300 text-sm"
                >
                  <div className="p-2 w-[3%]">
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa?"
                      onConfirm={() => handleDeleteItem(index)}
                      okText="Có"
                      cancelText="Không"
                    >
                      <Button
                        type="danger"
                        icon={<FaRegTrashCan />}
                        size="small"
                      />
                    </Popconfirm>
                  </div>
                  <div className="p-2 w-[5%]">{index + 1}</div>
                  <div className="p-2 w-[15%]">{item.materialCode}</div>
                  <div className="p-2 flex-1">{item.name}</div>
                  <div className="p-2 w-[10%]">{item.unitName}</div>
                  <div className="p-2 w-[10%]">
                    <div className="flex items-center relative">
                      <Input
                        type="number"
                        min="1"
                        max={item.orderedQuantity}
                        variant="borderless"
                        value={item.quantity || ""} // Hiển thị chuỗi rỗng nếu chưa xác định
                        onBlur={(e) => {
                          if (e.target.value === "") {
                            handleQuantityChange(index, 1); // Đặt giá trị mặc định là 1
                          }
                        }}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            handleQuantityChange(index, value);
                          }
                        }}
                      />
                      <span className="absolute bottom-0 right-0">
                        /{item.orderedQuantity}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 w-[10%]">
                    <Input
                      type="number"
                      min="0"
                      value={item.costPrice}
                      variant="borderless"
                      onChange={(e) =>
                        handleCostPriceChange(index, parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="p-2 w-[10%]">
                    {formatCurrency(calculateTotal(item))}
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
      </div>
      <div className="w-[24%]">
        <div className="bg-white border h-full -mt-4">
          <div className="px-4 py-6 space-y-5">
            <div className="flex items-center text-sm gap-2">
              <div>
                <CgProfile />
              </div>
              <div>{user?.username || "no name"}</div>
            </div>

            <Controller
              name="supplierId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  className="w-full border-b"
                  style={{
                    borderColor: isFocused ? "#1E88E5" : undefined,
                    padding: 0,
                  }}
                  disabled
                  showSearch
                  options={suppliers.map((supplier) => ({
                    value: supplier.id,
                    label: supplier.name,
                  }))}
                  optionFilterProp="label"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  variant="borderless"
                  placeholder="Tìm nhà cung cấp"
                />
              )}
            />
            <Controller
              name="storeId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  className="w-full border-b"
                  style={{
                    borderColor: isFocused ? "#1E88E5" : undefined,
                    padding: 0,
                  }}
                  showSearch
                  options={stores.map((store) => ({
                    value: store.id,
                    label: store.name,
                  }))}
                  disabled
                  optionFilterProp="label"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  variant="borderless"
                  placeholder="Tìm cửa hàng đặt hàng"
                />
              )}
            />

            <div className="flex items-center justify-between">
              <div className="text-sm  w-2/3">Mã đặt hàng nhập</div>
              <div className="w-1/3">
                <Controller
                  name="purchaseOrderCode"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Phiếu nhập tự động"
                      variant="borderless"
                      {...field}
                      disabled
                      className="px-0"
                      style={{
                        border: "none",
                        borderBottom: "1px solid #d9d9d9",
                        borderRadius: "0",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderBottom = "1px solid #1E88E5")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderBottom = "1px solid #d9d9d9")
                      }
                      onMouseOver={(e) =>
                        (e.target.style.borderBottom = "1px solid #1E88E5")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.borderBottom = "1px solid #d9d9d9")
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm w-2/3">Trạng thái</div>
              <div className="text-sm w-1/3 font-sans">Phiếu tạm</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm w-2/3">
                Tổng tiền hàng
                <span className="border px-2 py-1 ml-2">{totalQuantity}</span>
              </div>
              <div className="w-1/3 text-right text-sm">
                {formatCurrency(totalAmount)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-bold w-2/3">
                Cần trả nhà cung cấp
              </div>
              <div className="w-1/3 text-right text-sm text-primary">
                {formatCurrency(totalAmount)}
              </div>
            </div>
            {selectedItems.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm w-2/3">Tiền trả nhà cung cấp</div>
                  <div className="w-1/3 text-right text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <MdPayments size={20} />
                      </div>
                      <div className="ml-1">
                        <Controller
                          name="paidAmount"
                          control={control}
                          defaultValue={0}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="ml-2"
                              style={{ direction: "rtl" }}
                              variant="borderless"
                              type="number"
                              min="0"
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  field.onChange(0);
                                  return;
                                }

                                const numericValue = parseFloat(value);
                                if (!isNaN(numericValue)) {
                                  if (numericValue <= totalAmount) {
                                    field.onChange(numericValue);
                                  } else {
                                    field.onChange(totalAmount);
                                  }
                                }
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm w-2/3">Tính vào công nợ</div>
                  <div className="text-sm ">{formatCurrency(debtAmount)}</div>
                </div>
              </>
            )}
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ghi chú"
                  variant="borderless"
                  className="px-0"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #d9d9d9",
                    borderRadius: "0",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderBottom = "1px solid #1E88E5")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottom = "1px solid #d9d9d9")
                  }
                  onMouseOver={(e) =>
                    (e.target.style.borderBottom = "1px solid #1E88E5")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.borderBottom = "1px solid #d9d9d9")
                  }
                />
              )}
            />
          </div>
          <div>
            <div className="flex gap-2 px-4 mt-4 ">
              <Button
                type="primary"
                className="border-md w-1/2 h-20 flex flex-col bg-green-500"
                onClick={handleSubmit((data) =>
                  onSubmitWithValidation(data, "TEMPORARY")
                )}
              >
                <FaSave />
                <h1>Lưu tạm</h1>
              </Button>

              <Button
                type="primary"
                className="border-md w-1/2 h-20 flex flex-col"
                onClick={handleSubmit((data) =>
                  onSubmitWithValidation(data, "COMPLETED")
                )}
              >
                <FaCheck />
                <h1>Hoàn thành</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PurchaseOrderByOrderSupplierGet;
