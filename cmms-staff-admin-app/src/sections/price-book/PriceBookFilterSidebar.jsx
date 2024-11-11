import React, { useState, useEffect } from "react";
import DropdownSelectSearch from "../../components/dropdown/DropdownSelectSearch";
import axios from "../../utils/axios";
import { useData } from "../../hooks/useData";

const PriceBookFilterSidebar = ({ setFilters }) => {
  const { categories } = useData();

  const handleCategoryChange = (categoryId) => {
    setFilters((prevFilters) => ({ ...prevFilters, category: categoryId }));
  };

  return (
    <div className="space-y-4">
      <h1 className="h-8 text-xl font-bold">
        <div className="mt-2">Bảng giá chung</div>
      </h1>
      <DropdownSelectSearch
        title="Nhóm hàng"
        options={categories}
        onOptionSelect={handleCategoryChange}
      />
    </div>
  );
};

export default PriceBookFilterSidebar;
