import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { Modal, message, Select } from "antd";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "antd";
import * as yup from "yup";
import RHFTextField from "../hook-form/RHFTextField";
import useRegionData from "../../hooks/useRegionData";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

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
  name: yup.string().required("Tên người dùng là bắt buộc"),
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  address: yup.string().required("Địa chỉ là bắt buộc"),
  province: yup.string().required("Tỉnh/Thành phố là bắt buộc"),
  district: yup.string().required("Quận/Huyện là bắt buộc"),
  ward: yup.string().required("Phường/Xã là bắt buộc"),
  username: yup.string().required("Tên đăng nhập là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const CreateUserModal = ({ visible, onClose }) => {
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);

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
    const fetchData = async () => {
      try {
        const [rolesRes, storesRes] = await Promise.all([
          axios.get("/roles"),
          axios.get("/stores"),
        ]);
        setRoles(rolesRes.data.data);
        setStores(storesRes.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

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
      const response = await axios.post("/users", submissionData);
      if (response.data.code === 1000) {
        message.success("Tạo người dùng thành công");
        reset();
        onClose();
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } catch (error) {
      message.error("Tạo người dùng thất bại");
      console.error("API error:", error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      width={960}
      title="Thêm người dùng"
      open={visible}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okText="Tạo"
      cancelText="Hủy"
    >
      <FormProvider {...methods}>
        <div className="flex gap-8 mt-4">
          <div className="w-full space-y-4 ">
            <RHFTextField name="name" label="Tên người dùng" />
            <RHFTextField name="username" label="Tên đăng nhập" />
            <RHFTextField name="password" label="Mật khẩu" type="password" />
            <RHFTextField
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
            />

            <label className="flex items-center">
              <div className="w-1/3">Cửa hàng</div>
              <div className="w-2/3">
                <Controller
                  name="store"
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
                        options={stores.map((store) => ({
                          value: store.name,
                          label: store.name,
                        }))}
                      />
                    );
                  }}
                />
              </div>
            </label>

            <label className="flex items-center">
              <div className="w-1/3">Vai trò</div>
              <div className="w-2/3">
                <Controller
                  name="role"
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
                        options={roles.map((role) => ({
                          value: role.name,
                          label: role.name,
                        }))}
                      />
                    );
                  }}
                />
              </div>
            </label>

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
          </div>

          <div className="w-full space-y-4">
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="address" label="Địa chỉ" />

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

            <label className="flex items-center">
              <div className="w-1/3">Ngày sinh</div>
              <div className="w-2/3 border-b hover:border-primary ">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      placeholder=""
                      variant="borderless"
                      className="w-full"
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
            </label>
          </div>
        </div>
        <DevTool control={control} />
      </FormProvider>
    </Modal>
  );
};

export default CreateUserModal;
