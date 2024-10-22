import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, Form, Space } from "antd";

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string, // thêm label cho checkbox đơn lẻ
};

export function RHFCheckbox({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Form.Item valuePropName="checked">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox {...field} {...other}>
            {label} {/* Hiển thị nhãn (label) nếu có */}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
}
// <RHFCheckbox name="isAccepted" label="Đồng ý với điều khoản" />

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string, // Label của nhóm checkbox (tùy chọn)
};

export function RHFMultiCheckbox({ name, options, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox.Group
            value={field.value}
            onChange={(checkedValues) => field.onChange(checkedValues)}
            {...other}
          >
            <Space direction="vertical">
              {options.map((option) => (
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        )}
      />
    </Form.Item>
  );
}

{
  /* <RHFMultiCheckbox
  name="selectedOptions"
  label="Chọn tùy chọn"
  options={['Tùy chọn 1', 'Tùy chọn 2', 'Tùy chọn 3']}
/> */
}
