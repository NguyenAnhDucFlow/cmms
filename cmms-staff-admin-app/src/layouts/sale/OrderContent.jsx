import React from "react";
import { List, InputNumber, Button, Empty, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useStore from "../../store/posStore";
import TextArea from "antd/es/input/TextArea";
import { FaRegTrashCan } from "react-icons/fa6";
import { formatCurrency } from "../../utils/formatCurrency";
import { GoPencil } from "react-icons/go";

const OrderContent = () => {
  const { orders, activeOrderId, updateItemQuantity, removeItem } = useStore();
  const activeOrder = orders.find((order) => order.id === activeOrderId);

  if (!activeOrder?.items?.length) {
    return (
      <div className="h-[605px] flex items-center justify-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Chưa có sản phẩm nào"
        />
      </div>
    );
  }

  // tính tổng tiền hàng
  const totalAmount = activeOrder?.items?.reduce(
    (total, item) => total + item.salePrice * item.quantity,
    0
  );

  return (
    <div className="pt-3 ml-3 relative h-full">
      {activeOrder.items.map((item, index) => (
        <div
          key={item.id}
          className="bg-white w-full rounded-md shadow-md p-2 flex items-center mb-2 hover:border hover:border-primary"
        >
          <div className="p-2 w-[3%]">{index + 1}</div>
          <div className="p-2 w-[5%]">
            <Button
              type="text"
              icon={<FaRegTrashCan />}
              onClick={() => removeItem(item.materialCode)}
            />
          </div>
          <div className="p-2 w-[10%]">{item.materialCode}</div>
          <div className="p-2 flex-1">
            {item.name} ({item.unitName})
          </div>
          <div className="flex items-center gap-4 w-[25%]">
            <div className="border-b w-[50%] border-gray-200">
              <InputNumber
                variant="borderless"
                min={1}
                value={item.quantity}
                onChange={(value) =>
                  updateItemQuantity(item.materialCode, value)
                }
              />
            </div>
            <div className="p-[7px] w-[50%] text-primary border-b  border-gray-200">
              {item.salePrice}
            </div>
          </div>
          <div className="w-[10%] text-right font-bold mr-2">
            {formatCurrency(item.salePrice * item.quantity || 0)}
          </div>
        </div>
      ))}
      <div className="absolute right-0 bottom-9 w-full h-12">
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
          <div>
            <Input
              placeholder="Ghi chú đơn hàng"
              size="large"
              prefix={<GoPencil className="mr-2" />}
              variant="borderless"
            />
          </div>
          <div>
            <div>
              Tổng tiền hàng{" "}
              <span className="font-bold text-[18px]">
                {formatCurrency(totalAmount || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderContent;
