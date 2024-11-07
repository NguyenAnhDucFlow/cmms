import React, { useState, useEffect } from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import axios from "../../utils/axios";

const inventoryOption = [
  "Dưới định mức tồn kho",
  "Vượt định mức tồn kho",
  "Còn hàng trong kho",
  "Hết hàng trong kho",
];

const PriceBookFilterSidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await axios.get("/categories");
        setCategories(categoriesRes.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Bảng giá chung</div>
      </h1>
      <DropdownSelectSearch title="Nhóm hàng" options={categories} />
      <DropdownRadio
        name="inventoryOptionPriceBook"
        title="Tồn kho"
        options={inventoryOption}
      />
    </div>
  );
};

export default PriceBookFilterSidebar;
