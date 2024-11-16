import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import RHFSelectLabelCol from "../hook-form/RHFSelectLabelCol";

import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";

import axios from "../../utils/axios";
import { useStore } from "../../hooks/useStore";
import { useData } from "../../hooks/useData";

const { TextArea } = Input;

const schema = yup.object().shape({
  name: yup.string().required("Tên sản phẩm là bắt buộc"),
  categoryId: yup.string().required("Nhóm hàng là bắt buộc"),
  brandId: yup.string().required("Thương hiệu là bắt buộc"),
  minStock: yup
    .number()
    .typeError("Giá trị phải là một số")
    .required("Định mức tồn ít nhất là bắt buộc"),
  maxStock: yup
    .number()
    .typeError("Giá trị phải là một số")
    .required("Định mức tồn nhiều nhất là bắt buộc")
    .test(
      "maxStock-greater-than-minStock",
      "Định mức tồn nhiều nhất phải lớn hơn hoặc bằng định mức tồn ít nhất",
      function (value) {
        const { minStock } = this.parent;
        return value >= minStock;
      }
    ),
});

const UpdateProductModal = ({ visible, onClose, productId }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(
      () => ({
        materialCode: "",
        barcode: "",
        name: "",
        categoryId: "",
        brandId: "",
        costPrice: 0,
        salePrice: 0,
        weightValue: 0,
        weightUnit: "g",
        minStock: 0,
        maxStock: 0,
        description: "",
        isPoint: false,
        materialUnitDtoList: [],
        imagesFile: [],
      }),
      []
    ),
  });

  const { categories, brands, units, setCategories, setBrands, setUnits } =
    useData();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { storeId } = useStore();
  const [isOpenUnit, setIsOpenUnit] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    fields: unitFields,
    append: appendUnit,
    remove: removeUnit,
  } = useFieldArray({
    control,
    name: "materialUnitDtoList",
  });

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

  const loadProductDetails = useCallback(async () => {
    if (productId) {
      try {
        const response = await axios.get(
          `/materials/${productId}/stores/${storeId}`
        );
        const productData = response.data.data;
        setCoverImageUrl(productData.coverImageUrl);

        const transformedData = {
          ...productData,
          categoryId:
            categories.find((c) => c.name === productData.category)?.id || "",
          brandId: brands.find((b) => b.name === productData.brand)?.id || "",
          imagesFile: productData.images.map((url, index) => ({
            uid: `-${index}`,
            name: `image-${index}.png`,
            status: "done",
            url,
          })),
        };

        reset(transformedData);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    }
  }, [productId, storeId, categories, brands, reset]);

  useEffect(() => {
    if (visible) loadProductDetails();
  }, [visible, loadProductDetails]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (Array.isArray(data.imagesFile)) {
        data.imagesFile.forEach((file) => {
          if (file.originFileObj) {
            formData.append("imagesFile", file.originFileObj);
          } else {
            formData.append("images", file.url);
          }
        });
      }
      [
        "barcode",
        "name",
        "categoryId",
        "brandId",
        "costPrice",
        "salePrice",
        "weightValue",
        "weightUnit",
        "minStock",
        "maxStock",
        "description",
        "isPoint",
      ].forEach((field) => {
        formData.append(field, data[field]);
      });
      formData.append("materialId", productId);
      formData.append("storeId", storeId);
      formData.append(
        "coverImageUrl",
        coverImageUrl ||
          "https://tse2.mm.bing.net/th?id=OIP.b8bpZyFwupiioDofQPXo_gAAAA&pid=Api&P=0&h=220"
      );

      await axios.put(`/materials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Cập nhật hàng hóa thành công");
      onClose();
      reset();
    } catch (err) {
      console.error("Error updating product details:", err);
      messageApi.error("Cập nhật hàng hóa thất bại");
    } finally {
      setIsLoading(false);
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
                disabled
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
                disabled
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
                      showAddButton={false}
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
                    <Button className="mt-4" icon={<PlusOutlined />} disabled>
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
      confirmLoading={isLoading}
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
