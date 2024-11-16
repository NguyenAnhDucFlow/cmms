import React, { useState } from "react";
import DropdownToggle from "./DropdownToggle";
import { Checkbox } from "antd";

const DropdownCheckbox = ({
  options, // [{ label: "Phiếu tạm", value: "TEMPORARY" }, ...]
  title = "Hàng hóa",
  defaultOptions = [],
  onOptionChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (value) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = prevSelected.includes(value)
        ? prevSelected.filter((option) => option !== value) // Bỏ chọn
        : [...prevSelected, value]; // Chọn thêm
      onOptionChange(newSelected); // Gọi callback với danh sách mới
      return newSelected;
    });
  };

  return (
    <div className="card rounded-md bg-white px-3 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <DropdownToggle isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </div>
      {isOpen && (
        <div className="px-3 py-2">
          <Checkbox.Group value={selectedOptions}>
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionChange(option.value)}
              >
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
