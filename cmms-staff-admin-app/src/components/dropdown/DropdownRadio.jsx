import React, { useState } from "react";
import DropdownToggle from "./DropdownToggle";

const DropdownRadio = ({
  options = ["sao ne"],
  title = "Hàng hóa",
  defaultOption = "Tất cả",
  onOptionChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    onOptionChange(value);
    setIsOpen(false);
  };

  return (
    <div className="card rounded-md bg-white px-3 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <DropdownToggle isOpen={isOpen} toggleDropdown={toggleDropdown} />
      </div>
      {isOpen && (
        <ul className="menu mt-3 p-0">
          <li>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="dropdown-radio"
                value="Tất cả"
                checked={selectedOption === "Tất cả"}
                onChange={() => handleOptionChange("Tất cả")}
              />
              <div className="text-text">Tất cả</div>
            </label>
          </li>
          {options.map((option) => (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="dropdown-radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                <div className="text-text">{option}</div>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownRadio;
