import { useEffect, useState } from "react";

const ValuesInputField = ({
  register,
  attrIndex,
  getValues,
  setValue,
  errors,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
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

      // Kiểm tra trùng lặp trước khi thêm
      if (currentValues.includes(newValue)) {
        setErrormessage("This value is exists");
      } else {
        const newValues = [...currentValues, newValue];
        setTags(newValues);
        setValue(`attributes.${attrIndex}.values`, newValues);
        setErrormessage("");
      }
      setInputValue(""); // Reset input sau khi thêm giá trị
    }
  };

  // Hàm xóa tag (value)
  const removeTag = (index) => {
    const currentValues = getValues(`attributes.${attrIndex}.values`);
    const newValues = currentValues.filter((_, i) => i !== index);
    setTags(newValues);
    setValue(`attributes.${attrIndex}.values`, newValues); // Cập nhật lại giá trị vào React Hook Form sau khi xóa
  };

  useEffect(() => {
    if (attributeName && errorMessage) setErrormessage("");
  }, [attributeName, errorMessage]);

  return (
    <div>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            &times;
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter value and press Enter"
        className="border-b border-gray-300 focus:border-green-500 outline-none w-full"
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* Input ẩn để lưu giá trị của tags trong React Hook Form */}
      <input type="hidden" {...register(`attributes.${attrIndex}.values`)} />
    </div>
  );
};

export default ValuesInputField;
