import React, { useState, useEffect } from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import axios from "../../utils/axios";

const displayOption = ["Hàng đang kinh doanh", "Hàng ngừng kinh doanh"];
const inventoryOption = [
  "Dưới định mức tồn kho",
  "Vượt định mức tồn kho",
  "Còn hàng trong kho",
  "Hết hàng trong kho",
];

const ProductFilterSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, unitsRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/brands"),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Hàng hóa</div>
      </h1>
      <DropdownSelectSearch title="Nhóm hàng" options={categories} />
      <DropdownSelectSearch title="Thương hiệu" options={brands} />
      <DropdownRadio title="Lựa chọn hiển thị" options={displayOption} />
      <DropdownRadio title="Tồn kho" options={inventoryOption} />
    </div>
  );
};

export default ProductFilterSidebar;
