import React, { useEffect, useState } from "react";
import { Modal, Tabs, Button } from "antd";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../hook-form/RHFTextField";
import RHFSelect from "../hook-form/RHFSelect";
import RHFUpload from "../hook-form/RHFUpload";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";
import ValuesInputField from "../ValuesInputField";

// Schema validation với Yup
const schema = yup.object().shape({
  productName: yup.string().required("Tên sản phẩm là bắt buộc"),
});

const CreateProductModal = ({ visible, onClose }) => {
  // Sử dụng useForm để khởi tạo form
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { control, register, getValues, setValue } = methods;

  const [isOpen, setIsOpen] = useState(true);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data) => {
    console.log("Dữ liệu form:", data);
    onClose();
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const tabItems = [
    {
      key: "1",
      label: "Thông tin",
      children: (
        <div>
          <RHFTextField name="productName" />
          <RHFSelect name="productGroup" />
          <RHFUpload name="productImages" label="Ảnh sản phẩm" maxFiles={5} />
          <div className="card rounded-md shadow-md">
            <div className="  px-3 py-2 ">
              <div className="flex items-center justify-between ">
                <div className="text-sm font-semibold">Thuộc tính</div>
                <button onClick={toggleDropdown}>
                  <div className="flex items-center gap-2">
                    <DownOutlined
                      size={16}
                      className={`transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
              {isOpen && (
                <div className="p-4">
                  {attributeFields.map((field, attrIndex) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between space-x-4 mb-2"
                    >
                      <RHFSelect
                        name="productGroup"
                        placeholder="Chọn thuộc tính..."
                        options={[{ value: "group1", label: "Nhóm 1" }]}
                      />
                      <ValuesInputField
                        register={register}
                        getValues={getValues}
                        setValue={setValue}
                        attrIndex={attrIndex}
                        errors={errors}
                      />
                      <FaRegTrashCan
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => removeAttribute(attrIndex)}
                      />
                    </div>
                  ))}
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => appendAttribute({ name: "", values: [] })}
                  >
                    Thêm thuộc tính
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Mô tả chi tiết",
      children: (
        <div>
          <RHFTextField
            name="productDescription"
            label="Mô tả sản phẩm"
            placeholder="Nhập mô tả sản phẩm"
            tooltip="Cung cấp mô tả chi tiết"
          />
        </div>
      ),
    },
  ];

  return (
    <Modal
      title="Tạo sản phẩm mới"
      open={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okText="Tạo"
      cancelText="Hủy"
    >
      <FormProvider {...methods}>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </FormProvider>
    </Modal>
  );
};

export default CreateProductModal;
