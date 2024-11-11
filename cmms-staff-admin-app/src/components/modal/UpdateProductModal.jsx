import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { Modal, Tabs, Button, Input, Select, Checkbox, message } from "antd";
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
import RHFInputNumberInLine from "../hook-form/RHFInputNumberInLine";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";
import RHFSelectLabelCol from "../hook-form/RHFSelectLabelCol";
import axios from "../../utils/axios";
import { useStore } from "../../hooks/useStore";

const { TextArea } = Input;

const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm là bắt buộc"),
  categoryId: yup.string().required("Nhóm hàng là bắt buộc"),
  brandId: yup.string().required("Thương hiệu là bắt buộc"),
});

const UpdateProductModal = ({ visible, onClose, productId }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      categoryId: "",
      brandId: "",
      basicUnit: "",
      weightUnit: "g",
      costPrice: 0,
      salePrice: 0,
      minStock: 0,
      maxStock: 0,
      materialUnitDtoList: [],
    },
  });
  const { control, watch, reset } = methods;

  const [isOpenUnit, setIsOpenUnit] = useState(true);
  const basicUnit = watch("basicUnit");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const { storeId } = useStore();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cập nhật hàng hóa thành công",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Cập nhật hàng hóa thất bại",
    });
  };

  const toggleDropdownUnit = () => setIsOpenUnit(!isOpenUnit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, unitsRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/brands"),
          axios.get("/units"),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
        setUnits(unitsRes.data.data);

        if (productId) {
          const productRes = await axios.get(
            `/materials/${productId}/stores/${storeId}`
          );
          const productData = productRes.data.data;

          const matchingBrand = brandsRes.data.data.find(
            (brand) => brand.name === productData.brand
          );
          const brandId = matchingBrand ? matchingBrand.id : "";

          const matchingCategory = categoriesRes.data.data.find(
            (category) => category.name === productData.category
          );

          const categoryId = matchingCategory ? matchingCategory.id : "";

          const imagesFile = productData.images.map((url, index) => ({
            uid: `-${index}`,
            name: `image-${index}.png`,
            status: "done",
            url: url,
          }));

          reset({
            ...productData,
            categoryId,
            brandId,
            imagesFile,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (visible) {
      fetchData();
    }
  }, [visible, productId, reset]);

  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({
    control,
    name: "materialUnitDtoList",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleAddUnit = () => {
    if (!basicUnit) {
      // message.error("Chưa nhập đơn vị cơ bản");
    } else {
      appendUnit({ unitId: "", conversionRate: 0, price: 0 });
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (Array.isArray(data.imagesFile)) {
        for (const file of data.imagesFile) {
          if (file.originFileObj) {
            formData.append("imagesFile", file.originFileObj);
          }
        }
      }
      formData.append("barcode", data.barcode || "");
      formData.append("name", data.name || "");
      formData.append("categoryId", data.categoryId);
      formData.append("brandId", data.brandId);
      formData.append("costPrice", data.costPrice || 0);
      formData.append("salePrice", data.salePrice || 0);
      formData.append("weightValue", data.weightValue || 0);
      formData.append("weightUnit", data.weightUnit);
      formData.append("minStock", data.minStock || 0);
      formData.append("maxStock", data.maxStock || 0);
      formData.append("description", data.description || "");
      formData.append("isPoint", data.isPoint || false);
      formData.append("materialId", productId);
      formData.append("storeId", storeId);

      await axios.put(`/materials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      success();
      onClose();
      reset();
    } catch (e) {
      error();
    }
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
                label="Mã Hàng"
                tooltip="Mã hàng tự động tăng"
              />
              <RHFTextField
                name="barcode"
                label="Mã vạch"
                tooltip="Mã vạch hàng hóa thường được tạo ra bởi nhà sản xuất"
              />
              <RHFTextField
                name="name"
                label="Tên hàng"
                tooltip="Tên hàng là tên của sản phẩm"
              />
              <RHFSelect
                name="categoryId"
                label="Nhóm hàng"
                tooltip="Lựa chọn nhóm hàng cho sản phẩm"
                placeholder="--Lựa chon--"
                apiUrl="/categories"
                options={categories}
                setOptions={setCategories}
              />
              <RHFSelect
                apiUrl="/brands"
                name="brandId"
                label="Thương hiệu"
                tooltip="Thương hiệu, nhãn hiệu của sản phẩm"
                placeholder="--Chọn thương hiệu"
                setOptions={setBrands}
                options={brands}
              />
              <RHFUpload name="imagesFile" label="Ảnh sản phẩm" maxFiles={5} />
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
                  <RHFInputNumber name="weightValue" />
                  <Controller
                    name="weightUnit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue="g"
                        style={{
                          width: 60,
                        }}
                        options={[
                          {
                            value: "g",
                            label: "g",
                          },
                          {
                            value: "kg",
                            label: "kg",
                          },
                        ]}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Controller
                  name="isPoint"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    >
                      Tích điểm
                    </Checkbox>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-8">
            <div className="border rounded-md overflow-hidden">
              <div>
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
                    <RHFSelectLabelCol
                      name="basicUnit"
                      label="Đơn vị cơ bản"
                      tooltip="Đơn vị của hàng hóa như hộp, lốc, thùng..."
                      apiUrl="/units"
                      disabled
                      options={units}
                      setOptions={setUnits}
                    />
                    {unitFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between mt-4 gap-x-12"
                      >
                        <RHFSelectLabelCol
                          name={`materialUnitDtoList.${index}.unitId`}
                          label="Đơn vị cơ bản"
                          options={units}
                          showAddButton={false}
                          disabled
                        />
                        <label className="flex flex-col w-48">
                          <div className="text-sm font-semibold">
                            Giá trị quy đổi
                          </div>
                          <RHFInputNumber
                            name={`materialUnitDtoList.${index}.conversionRate`}
                          />
                        </label>
                        <label className="flex flex-col w-48">
                          <div className="text-sm font-semibold">Giá bán</div>
                          <RHFInputNumber
                            name={`materialUnitDtoList.${index}.price`}
                          />
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
        </div>
      ),
    },
    {
      key: "2",
      label: "Mô tả chi tiết",
      children: (
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <div className="px-3 py-2 flex items-center justify-between bg-gray-200 ">
              <div className="text-sm font-semibold ">Định mức tồn</div>
            </div>
            <div className="flex items-center justify-between px-3 py-5 gap-8">
              <RHFInputNumberInLine
                name="minStock"
                label="Ít nhất"
                tooltip="Hệ thống sẽ dựa vào thông tin này để cảnh báo hàng dưới định mức tồn kho < Tồn ít nhất"
              />
              <RHFInputNumberInLine
                name="maxStock"
                label="Nhiều nhất"
                tooltip="Hệ thống sẽ dựa vào thông tin này để cảnh báo hàng dưới định mức tồn kho < Tồn ít nhất"
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="px-3 py-2 flex items-center justify-between bg-gray-200 ">
              <div className="text-sm font-semibold ">Mô tả</div>
            </div>
            <div className="flex items-center justify-between  gap-8">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    variant="borderless"
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      width={960}
      title="Cập nhật sản phẩm"
      open={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okText="Cập nhật"
      cancelText="Hủy"
    >
      <FormProvider {...methods}>
        {contextHolder}
        <Tabs defaultActiveKey="1" items={tabItems} />
        <DevTool control={control} />
      </FormProvider>
    </Modal>
  );
};

export default UpdateProductModal;
