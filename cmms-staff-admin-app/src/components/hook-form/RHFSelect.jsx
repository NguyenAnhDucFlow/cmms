import { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Tooltip, Form } from "antd";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { CiCircleInfo } from "react-icons/ci";
import styled from "styled-components";

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

const CustomSelect = styled(Select)`
  .ant-select-selector {
    padding: 0px !important;
  }
`;

export default function RHFSelect({
  name,
  label,
  tooltip,
  options,
  placeholder,
  ...other
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label className="flex items-center">
      {label && (
        <div className="w-1/3 flex items-center space-x-2">
          <div>{label}</div>
          {tooltip && (
            <Tooltip title={tooltip} placement="right" color="blue">
              <CiCircleInfo />
            </Tooltip>
          )}
        </div>
      )}

      <div className={label ? "w-2/3" : "w-full"}>
        <Form.Item name={name} className="mb-0">
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className="flex items-center">
                <CustomSelect
                  {...field}
                  {...other}
                  options={options}
                  className="w-full border-b"
                  style={{
                    borderColor: isFocused ? "#1E88E5" : undefined,
                    padding: 0,
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  variant="borderless"
                  placeholder={placeholder}
                />
                <button className="btn btn-circle btn-ghost btn-xs">
                  <PlusOutlined />
                </button>
              </div>
            )}
          />
          {errors[name] && (
            <span style={{ color: "red" }}>{errors[name].message}</span>
          )}
        </Form.Item>
      </div>
    </label>
  );
}
