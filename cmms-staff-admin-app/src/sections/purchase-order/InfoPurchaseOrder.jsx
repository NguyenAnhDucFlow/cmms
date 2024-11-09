import React, { useState } from "react";
import styled from "styled-components";
import { Select, Input, Button } from "antd";
import { FaCheck, FaSave } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";

const CustomSelect = styled(Select)`
  && .ant-input-affix-wrapper {
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    border-radius: 0px !important;
    transition: all 0.2s;
  }
`;

const InfoPurchaseOrder = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useAuth();
  return (
    <div className="bg-white border h-full -mt-4">
      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center text-sm gap-2">
          <div>
            <CgProfile />
          </div>
          <div>{user?.username || "no name"}</div>
        </div>
        <div className="flex items-center">
          <CustomSelect
            className="w-full border-b"
            style={{
              borderColor: isFocused ? "#1E88E5" : undefined,
              padding: 0,
            }}
            showSearch
            optionFilterProp="label"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            variant="borderless"
            placeholder="Tìm nhà cung cấp"
          />
        </div>
        <div className="text-sm">Trạng thái</div>
        <div className="text-sm">Tổng tiền hàng</div>
        <div className="text-sm font-bold">Cần trả nhà cung cấp</div>
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
          onFocus={(e) => (e.target.style.borderBottom = "1px solid #1E88E5")}
          onBlur={(e) => (e.target.style.borderBottom = "1px solid #d9d9d9")}
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
          <Button type="primary" className="border-md w-1/2 h-20 flex flex-col">
            <FaCheck />
            <h1> Hoàn thành</h1>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoPurchaseOrder;
