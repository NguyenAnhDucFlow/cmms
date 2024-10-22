import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import {
  Modal,
  Tabs,
  Button,
  Tooltip,
  Input,
  InputNumber,
  ConfigProvider,
} from "antd";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../hook-form/RHFTextField";
import RHFSelect from "../hook-form/RHFSelect";
import RHFUpload from "../hook-form/RHFUpload";
import RHFInputNumber from "../hook-form/RHFInputNumber";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";
import ValuesInputField from "../ValuesInputField";
import { CiCircleInfo } from "react-icons/ci";

const schema = yup.object().shape({
  productName: yup.string().required("Tên sản phẩm là bắt buộc"),
});

const CreateProductModal = ({ visible, onClose }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      attributes: [],
    },
  });

  const { control, register, getValues, setValue, watch } = methods;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUnit, setIsOpenUnit] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleDropdownUnit = () => setIsOpenUnit(!isOpenUnit);

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });
  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({
    control,
    name: "units",
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const [variantCombinations, setVariantCombinations] = useState([]);
  const units = watch("units") ?? [];
  const hasAttributeValues = () => {
    const attributes = getValues("attributes") ?? [];
    return attributes.some((attr) => attr.values && attr.values.length > 0);
  };

  const generateCombinations = (attributes, basicUnit, units) => {
    const combinations = [];

    const generate = (current, index) => {
      if (index === attributes.length) {
        combinations.push({
          ...current,
          unitName: basicUnit,
          conversionValue: 1,
          salePrice: 0,
        });

        units.forEach((unit) => {
          combinations.push({
            ...current,
            unitName: unit.name,
            conversionValue: unit.conversionValue,
            salePrice: unit.salePrice,
          });
        });

        return;
      }

      const attribute = attributes[index];
      const values = Array.isArray(attribute.values) ? attribute.values : [];

      if (values.length === 0) {
        generate(current, index + 1);
        return;
      }

      values.forEach((value) => {
        generate(
          {
            ...current,
            [attribute.name]: value,
          },
          index + 1
        );
      });
    };

    generate({}, 0);
    return combinations;
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name &&
        (name.startsWith("attributes") ||
          name === "basicUnit" ||
          name === "units")
      ) {
        const attributes = getValues("attributes");
        const basicUnit = getValues("basicUnit");
        const units = getValues("units");
        const combinations = generateCombinations(attributes, basicUnit, units);
        console.log("combinations", combinations);
        setVariantCombinations(combinations);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues]);

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
          <div className="flex gap-4">
            <div className="space-y-4 w-[60%] ">
              <RHFTextField
                name="materialCode"
                label="Mã hàng"
                placeholder="Mã hàng tự động"
                tooltip="Mã hàng là thông tin duy nhất"
              />
              <RHFSelect
                name="category"
                label="Nhóm hàng"
                tooltip="Lựa chọn nhóm hàng cho sản phẩm"
                options={[
                  { value: "color", label: "Màu sắc" },
                  { value: "size", label: "Kích thước" },
                ]}
              />
              <RHFUpload name="imagesFlie" label="Ảnh sản phẩm" maxFiles={5} />
            </div>
            <div className="w-[40%]">
              <RHFInputNumber
                name="quantity"
                label="Số lượng"
                tooltip="Nhập số lượng sản phẩm"
                placeholder="Nhập số lượng"
              />
            </div>
          </div>
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
                      className="flex items-center justify-between mt-4 gap-x-28"
                    >
                      <div className="w-1/3">
                        <RHFSelect
                          name={`attributes.${attrIndex}.name`}
                          placeholder="Chọn thuộc tính..."
                          options={[
                            { value: "color", label: "Màu sắc" },
                            { value: "size", label: "Kích thước" },
                          ]}
                        />
                      </div>
                      <div className="flex items-center justify-between w-2/3 ">
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
                    </div>
                  ))}
                  <Button
                    className="mt-4"
                    icon={<PlusOutlined />}
                    onClick={() => appendAttribute({ name: "", values: [] })}
                  >
                    Thêm thuộc tính
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="card rounded-md shadow-md">
            <div className="  px-3 py-2 ">
              <div className="flex items-center justify-between ">
                <div className="text-sm font-semibold">Đơn vị tính</div>
                <button onClick={toggleDropdownUnit}>
                  <div className="flex items-center gap-2">
                    <DownOutlined
                      size={16}
                      className={`transform transition-transform ${
                        isOpenUnit ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
              {isOpenUnit && (
                <div className="p-4">
                  <label className="flex flex-col w-28">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-semibold">Đơn vị tính</div>
                      <Tooltip
                        title="Đơn vị của hàng hóa như hộp, lốc, thùng..."
                        placement="right"
                        color="blue"
                      >
                        <CiCircleInfo />
                      </Tooltip>
                    </div>
                    <div>
                      <Controller
                        name="basicUnit"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Input
                            {...field}
                            variant="borderless"
                            className="px-0"
                            style={{
                              border: "none",
                              borderBottom: "1px solid #d9d9d9",
                              borderRadius: "0",
                              transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderBottom =
                                "2px solid #1E88E5")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderBottom =
                                "1px solid #d9d9d9")
                            }
                            onMouseOver={(e) =>
                              (e.target.style.borderBottom =
                                "1px solid #1E88E5")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.borderBottom =
                                "1px solid #d9d9d9")
                            }
                          />
                        )}
                      />
                    </div>
                  </label>
                  {attributeFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center justify-between mt-4 gap-x-12"
                    >
                      <label className="flex flex-col w-48">
                        <div className="text-sm font-semibold">Tên đơn vị</div>
                        <Controller
                          name={`units.${index}.unitName`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <Input
                              {...field}
                              variant="borderless"
                              className="px-0"
                              style={{
                                border: "none",
                                borderBottom: "1px solid #d9d9d9",
                                borderRadius: "0",
                                transition: "border-color 0.3s ease",
                              }}
                              onFocus={(e) =>
                                (e.target.style.borderBottom =
                                  "2px solid #1E88E5")
                              }
                              onBlur={(e) =>
                                (e.target.style.borderBottom =
                                  "1px solid #d9d9d9")
                              }
                              onMouseOver={(e) =>
                                (e.target.style.borderBottom =
                                  "1px solid #1E88E5")
                              }
                              onMouseOut={(e) =>
                                (e.target.style.borderBottom =
                                  "1px solid #d9d9d9")
                              }
                            />
                          )}
                        />
                      </label>
                      <label className="flex flex-col w-48">
                        <div className="text-sm font-semibold">
                          Giá trị quy đổi
                        </div>
                        <Controller
                          name={`units.${index}.conversionValue`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <ConfigProvider direction="rtl">
                              <InputNumber
                                {...field}
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
                                  (e.target.style.borderBottom =
                                    "1px solid #1E88E5")
                                }
                                onBlur={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #d9d9d9")
                                }
                                onMouseOver={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #1E88E5")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #d9d9d9")
                                }
                              />
                            </ConfigProvider>
                          )}
                        />
                        {errors[name] && (
                          <span style={{ color: "red" }}>
                            {errors[name]?.message}
                          </span>
                        )}
                      </label>
                      <label className="flex flex-col w-48">
                        <div className="text-sm font-semibold">Giá bán</div>
                        <Controller
                          name={`units.${index}.priceSale`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <ConfigProvider direction="rtl">
                              <InputNumber
                                {...field}
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
                                  (e.target.style.borderBottom =
                                    "1px solid #1E88E5")
                                }
                                onBlur={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #d9d9d9")
                                }
                                onMouseOver={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #1E88E5")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.borderBottom =
                                    "1px solid #d9d9d9")
                                }
                              />
                            </ConfigProvider>
                          )}
                        />
                        {errors[name] && (
                          <span style={{ color: "red" }}>
                            {errors[name]?.message}
                          </span>
                        )}
                      </label>
                      <div className="flex items-center justify-between w-2/3 ">
                        <FaRegTrashCan
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => removeAttribute(attrIndex)}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    className="mt-4"
                    icon={<PlusOutlined />}
                    onClick={() => appendAttribute({ name: "", values: [] })}
                  >
                    Thêm đơn vị
                  </Button>
                  {hasAttributeValues() && (
                    <div className="p-6  ">
                      <div className="border rounded-lg">
                        <div className=" ">
                          <h3 className="bg-gray-100 px-4 py-2 flex text-lg font-semibold ">
                            Danh sách hàng hóa cùng loại
                          </h3>

                          <table className="min-w-full table-auto">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left">Tên</th>
                                {units.length > 0 && (
                                  <th className="py-2">Đơn vị</th>
                                )}
                                <th className="px-4 py-2 text-left">Mã hàng</th>
                                <th className="px-4 py-2 text-left">Mã vạch</th>
                                <th className="px-4 py-2 text-left">Giá vốn</th>
                                <th className="px-4 py-2 text-left">Giá bán</th>
                                <th className="px-4 py-2 text-left">Tồn kho</th>
                              </tr>
                            </thead>
                            <tbody>
                              {variantCombinations.map((combination, index) => (
                                <tr key={index}>
                                  <td className="py-2">
                                    {generateVariantName(combination)}
                                  </td>
                                  {units.length > 0 && (
                                    <td className="py-2">
                                      {units[0].unitName}
                                    </td>
                                  )}
                                  <td className="py-2">
                                    <input className="border-b border-gray-300 focus:border-green-500 outline-none w-full" />
                                  </td>
                                  <td className="py-2">
                                    <input className="border-b border-gray-300 focus:border-green-500 outline-none w-full" />
                                  </td>
                                  <td className="py-2">
                                    <input
                                      type="number"
                                      className="border-b border-gray-300 focus:border-green-500 outline-none w-full"
                                    />
                                  </td>
                                  <td className="py-2">
                                    <input
                                      type="number"
                                      className="border-b border-gray-300 focus:border-green-500 outline-none w-full"
                                    />
                                  </td>
                                  <td className="py-2">
                                    <input
                                      type="number"
                                      className="border-b border-gray-300 focus:border-green-500 outline-none"
                                    />
                                  </td>
                                  <td className="py-2">
                                    <button
                                      type="button"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => handleDeleteVariant(index)}
                                    >
                                      Xóa
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <div className="text-right text-sm text-gray-600 mt-2">
                            Danh sách bao gồm 1 hàng hóa cùng loại
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
      width={960}
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
      <DevTool control={control} />
    </Modal>
  );
};

export default CreateProductModal;

const generateVariantName = (variant) => {
  // Lọc các thuộc tính không phải là đơn vị, giá, giá trị quy đổi
  const attributeNames = Object.keys(variant).filter(
    (key) =>
      key !== "unitName" && key !== "conversionValue" && key !== "salePrice"
  );

  // Tạo chuỗi chỉ bao gồm các giá trị của thuộc tính
  const attributeValues = attributeNames.map((name) => variant[name]).join("-");

  return attributeValues;
};
