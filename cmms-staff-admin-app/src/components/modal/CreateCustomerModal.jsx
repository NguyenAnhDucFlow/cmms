import React, { useEffect, useState } from "react";
import { Modal, Input, Radio, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useStore as store } from "../../hooks/useStore";
import { CustomSelect } from "../../utils/Css-in-js";
import useRegionData from "../../hooks/useRegionData";

// Hàm gọi API kiểm tra mã số thuế
const validateTaxCode = async (taxCode) => {
  try {
    const response = await axios.get(
      `https://api.vietqr.io/v2/business/${taxCode}`
    );
    if (response.data.code === "00") {
      return {
        isValid: true,
        data: response.data.data, // Dữ liệu công ty trả về
      };
    } else {
      return {
        isValid: false,
        error: "Mã số thuế không tồn tại!",
      };
    }
  } catch (error) {
    console.error("Error validating tax code:", error);
  }
};

// Yup Schema với xác minh mã số thuế
const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên khách hàng!"),
  phone: yup.string().required("Vui lòng nhập số điện thoại!"),
  partnerType: yup.string().required("Vui lòng chọn loại khách hàng!"),
});

const CreateCustomerModal = ({ isOpen, onClose, onCreateCustomer }) => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const { storeName } = store();

  const customerType = watch("partnerType");

  const onSubmit = async (data) => {
    if (data.partnerType === "COMPANY") {
      const { isValid, data: companyData } = await validateTaxCode(
        data.taxCode
      );
      if (!isValid) {
        message.error("Mã số thuế không hợp lệ!");
        return;
      }
      data.companyInfo = companyData;
    }
    onCreateCustomer(data);
  };

  const handleTaxCodeChange = async (value) => {
    setValue("taxCode", value);
    if (customerType === "COMPANY") {
      const { isValid, data: companyData } = await validateTaxCode(value);
      if (isValid) {
        setCompanyInfo(companyData); // Lưu thông tin công ty nếu hợp lệ
      } else {
        setCompanyInfo(null); // Xóa thông tin nếu không hợp lệ
      }
    }
  };

  return (
    <Modal
      width={1020}
      title={
        <div>
          Thêm khách hàng |{" "}
          <span className="font-sans text-gray-500">{storeName}</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <button
          key="cancel"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Bỏ qua
        </button>,
        <button
          key="save"
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
        >
          Lưu
        </button>,
      ]}
    >
      <form className="flex flex-col space-y-4 mt-5">
        <div className="flex gap-5">
          {/* Cột trái */}
          <div className="flex flex-col items-center w-[10%]">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <span>Ảnh</span>
            </div>
            <button
              disabled
              className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Chọn ảnh
            </button>
          </div>
          <div className="w-[45%]">
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Mã khách hàng</label>

              <div className="w-2/3 border-b">
                <Input
                  placeholder="Mã mặc định"
                  variant="borderless"
                  disabled
                />
              </div>
            </div>
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Tên khách hàng</label>

              <div className="w-2/3 border-b hover:border-primary">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} variant="borderless" />
                  )}
                />
                {errors?.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.username.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Điện thoại</label>

              <div className="w-2/3 border-b hover:border-primary">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} variant="borderless" />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Địa chỉ</label>

              <div className="w-2/3 border-b hover:border-primary">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Số nhà, tòa nhà, ngõ, đường"
                      variant="borderless"
                    />
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <div className="w-1/3 font-medium">Chọn Tỉnh/Thành phố</div>
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
                <div className="w-1/3 font-medium">Chọn Quận/Huyện</div>
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
                <div className="w-1/3 font-medium">Chọn Phường/Xã</div>
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
          </div>
          <div className="w-[45%] space-y-6">
            <div className="flex items-center ">
              <label className="w-1/3  font-semibold">Loại khách</label>
              <Controller
                name="partnerType"
                control={control}
                render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="PERSONAL">Cá nhân</Radio>
                    <Radio value="COMPANY">Công ty</Radio>
                  </Radio.Group>
                )}
              />
              {errors.partnerType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.partnerType.message}
                </p>
              )}
            </div>
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Mã số thuế</label>

              <div className="w-2/3 border-b">
                <Controller
                  name="taxCode"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} variant="borderless" />
                  )}
                />
              </div>
            </div>
            <div className=" mb-4 flex items-center">
              <label className="block w-1/3 font-medium">Ghi chú</label>

              <div className="w-2/3 border-b">
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} variant="borderless" />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCustomerModal;
