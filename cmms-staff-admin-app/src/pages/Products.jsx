import React, { useState, useRef } from "react";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineFileExcel,
} from "react-icons/ai";
import { IoMdArrowDown } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import AddProductPopup from "../components/AddProductPopup";

const Sidebar = () => {
  return (
    <aside className="w-1/6 space-y-4 mr-4">
      <h1>
        <span className="font-bold text-xl">Hàng hóa</span>
      </h1>
      <div>
        <div className="bg-white rounded p-4 border-b pb-4">
          <h3 className="font-bold">Loại hàng</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <input type="checkbox" id="hang-hoa" className="mr-2" />
              <label htmlFor="hang-hoa">Hàng hóa</label>
            </li>
            <li>
              <input type="checkbox" id="combo" className="mr-2" />
              <label htmlFor="combo">Combo - Đóng gói</label>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="bg-white rounded p-4 border-b pb-4">
          <h3 className="font-bold">Nhóm hàng</h3>
          <input
            type="text"
            placeholder="Tìm kiếm nhóm hàng"
            className="w-full mt-2"
          />
          <ul className="space-y-2">
            <li>Tất cả</li>
            <li>Xi măng</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="bg-white rounded p-4 border-b pb-4">
          <h3 className="font-bold">Tồn kho</h3>
          <ul className="space-y-2">
            <li>
              <input type="radio" name="ton-kho" id="tat-ca" className="mr-2" />
              <label htmlFor="tat-ca">Tất cả</label>
            </li>
            <li>
              <input
                type="radio"
                name="ton-kho"
                id="duoi-muc-ton"
                className="mr-2"
              />
              <label htmlFor="duoi-muc-ton">Dưới định mức tồn</label>
            </li>
            <li>
              <input
                type="radio"
                name="ton-kho"
                id="vuot-muc-ton"
                className="mr-2"
              />
              <label htmlFor="vuot-muc-ton">Vượt định mức tồn</label>
            </li>
            <li>
              <input
                type="radio"
                name="ton-kho"
                id="con-hang"
                className="mr-2"
              />
              <label htmlFor="con-hang">Còn hàng trong kho</label>
            </li>
            <li>
              <input
                type="radio"
                name="ton-kho"
                id="het-hang"
                className="mr-2"
              />
              <label htmlFor="het-hang">Hết hàng trong kho</label>
            </li>
            <li>
              <input
                type="radio"
                name="ton-kho"
                id="lua-chon-khac"
                className="mr-2"
              />
              <label htmlFor="lua-chon-khac">Lựa chọn khác</label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const SearchBar = () => {
  return (
    <div className="flex-1 ">
      {/* Search Bar */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-lg bg-white shadow-md">
        <AiOutlineSearch className="" />
        <input
          type="text"
          placeholder="Theo mã, tên hàng"
          className="px-3 py-2 outline-none text-gray-700 w-full"
        />
        <IoMdArrowDown className="text-gray-400" />
      </div>
    </div>
  );
};

const PopverAddProduct = ({ isOpen, handleMouseEnter, handleMouseLeave }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddProductClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {isOpen && !isPopupOpen && (
        <div
          className="absolute bg-white   mt-2 w-64 shadow-lg border border-gray-200 rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2">
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleAddProductClick}
            >
              <AiOutlinePlus className="mr-2" />
              <span>Thêm hàng hóa</span>
            </div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <AiOutlinePlus className="mr-2" />
              <span>Thêm Combo - đóng gói</span>
            </div>
          </div>
        </div>
      )}
      <AddProductPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </>
  );
};

const ButtonGroup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };
  return (
    <div className="flex items-center space-x-2">
      <div
        className="relative "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <div className="flex items-center space-x-1 bg-green-500 rounded py-2 px-4 text-white">
            <AiOutlinePlus />
            <span>Thêm mới</span>
            <MdArrowDropDown />
          </div>
          <PopverAddProduct
            isOpen={isOpen}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </div>
      </div>

      {/* Import Button */}
      <button className="flex items-center space-x-1 bg-green-500 text-white py-2 px-4 rounded">
        <AiOutlineUpload />
        <span>Import</span>
      </button>

      {/* Export Button */}
      <button className="flex items-center space-x-1 bg-green-500 text-white py-2 px-4 rounded">
        <AiOutlineFileExcel />
        <span>Xuất file</span>
      </button>
    </div>
  );
};

const Products = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <SearchBar />
          <ButtonGroup />
        </div>
        {/* Product Table */}
        <div className="overflow-x-auto bg-white border rounded">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 border">Mã hàng</th>
                <th className="p-2 border">Tên hàng</th>
                <th className="p-2 border">Nhóm hàng</th>
                <th className="p-2 border">Loại hàng</th>
                <th className="p-2 border">Kích thước</th>
                <th className="p-2 border">Giá bán</th>
                <th className="p-2 border">Giá vốn</th>
                <th className="p-2 border">Thương hiệu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">SP001</td>
                <td className="p-2 border">Xi măng PC30 - Màu xám (Bao)</td>
                <td className="p-2 border">Xi măng con</td>
                <td className="p-2 border">Hàng hóa</td>
                <td className="p-2 border"></td>
                <td className="p-2 border">180</td>
                <td className="p-2 border">150</td>
                <td className="p-2 border">Holcim</td>
              </tr>
              {/* More rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
