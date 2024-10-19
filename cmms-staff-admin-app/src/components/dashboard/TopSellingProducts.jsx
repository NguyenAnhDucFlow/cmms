import React, { useState } from "react";
import { Bar } from "@ant-design/plots";
import { IoIosArrowDown } from "react-icons/io";
import barChartConfig from "../chart/barChart";

const options = [
  "Hôm nay",
  "Hôm qua",
  "7 ngày qua",
  "Tháng này",
  "Tháng trước",
];

const data = [
  { type: "Xi măng Hoàng Thạch", value: 150 },
  { type: "Thép Hòa Phát", value: 130 },
  { type: "Gạch đỏ Đồng Nai", value: 120 },
  { type: "Cát xây dựng", value: 110 },
  { type: "Sơn Dulux", value: 100 },
  { type: "Ngói SCG", value: 90 },
  { type: "Ống nhựa Tiền Phong", value: 80 },
  { type: "Vật liệu chống thấm Sika", value: 70 },
  { type: "Kính cường lực Hải Long", value: 60 },
  { type: "Ván ép MDF", value: 500 },
];

const sortedData = data.sort((a, b) => b.value - a.value);

const TopSellingProducts = () => {
  const [selectedOption, setSelectedOption] = useState("7 ngày qua");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card shadow-md bg-white rounded-md">
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <h3 className="font-bold text-sm">
          TÓP 10 HÀNG HÓA BÁN CHẠY {selectedOption.toUpperCase()}
        </h3>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn glass btn-sm text-primary font-semibold rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              {selectedOption}
              {isOpen ? (
                <IoIosArrowDown size={16} className="rotate-180" />
              ) : (
                <IoIosArrowDown size={16} />
              )}
            </div>
          </div>
          {isOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 mt-1 rounded-md z-[1] w-36 p-2 shadow"
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                >
                  <div className="block w-full">{option}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Bar {...barChartConfig(sortedData)} />
    </div>
  );
};

export default TopSellingProducts;
