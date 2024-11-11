import React from "react";
import DropdownRadio from "../../components/dropdown/DropdownRadio";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import { useData } from "../../hooks/useData";

const displayOption = ["Hàng đang kinh doanh", "Hàng ngừng kinh doanh"];
const inventoryOption = [
  "Dưới định mức tồn kho",
  "Vượt định mức tồn kho",
  "Còn hàng trong kho",
  "Hết hàng trong kho",
];

const ProductFilterSidebar = ({ filters, setFilters }) => {
  const { brands, categories } = useData();

  const handleCategoryChange = (categoryId) => {
    setFilters((prevFilters) => ({ ...prevFilters, category: categoryId }));
  };

  const handleBrandChange = (brandId) => {
    setFilters((prevFilters) => ({ ...prevFilters, brand: brandId }));
  };

  const handleDisplayOptionChange = (option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      isActive:
        option === "Hàng đang kinh doanh"
          ? true
          : option === "Hàng ngừng kinh doanh"
          ? false
          : null,
    }));
  };

  const handleInventoryOptionChange = (option) => {
    const filterMap = {
      "Dưới định mức tồn kho": "belowMinStock",
      "Vượt định mức tồn kho": "aboveMaxStock",
      "Còn hàng trong kho": "hasStock",
      "Hết hàng trong kho": "outOfStock",
    };
    const updatedFilters = Object.keys(filterMap).reduce((acc, key) => {
      acc[filterMap[key]] = key === option ? true : null;
      return acc;
    }, {});
    setFilters((prevFilters) => ({ ...prevFilters, ...updatedFilters }));
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Hàng hóa</div>
      </h1>
      <DropdownSelectSearch
        title="Nhóm hàng"
        options={categories}
        onOptionSelect={handleCategoryChange}
      />
      <DropdownSelectSearch
        title="Thương hiệu"
        options={brands}
        onOptionSelect={handleBrandChange}
      />
      <DropdownRadio
        name="displayOption"
        title="Lựa chọn hiển thị"
        options={displayOption}
        onOptionChange={handleDisplayOptionChange}
      />
      <DropdownRadio
        name="inventoryOption"
        title="Tồn kho"
        options={inventoryOption}
        onOptionChange={handleInventoryOptionChange}
      />
    </div>
  );
};

export default ProductFilterSidebar;
