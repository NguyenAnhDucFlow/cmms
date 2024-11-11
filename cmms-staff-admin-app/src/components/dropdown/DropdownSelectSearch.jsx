import React, { useState } from "react";
import { Select } from "antd";
import DropdownToggle from "./DropdownToggle";

const DropdownSelectSearch = ({
  title = "Dropdown",
  options,
  placeholder = "",
  onOptionSelect = () => {},
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedOption, setSelectedOption] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const optionSelect = options.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const handleChange = (value) => {
    setSelectedOption(value);
    onOptionSelect(value);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="card rounded-md bg-white px-3 py-2 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{title}</div>
          <DropdownToggle isOpen={isOpen} toggleDropdown={toggleDropdown} />
        </div>
        {isOpen && (
          <Select
            className="w-full border-b"
            style={{
              borderColor: isFocused ? "#1E88E5" : undefined,
              padding: 0,
            }}
            showSearch
            variant="borderless"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleChange}
            suffixIcon={null}
            options={optionSelect}
            optionLabelProp="label"
          />
        )}
      </div>
    </div>
  );
};

export default DropdownSelectSearch;
