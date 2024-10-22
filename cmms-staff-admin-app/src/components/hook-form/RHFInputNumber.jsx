import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { InputNumber, Tooltip, ConfigProvider } from "antd";
import { CiCircleInfo } from "react-icons/ci";

// ----------------------------------------------------------------------

RHFInputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string,
};

export default function RHFInputNumber({
  name,
  label,
  tooltip,
  placeholder,
  ...other
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ConfigProvider direction="rtl">
              <InputNumber
                {...field}
                placeholder={placeholder}
                className="px-0 border-b rounded-none"
                variant="borderless"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
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
