import { useEffect, useState } from "react";
import { Tag } from "antd";

const ValuesInputField = ({
  register,
  attrIndex,
  getValues,
  setValue,
  errors,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  const attributeName = getValues(`attributes.${attrIndex}.name`);

  const handleKeyDown = (e) => {
    if (!attributeName) {
      setErrormessage("Bạn cần chọn tên thuộc tính trước khi thêm giá trị.");
      return;
    }

    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const currentValues = getValues(`attributes.${attrIndex}.values`) || [];
      const newValue = inputValue.trim();

      if (currentValues.includes(newValue)) {
        setErrormessage("Giá trị này đã tồn tại.");
      } else {
        const newValues = [...currentValues, newValue];
        setValue(`attributes.${attrIndex}.values`, newValues);
        setErrormessage("");
      }
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const currentValues = getValues(`attributes.${attrIndex}.values`);
    const newValues = currentValues.filter((_, i) => i !== index);
    setValue(`attributes.${attrIndex}.values`, newValues);
  };

  useEffect(() => {
    if (attributeName && errorMessage) setErrormessage("");
  }, [attributeName, errorMessage]);

  const currentValues = getValues(`attributes.${attrIndex}.values`) || [];

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {currentValues.map((tag, index) => (
          <Tag
            key={index}
            closable
            color="blue"
            onClose={() => removeTag(index)}
          >
            {tag}
          </Tag>
        ))}
        <input
          type="text"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập giá trị và enter"
          className="border-b border-gray-300 focus:border-blue-500 outline-none w-full"
        />
      </div>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input type="hidden" {...register(`attributes.${attrIndex}.values`)} />
    </div>
  );
};

export default ValuesInputField;
