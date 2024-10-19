import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Tabs, Empty } from "antd";
import { Column } from "@ant-design/plots";
import getChartConfig from "../chart/columnChart";

const data = [
  { letter: "A", frequency: 8167 },
  { letter: "B", frequency: 1492 },
  { letter: "C", frequency: 2782 },
  { letter: "D", frequency: 4253 },
  { letter: "E", frequency: 12702 },
  { letter: "F", frequency: 2288 },
  { letter: "G", frequency: 2015 },
  { letter: "H", frequency: 6094 },
  { letter: "I", frequency: 6966 },
  { letter: "J", frequency: 153 },
  { letter: "K", frequency: 772 },
  { letter: "L", frequency: 4025 },
  { letter: "M", frequency: 2406 },
  { letter: "N", frequency: 6749 },
  { letter: "O", frequency: 7507 },
  { letter: "P", frequency: 1929 },
  { letter: "Q", frequency: 95 },
  { letter: "R", frequency: 5987 },
  { letter: "S", frequency: 6327 },
  { letter: "T", frequency: 9056 },
  { letter: "U", frequency: 2758 },
  { letter: "V", frequency: 978 },
  { letter: "W", frequency: 236 },
  { letter: "X", frequency: 15 },
  { letter: "Y", frequency: 1974 },
  { letter: "Z", frequency: 74 },
];

const items = [
  {
    key: "1",
    label: "Theo ngày",
    children: <Column {...getChartConfig(data)} />,
  },
  {
    key: "2",
    label: "Theo giờ",
    children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  },
  {
    key: "3",
    label: "Theo thứ",
    children: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
  },
];

const options = [
  "Hôm nay",
  "Hôm qua",
  "7 ngày qua",
  "Tháng này",
  "Tháng trước",
];

const NetIncomeOverview = () => {
  const [selectedOption, setSelectedOption] = useState("7 ngày qua");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card shadow-md bg-white rounded-md">
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <h3 className="font-bold text-sm">
          DOANH THU THUẦN {selectedOption.toUpperCase()}
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
      <Tabs defaultActiveKey="1" items={items} className="p-4" />
    </div>
  );
};

export default NetIncomeOverview;
