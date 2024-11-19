import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Input, Empty, Button, Popconfirm, message } from "antd";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck, FaSave } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import SearchBar from "./SearchBar";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../hooks/useData";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdPayments } from "react-icons/md";
import { CustomSelect } from "../../utils/Css-in-js";
import { useStore } from "../../hooks/useStore";
import axios from "../../utils/axios";

const schema = Yup.object().shape({
  supplierId: Yup.string().required("Supplier ID is required"),
});

const PurchaseOrderNew = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { suppliers } = useData();
  const { user } = useAuth();
  const { storeId } = useStore();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      supplierId: null,
      note: null,
      status: "TEMPORARY",
      details: [],
      paidAmount: 0,
    },
  });

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
    updatedItems[index].quantity = quantity;
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

  const paidAmount = watch("paidAmount", 0); // Giá trị mặc định là 0
  const debtAmount = totalAmount - paidAmount;

  const onSubmit = async (data, status) => {
    try {
      const payload = {
        storeId,
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
      await axios.post("/goods-receipts/direct", payload);
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
      console.error(error);
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
    <div className="flex gap-4 h-[600px]">
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
                    <Input
                      type="number"
                      min="1"
                      variant="borderless"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    />
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
            {errors.supplierId && (
              <span style={{ color: "red" }}>
                {message.error("Vui lòng chọn nhà cung cấp")}
              </span>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm  w-2/3">Mã phiếu nhập</div>
              <div className="w-1/3">
                <Input
                  placeholder="Phiếu nhập tự động"
                  variant="borderless"
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
            <div className="flex gap-2 px-4 py-6 mt-12">
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
    </div>
  );
};

export default PurchaseOrderNew;
