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
  Select,
  Checkbox,
} from "antd";
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { toast } from "react-toastify";
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
import styled from "styled-components";

const CustomSelect = styled(Select)`
  .ant-select-selector {
    padding: 0px !important;
  }
`;

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

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUnit, setIsOpenUnit] = useState(false);
  const [variantCombinations, setVariantCombinations] = useState([]);
  const basicUnit = watch("basicUnit");
  const units = watch("units") ?? [];
  const [isCombinations, setCombinations] = useState(false);
  const [items, setItems] = useState(["jack", "lucy"]);

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

  const handleAddUnit = () => {
    if (!basicUnit) {
      toast.error("Chưa nhập đơn vị cơ bản");
    } else {
      appendUnit({
        unitName: "",
        conversionRate: "",
        salePrice: "",
      });
    }
  };

  const generateCombinations = (attributes, basicUnit, units) => {
    const combinations = [];

    const generate = (currentVariant, index) => {
      // Nếu đã hết thuộc tính hoặc không có thuộc tính nào
      if (index === attributes.length || attributes.length === 0) {
        // Chỉ tạo biến thể nếu có thuộc tính hoặc có đơn vị quy đổi
        if (attributes.length > 0 || units?.length > 0) {
          // Luôn tạo biến thể với basicUnit (đơn vị cơ bản)
          combinations.push({
            ...currentVariant,
            unitName: basicUnit,
          });

          // Nếu có đơn vị quy đổi, tạo thêm biến thể với các đơn vị khác (units)
          if (units?.length > 0) {
            units.forEach((unit) => {
              combinations.push({
                ...currentVariant,
                unitName: unit.unitName,
                conversionValue: unit.conversionValue,
                salePrice: unit.salePrice,
              });
            });
          }
        }
        return;
      }

      const attribute = attributes[index];
      const values = Array.isArray(attribute.values) ? attribute.values : [];

      // Nếu không có giá trị cho thuộc tính hiện tại, bỏ qua nó.
      if (values.length === 0) {
        generate(currentVariant, index + 1);
        return;
      }

      // Đệ quy cho từng giá trị thuộc tính
      values.forEach((value) => {
        generate(
          {
            ...currentVariant,
            [attribute.name]: value,
          },
          index + 1
        );
      });
    };

    generate({}, 0);

    return combinations;
  };

  const handleDeleteVariant = (index) => {
    setVariantCombinations((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        name &&
        (name.startsWith("attributes") ||
          name === "basicUnit" ||
          name.startsWith("units"))
      ) {
        const attributes = getValues("attributes");
        const basicUnit = getValues("basicUnit");
        const units = getValues("units");
        const combinations = generateCombinations(attributes, basicUnit, units);
        if (combinations.length > 0) {
          setCombinations(true);
        } else setCombinations(false);
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
          <div className="flex ">
            <div className="space-y-4 w-[60%] ">
              <RHFTextField
                name="materialCode"
                label="Mã hàng"
                placeholder="Mã hàng tự động"
                tooltip="Mã hàng là thông tin duy nhất"
              />
              <RHFTextField
                name="barCode"
                label="Mã vạch"
                tooltip="Mã vạch hàng hóa thường được tạo ra bởi nhà sản xuất"
              />
              <RHFTextField
                name="nameMaterial"
                label="Tên hàng"
                tooltip="Tên hàng là tên của sản phẩm"
              />
              <RHFSelect
                name="category"
                label="Nhóm hàng"
                tooltip="Lựa chọn nhóm hàng cho sản phẩm"
                placeholder="--Lựa chon--"
                options={[
                  { value: "color", label: "Màu sắc" },
                  { value: "size", label: "Kích thước" },
                ]}
              />
              <RHFSelect
                name="brand"
                label="Thương hiệu"
                tooltip="Thương hiệu, nhãn hiệu của sản phẩm"
                placeholder="--Chọn thương hiệu"
                options={[
                  { value: "color", label: "Màu sắc" },
                  { value: "size", label: "Kích thước" },
                ]}
              />
              <RHFUpload name="imagesFlie" label="Ảnh sản phẩm" maxFiles={5} />
            </div>
            <div className="w-[40%] space-y-4 ml-12">
              <RHFInputNumber
                name="costPrice"
                label="Giá vốn"
                tooltip="Giá vốn dùng để tính lợi nhuận cho sản phẩm(sẽ tự động thay đổi khi thay đổi phương pháp tính giá vốn"
              />
              <RHFInputNumber name="salePrice" label="Giá bán" />
              <div className="flex items-center">
                <div className="w-1/3">Trọng lượng</div>
                <div className="flex items-center w-2/3 gap-4">
                  <RHFInputNumber name="weight" />
                  <Select
                    defaultValue="lucy"
                    style={{
                      width: 60,
                    }}
                    options={[
                      {
                        value: "jack",
                        label: "g",
                      },
                      {
                        value: "lucy",
                        label: "kg",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox>Lô, hạn sử dụng</Checkbox>
                <Checkbox>Tích điểm</Checkbox>
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="border rounded-md overflow-hidden">
              <div>
                <div>
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
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
                </div>
                {isOpen && (
                  <div className="p-4">
                    {attributeFields.map((field, attrIndex) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between mt-4 gap-x-28"
                      >
                        <div className="w-1/3">
                          <Controller
                            name={`attributes.${attrIndex}.name`}
                            control={control}
                            render={({ field }) => {
                              const selectedValues = getValues("attributes")
                                .filter((_, index) => index !== attrIndex)
                                .map((attr) => attr.name);

                              const availableOptions = items
                                .filter(
                                  (item) => !selectedValues.includes(item)
                                )
                                .map((item) => ({
                                  label: item,
                                  value: item,
                                }));
                              return (
                                <div className="flex items-center">
                                  <CustomSelect
                                    {...field}
                                    options={[...availableOptions]}
                                    className="w-full border-b"
                                    value={field.value || undefined}
                                    style={{
                                      borderColor: isFocused
                                        ? "#1E88E5"
                                        : undefined,
                                      padding: 0,
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    variant="borderless"
                                    placeholder="Chọn thuộc tính..."
                                  />
                                  <button className="btn btn-circle btn-ghost btn-xs">
                                    <PlusOutlined />
                                  </button>
                                </div>
                              );
                            }}
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

            <div className="border rounded-md overflow-hidden">
              <div className="">
                <div className="   px-3 py-2 flex items-center justify-between bg-gray-200 ">
                  <div className="text-sm font-semibold ">Đơn vị tính</div>
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
                    {unitFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between mt-4 gap-x-12"
                      >
                        <label className="flex flex-col w-48">
                          <div className="text-sm font-semibold">
                            Tên đơn vị
                          </div>
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
                            name={`units.${index}.salePrice`}
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
                            onClick={() => removeUnit(index)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      className="mt-4"
                      icon={<PlusOutlined />}
                      onClick={handleAddUnit}
                    >
                      Thêm đơn vị
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isCombinations && (
            <div className="mt-4">
              <div className="border rounded-lg">
                <div className=" ">
                  <div className="text-sm bg-gray-100 px-4 py-2 flex font-semibold">
                    Tên đơn vị
                  </div>
                  <table className="min-w-full table-auto ">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">
                          Tên
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Đơn vị
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Giá bán
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantCombinations.map((combination, index) => (
                        <tr key={index}>
                          <td className="py-2">
                            <div className="ml-4">
                              {generateVariantName(combination)}
                            </div>
                          </td>
                          <td className="py-2">
                            <div className="ml-4">{combination.unitName}</div>
                          </td>
                          <td className="py-2">
                            <div className="ml-4">{combination.salePrice}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-right text-sm text-gray-600 px-4 py-2">
                    Danh sách bao gồm {variantCombinations.length} hàng hóa cùng
                    loại
                  </div>
                </div>
              </div>
            </div>
          )}
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
