import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { InputNumber, Tooltip, ConfigProvider } from "antd";
import { CiCircleInfo } from "react-icons/ci";
import styled from "styled-components";

// ----------------------------------------------------------------------

RHFInputNumberInLine.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
};

const CustomInput = styled(InputNumber)`
  .ant-input-number-input {
    border-radius: 0px !important;
  }
  .ant-input-number-input {
    padding: 4px 0px;
  }
`;

export default function RHFInputNumberInLine({
  name,
  label,
  tooltip,
  placeholder,
  defaultValue,
  ...other
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <label className="flex items-center w-full">
      {label && (
        <div className="flex items-center space-x-2">
          <div className="whitespace-nowrap font-medium">{label}</div>

          {tooltip && (
            <Tooltip title={tooltip} placement="right" color="blue">
              <CiCircleInfo />
            </Tooltip>
          )}
        </div>
      )}

      <div className="w-full">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ConfigProvider direction="rtl">
              <CustomInput
                {...field}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="px-0 border-b rounded-none hover:border-gray-100"
                variant="borderless"
                style={{
                  border: "none",
                  borderRadius: "0",
                  transition: "border-color 0.3s ease",
                  width: "100%",
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
            </ConfigProvider>
          )}
        />
        {errors[name] && (
          <span style={{ color: "red" }}>{errors[name]?.message}</span>
        )}
      </div>
    </label>
  );
}
