import { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Tooltip, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CiCircleInfo } from "react-icons/ci";
import styled from "styled-components";
import { Modal } from "antd";
import axios from "../../utils/axios";
// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
  apiUrl: PropTypes.string.isRequired,
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
  setOptions,
  apiUrl,
  ...other
}) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const optionSelect = options.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const handleOk = () => {
    axios
      .post(apiUrl, { name: inputValue })
      .then((response) => {
        message.success(`${label} đã được thêm mới thành công!`);
        setOptions([...options, response.data.data]);
        const newOption = {
          value: response.data.data.id,
          label: response.data.data.name,
        };
        setValue(name, newOption.value);
      })
      .catch((error) => {
        message.error(`Thêm mới ${label.toLowerCase()} thất bại!`);
      })
      .finally(() => {
        setInputValue("");
        setIsModalOpen(false);
      });
  };

  const handleCancel = () => {
    setInputValue("");
    setIsModalOpen(false);
  };

  return (
    <>
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
                    options={optionSelect}
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
                    placeholder={placeholder}
                  />
                  <button
                    className="btn btn-circle btn-ghost btn-xs"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <PlusOutlined />
                  </button>
                </div>
              )}
            />
            <Modal
              title={`Thêm mới ${label}`}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <label className="flex items-center whitespace-nowrap gap-6">
                Tên {label.toLowerCase()}
                <Input
                  variant="borderless"
                  className="px-0"
                  style={{
                    border: "none",
                    borderBottom: "1px solid #d9d9d9",
                    borderRadius: "0",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderBottom = "1px solid #1E88E5")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottom = "1px solid #d9d9d9")
                  }
                  onMouseOver={(e) =>
                    (e.target.style.borderBottom = "1px solid #1E88E5")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.borderBottom = "1px solid #d9d9d9")
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </label>
            </Modal>
            {errors[name] && (
              <span style={{ color: "red" }}>{errors[name].message}</span>
            )}
          </Form.Item>
        </div>
      </label>
    </>
  );
}
