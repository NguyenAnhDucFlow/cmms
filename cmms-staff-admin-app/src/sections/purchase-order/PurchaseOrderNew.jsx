import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { Input, Empty, Button, Popconfirm, Select } from "antd";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import styled from "styled-components";
import { FaCheck, FaSave } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";
import { useData } from "../../hooks/useData";
import { formatCurrency } from "../../utils/formatCurrency";
import { MdPayments } from "react-icons/md";

const CustomSelect = styled(Select)`
  && .ant-input-affix-wrapper {
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    padding: 0px 0px !important;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    border-radius: 0px !important;
    transition: all 0.2s;
  }
  .ant-select-selector {
    padding: 0 0px !important;
  }
`;

const PurchaseOrderNew = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { suppliers } = useData();
  const { user } = useAuth();
  const [amountPaid, setAmountPaid] = useState(0);

  const navigate = useNavigate();

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

  const debtAmount = totalAmount - amountPaid;

  return (
    <div className="flex gap-4 h-[600px]">
      <div className="w-[76%] space-y-4">
        <div className="flex items-center gap-8">
          <div>
            <div className="font-bold text-xl flex items-center gap-2">
              <IoArrowBackSharp onClick={() => navigate(-1)} />
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
            <CustomSelect
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
                        <Input
                          className="ml-2"
                          style={{ direction: "rtl" }}
                          value={amountPaid}
                          variant="borderless"
                          type="number"
                          min="0"
                          onChange={(e) =>
                            setAmountPaid(parseFloat(e.target.value))
                          }
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
            <Input
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
          </div>
          <div>
            <div className="flex gap-2 px-4 py-6 mt-12">
              <Button
                type="primary"
                className="border-md w-1/2 h-20 flex flex-col bg-green-500"
              >
                <FaSave />
                <h1> Lưu tạm</h1>
              </Button>
              <Button
                type="primary"
                className="border-md w-1/2 h-20 flex flex-col"
              >
                <FaCheck />
                <h1> Hoàn thành</h1>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderNew;
