import React, { useState } from "react";
import SearchBar from "../sections/purchase-order/SearchBar";
import InfoPurchaseOrder from "../sections/purchase-order/InfoPurchaseOrder";
import { Input, Empty, Button, Popconfirm } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";

const PurchaseOrder = () => {
  const [selectedItems, setSelectedItems] = useState([]);

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

  const handleDeleteItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const calculateTotal = (item) => {
    const { quantity, costPrice } = item;
    return quantity * costPrice;
  };

  return (
    <div className="flex gap-4 h-[600px]">
      <div className="w-[76%] space-y-4">
        <SearchBar onItemSelect={handleSelectItem} />
        <div className="bg-white border border-gray-300 h-[88%] flex flex-col">
          <div className="flex bg-[#BBDEFB] font-semibold text-sm border-b border-gray-300">
            <div className="p-2 w-[8%]"></div>
            <div className="p-2 w-[5%]">STT</div>
            <div className="p-2 w-[10%]">Mã hàng</div>
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
                  <div className="p-2 w-[8%]">
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
                  <div className="p-2 w-[10%]">{item.materialCode}</div>
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
                  <div className="p-2 w-[10%]">{item.costPrice}</div>
                  <div className="p-2 w-[10%]">
                    {calculateTotal(item).toFixed(2)}
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
        <InfoPurchaseOrder />
      </div>
    </div>
  );
};

export default PurchaseOrder;
