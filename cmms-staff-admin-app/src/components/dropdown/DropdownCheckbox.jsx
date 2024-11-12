import React, { useState } from "react";
import DropdownToggle from "./DropdownToggle";
import { Checkbox } from "antd";

const DropdownCheckbox = ({
  options,
  title = "Hàng hóa",
  defaultOptions = [],
  onOptionChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (value) => {
    // Toggle giá trị checkbox
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(value)) {
        // Nếu giá trị đã được chọn thì bỏ ra khỏi mảng
        return prevSelected.filter((option) => option !== value);
      } else {
        // Nếu giá trị chưa được chọn thì thêm vào mảng
        return [...prevSelected, value];
      }
    });
    // Gọi callback với danh sách các giá trị đã chọn
    onOptionChange(selectedOptions);
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
                key={option}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              >
                {option}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
