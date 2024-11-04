import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Tooltip } from "antd";
import { CiCircleInfo } from "react-icons/ci";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired, // Tên field bắt buộc
  label: PropTypes.string, // Label tùy chọn cho trường
  tooltip: PropTypes.string, // Nội dung của Tooltip (nếu có)
  placeholder: PropTypes.string, // Placeholder cho input
  type: PropTypes.oneOf(["text", "password"]), // Định dạng input, mặc định là "text"
};

export default function RHFTextField({
  name,
  label,
  tooltip,
  placeholder,
  type = "text",
  ...other
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Sử dụng context của React Hook Form
  const [inputType, setInputType] = useState(type);

  // Toggle visibility for password type
  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <label className="flex items-center">
      {/* Nếu có label, hiển thị nó */}
      {label && (
        <div className="w-1/3 flex items-center space-x-2">
          <div>{label}</div>

          {/* Hiển thị Tooltip nếu có */}
          {tooltip && (
            <Tooltip title={tooltip} placement="right" color="blue">
              <CiCircleInfo />
            </Tooltip>
          )}
        </div>
      )}

      <div className={label ? "w-2/3" : "w-full"}>
        {/* Điều chỉnh kích thước dựa trên việc có label hay không */}
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="flex items-center">
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
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
                {...other}
              />
              {type === "password" && (
                <span
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  {inputType === "password" ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              )}
            </div>
          )}
        />
        {errors[name] && (
          <span style={{ color: "red" }}>{errors[name].message}</span>
        )}
      </div>
    </label>
  );
}
