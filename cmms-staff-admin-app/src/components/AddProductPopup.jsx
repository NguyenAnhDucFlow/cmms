import React from "react";
import { Tooltip } from "react-tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";

// Reusable InputField Component
const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  tooltipId,
  tooltipContent,
}) => (
  <div className="flex items-center">
    <label
      htmlFor={id}
      className="block text-gray-700 text-sm font-medium w-20"
    >
      {label}
    </label>
    <TooltipIcon tooltipId={tooltipId} tooltipContent={tooltipContent} />
    <Tooltip id={tooltipId} variant="info" />
    <input
      type={type}
      id={id}
      className="mt-1 block w-full border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2"
      placeholder={placeholder}
    />
  </div>
);

// Reusable SelectField Component
const SelectField = ({ id, label, options, tooltipId, tooltipContent }) => (
  <div className="flex items-center">
    <label
      htmlFor={id}
      className="block text-gray-700 text-sm font-medium w-28"
    >
      {label}
    </label>
    <TooltipIcon tooltipId={tooltipId} tooltipContent={tooltipContent} />
    <Tooltip id={tooltipId} variant="info" />
    <select
      id={id}
      className="mt-1 block w-full border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2"
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  </div>
);

// Reusable TooltipIcon Component
const TooltipIcon = ({ tooltipId, tooltipContent }) => (
  <AiOutlineInfoCircle
    className="text-xl ml-1 text-gray-400 cursor-pointer"
    data-tooltip-id={tooltipId}
    data-tooltip-content={tooltipContent}
    data-tooltip-place="right"
  />
);

const AddProductPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-52 right-1/2 h-full flex items-center justify-center z-50 w-[960px]">
      <div className="bg-gray-800 bg-opacity-75 fixed inset-0"></div>
      <div className=" bg-white rounded-lg shadow-lg  overflow-auto mt-32 relative ">
        <div className="bg-gray-200">
          <div className="flex">
            <h2 className="text-lg font-semibold m-6">Thêm hàng</h2>
            <button
              onClick={onClose}
              className="text-2xl text-gray-500 absolute right-0 top-0 px-4 py-2 hover:text-gray-900 rounded hover:bg-gray-300"
            >
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b-2 border-gray-200 mb-4">
            <ul className="flex space-x-2 text-gray-600">
              <li className="px-6 border-b-4 border-green-500 pb-2">
                Thông tin
              </li>
              <li className="px-6 hover:text-gray-800 cursor-pointer">
                Mô tả chi tiết
              </li>
              <li className="px-6 hover:text-gray-800 cursor-pointer">
                Thành phần
              </li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-2 gap-4 p-6 ">
          <div>
            <InputField
              id="ma-hang-input"
              label="Mã hàng"
              placeholder="Mã hàng tự động"
              tooltipId="ma-hang"
              tooltipContent="Mã hàng là thông tin duy nhất"
            />
            <InputField
              id="ma-vach-input"
              label="Mã vạch"
              placeholder=""
              tooltipId="ma-vach"
              tooltipContent="Mã vạch của hàng hóa thường được tạo ra bởi nhà sản xuất"
            />
            <InputField
              id="ten-hang-input"
              label="Tên hàng"
              placeholder=""
              tooltipId="ten-hang"
              tooltipContent="Tên hàng là tên của sản phẩm"
            />

            <SelectField
              id="nhom-hang-input"
              label="Nhóm hàng"
              options={["---Lựa chọn---"]}
              tooltipId="nhom-hang"
              tooltipContent="Nhóm hàng là nhóm của sản phẩm"
            />
            <SelectField
              id="thuong-hieu-input"
              label="Thương hiệu"
              options={["---Chọn thương hiệu---"]}
              tooltipId="thuong-hieu"
              tooltipContent="Thương hiệu là thương hiệu của sản phẩm"
            />
            <InputField
              id="vi-tri-input"
              label="Vị trí"
              placeholder=""
              tooltipId="vi-tri"
              tooltipContent="Vị trí là vị trí của sản phẩm"
            />
            {/* Images Section */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="border-2 border-dashed border-gray-300 rounded-md p-2 h-20 flex items-center justify-center"
                >
                  <IoImageOutline />
                </div>
              ))}
            </div>
          </div>
          <div>
            <InputField
              id="gia-von-input"
              label="Giá vốn"
              type="number"
              placeholder="0"
              tooltipId="gia-von"
              tooltipContent="Giá vốn dùng để tính lợi nhận cho sản phẩm (sẽ tự động thay đổi khi thay đổi phương pháp tính giá vốn)"
            />
            <InputField
              id="gia-ban-input"
              label="Giá bán"
              type="number"
              placeholder="0"
              tooltipId="gia-ban"
              tooltipContent="Giá bán là giá mà bạn bán cho khách hàng"
            />
            <InputField
              id="ton-kho-input"
              label="Tồn kho"
              type="number"
              placeholder="0"
              tooltipId="ton-kho"
              tooltipContent="Tồn kho là số lượng hàng hóa có trong kho"
            />
            <div className="flex items-center justify-between">
              <label
                htmlFor="trong-luong-input"
                className="block text-gray-700 text-sm font-medium w-20"
              >
                Trọng lượng
              </label>
              <TooltipIcon
                tooltipId="trong-luong"
                tooltipContent="Trọng lượng là trọng lượng của sản phẩm"
              />
              <Tooltip id="trong-luong" variant="info" />
              <div className="flex items-center mt-1">
                <input
                  type="number"
                  className="block w-full border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2"
                />
                <select className="ml-2 border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2">
                  <option>gram</option>
                  <option>kg</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <label
                htmlFor="kich-thuoc-input"
                className="block text-gray-700 text-sm font-medium w-20"
              >
                Kích thước
              </label>
              <TooltipIcon
                tooltipId="kich-thuoc"
                tooltipContent="Kích thước là kích thước của sản phẩm"
              />
              <Tooltip id="kich-thuoc" variant="info" />
              <div className="flex space-x-2 mt-1">
                <input
                  type="text"
                  className="block w-full border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2"
                  placeholder="Rộng"
                />
                <input
                  type="text"
                  className="block w-full border-b border-gray-300 hover:border-green-500 outline-none px-3 py-2"
                  placeholder="Dài"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-700">Bán trực tiếp</span>
              <input type="checkbox" className="form-checkbox" />
              <span className="text-gray-700">Tích điểm</span>
            </div>
          </div>
        </div>

        {/* Property & Unit Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button className="border rounded-md text-left pl-4 py-2 border-gray-300 text-gray-700">
            Thuộc tính
          </button>
          <button className="border rounded-md text-left pl-4 py-2 border-gray-300 text-gray-700">
            Đơn vị tính
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Lưu
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Lưu & Thêm mới
          </button>
          <button className=" bg-green-500 text-white px-4 py-2 rounded-md">
            Lưu & Sao chép
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPopup;
