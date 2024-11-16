import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Input,
  DatePicker,
  Empty,
  Button,
  Popconfirm,
  Select,
  message,
} from "antd";
import { CiInboxOut } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../hooks/useData";
import { formatCurrency } from "../../utils/formatCurrency";
import { useStore } from "../../hooks/useStore";
import axios from "../../utils/axios";

const schema = Yup.object().shape({
  supplierId: Yup.string().required("Supplier ID is required"),
  storeId: Yup.string().required("Store ID is required"),
});

const CustomSelect = styled(Select)`
  && .ant-input-affix-wrapper {
    padding: 0 !important;
    border-radius: 0 !important;
  }
  .ant-select-selector {
    padding: 0 !important;
  }
`;

const OrderSupplierEdit = () => {
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
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      supplierId: null,
      storeId: null,
      note: "",
      estimatedDeliveryDate: null,
      status: "TEMPORARY",
      details: [],
    },
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/purchase-order/${id}`);
        const {
          supplierId,
          storeId,
          note,
          estimatedDeliveryDate,
          details,
          status,
        } = response.data.data;
        setSelectedItems(details);
        reset({
          supplierId,
          storeId,
          note,
          estimatedDeliveryDate: estimatedDeliveryDate
            ? dayjs(estimatedDeliveryDate) // Chuyển thành dayjs object
            : null,
          status,
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

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        details: selectedItems.map((item) => ({
          materialCode: item.materialCode,
          quantity: item.quantity,
          unitPrice: item.costPrice,
          materialName: item.name,
          unitName: item.unitName,
        })),
      };
      await axios.put(`/purchase-order/${id}`, payload);
      message.success("Đơn đặt hàng đã được cập nhật thành công!");
      navigate("/orders");
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi cập nhật đơn hàng.");
    }
  };

  const onValidate = async () => {
    if (selectedItems.length === 0) {
      message.error("Phiếu hàng đang trống.");
      return;
    }
    const isValid = await trigger(["supplierId", "storeId"]);
    if (!isValid) {
      if (errors.supplierId) {
        message.error("Bạn chưa chọn nhà cung cấp.");
        return;
      }
      if (errors.storeId)
        message.error("Bạn chưa chọn cửa hàng đặt hàng nhập.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 h-[600px]">
      <div className="w-[76%] space-y-4">
        <div className="flex items-center gap-8">
          <div>
            <div className="font-bold text-xl flex items-center gap-2">
              <IoArrowBackSharp
                onClick={() => navigate(-1)}
                className="cursor-pointer"
              />
              <div>Đặt hàng nhập</div>
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
                  <div className="p-2 flex-1">{item.materialName}</div>
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
                      value={item.unitPrice}
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
                  options={stores.map((supplier) => ({
                    value: supplier.id,
                    label: supplier.name,
                  }))}
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
              <div className="text-sm w-1/3 font-sans">
                <Controller
                  name="status"
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
                      options={[
                        { value: "TEMPORARY", label: "Phiếu tạm" },
                        { value: "CONFIRMED", label: "Đã xác nhận NCC" },
                      ]}
                      optionFilterProp="label"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      variant="borderless"
                      suffixIcon
                    />
                  )}
                />
              </div>
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
            <div className="flex items-center">
              <div className="text-sm w-2/3">Dự kiến ngày nhập hàng</div>
              <div className="w-1/3 border-b">
                <Controller
                  name="estimatedDeliveryDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      variant="borderless"
                      placeholder=""
                      style={{ paddingRight: 0 }}
                    />
                  )}
                />
              </div>
            </div>
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
            <div className="px-4 py-6 mt-4">
              <Button
                type="primary"
                className="border-md w-full h-20 flex flex-col"
                onClick={onValidate}
                htmlType="submit"
              >
                <CiInboxOut size={25} />
                <h1> Đặt hàng nhập</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderSupplierEdit;
