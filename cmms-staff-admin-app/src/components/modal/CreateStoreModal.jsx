import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { Modal, message, Select } from "antd";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../hook-form/RHFTextField";
import useRegionData from "../../hooks/useRegionData";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "../../utils/axios";

const CustomSelect = styled(Select)`
  .ant-select-selector {
    padding: 0px !important;
  }
  .ant-select-selection-search {
    inset-inline-start: 0px !important;
  }
`;

const StyledPhoneInputWrapper = styled.div`
  .flag-dropdown {
    border: none !important;
    border-bottom: 1px solid #ccc !important;
    border-radius: 0 !important;
    padding-bottom: 2px;
    margin-right: 8px;
  }
`;

const schema = yup.object().shape({
  name: yup.string().required("Tên cửa hàng là bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  address: yup.string().required("Địa chỉ là bắt buộc"),
  province: yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  district: yup.string().required("Quận/Huyện là bắt buộc"),
  ward: yup.string().required("Phường/Xã là bắt buộc"),
});

const CreateStoreModal = ({ visible, onClose }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      provinceCode: "",
      districtCode: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, watch } = methods;
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useRegionData();

  const selectedProvinceCode = watch("provinceCode");
  const selectedDistrictCode = watch("districtCode");

  useEffect(() => {
    if (selectedProvinceCode) {
      fetchDistricts(selectedProvinceCode);
      setValue("district", "");
      setValue("ward", "");
    }
  }, [selectedProvinceCode]);

  useEffect(() => {
    if (selectedDistrictCode) {
      fetchWards(selectedDistrictCode);
      setValue("ward", "");
    }
  }, [selectedDistrictCode]);

  const onSubmit = async (data) => {
    const submissionData = {
      ...data,
      province: data.province,
      district: data.district,
      ward: data.ward,
    };
    delete submissionData.provinceCode;
    delete submissionData.districtCode;

    try {
      const response = await axios.post("/stores", submissionData);
      if (response.data.code === 1000) {
        message.success("Tạo cửa hàng thành công");
        reset();
        onClose();
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      message.error("Tạo cửa hàng thất bại");
      console.error("API error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      width={660}
      title="Cửa hàng"
      open={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okText="Tạo"
      cancelText="Hủy"
    >
      <FormProvider {...methods}>
        <div className="space-y-4 mt-8">
          <RHFTextField name="name" label="Tên cửa hàng" />
          <label className="flex items-center">
            <div className="w-1/3">Điện thoại</div>
            <div className="w-2/3">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <StyledPhoneInputWrapper>
                      <PhoneInput
                        {...field}
                        country={"vn"} // Default country
                        onChange={(value) => field.onChange(value)}
                        inputStyle={{
                          width: "100%",
                          border: "none",
                          borderBottom: "1px solid #ccc",
                          borderRadius: 0,
                          outline: "none",
                        }}
                        dropdownStyle={{ zIndex: 10000 }}
                        placeholder="Chọn mã quốc gia và nhập số điện thoại"
                      />
                    </StyledPhoneInputWrapper>
                    {error && (
                      <span style={{ color: "red" }}>{error.message}</span>
                    )}
                  </>
                )}
              />
            </div>
          </label>

          <RHFTextField
            name="email"
            label="Email"
            tooltip="Email để quản lí cửa hàng"
          />
          <RHFTextField
            name="address"
            label="Địa chỉ"
            tooltip="Địa chỉ cần điền chính xác. VD số x, ngách y, ngõ z tên đường ...."
          />

          <label className="flex items-center">
            <div className="w-1/3">Chọn Tỉnh/Thành phố</div>
            <div className="w-2/3">
              <Controller
                name="province"
                control={control}
                render={({ field }) => {
                  const [isFocused, setIsFocused] = useState(false);
                  return (
                    <CustomSelect
                      {...field}
                      className="w-full border-b"
                      style={{
                        borderColor: isFocused ? "#1E88E5" : undefined,
                        padding: 0,
                      }}
                      showSearch
                      optionFilterProp="label"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      variant="borderless"
                      options={provinces.map((prov) => ({
                        value: prov.code,
                        label: prov.name,
                      }))}
                      onChange={(value) => {
                        const selectedProvince = provinces.find(
                          (prov) => prov.code === value
                        );
                        field.onChange(selectedProvince?.name);
                        setValue("provinceCode", value);
                      }}
                    />
                  );
                }}
              />
            </div>
          </label>

          <label className="flex items-center">
            <div className="w-1/3">Chọn Quận/Huyện</div>
            <div className="w-2/3">
              <Controller
                name="district"
                control={control}
                render={({ field }) => {
                  const [isFocused, setIsFocused] = useState(false);
                  return (
                    <CustomSelect
                      {...field}
                      className="w-full border-b"
                      style={{
                        borderColor: isFocused ? "#1E88E5" : undefined,
                        padding: 0,
                      }}
                      showSearch
                      optionFilterProp="label"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      variant="borderless"
                      options={districts.map((dist) => ({
                        value: dist.code,
                        label: dist.name,
                      }))}
                      disabled={!selectedProvinceCode}
                      onChange={(value) => {
                        const selectedDistrict = districts.find(
                          (dist) => dist.code === value
                        );
                        field.onChange(selectedDistrict?.name);
                        setValue("districtCode", value);
                      }}
                    />
                  );
                }}
              />
            </div>
          </label>

          <label className="flex items-center">
            <div className="w-1/3">Chọn Phường/Xã</div>
            <div className="w-2/3">
              <Controller
                name="ward"
                control={control}
                render={({ field }) => {
                  const [isFocused, setIsFocused] = useState(false);
                  return (
                    <CustomSelect
                      {...field}
                      className="w-full border-b"
                      style={{
                        borderColor: isFocused ? "#1E88E5" : undefined,
                        padding: 0,
                      }}
                      showSearch
                      optionFilterProp="label"
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      variant="borderless"
                      options={wards.map((ward) => ({
                        value: ward.code,
                        label: ward.name,
                      }))}
                      disabled={!selectedDistrictCode}
                      onChange={(value) => {
                        const selectedWard = wards.find(
                          (ward) => ward.code === value
                        );
                        field.onChange(selectedWard?.name);
                      }}
                    />
                  );
                }}
              />
            </div>
          </label>
        </div>
        <DevTool control={control} />
      </FormProvider>
    </Modal>
  );
};

export default CreateStoreModal;
