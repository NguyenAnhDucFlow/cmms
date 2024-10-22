import React from "react";
import Page from "../components/Page";
import ProductFilterSidebar from "../sections/products/ProductFilterSidebar";
import ProductTable from "../sections/products/ProductTable";
import ProductSearch from "../sections/products/ProductSearch";
import ProductButtonGroup from "../sections/products/ProductButtonGroup";

const Products = () => {
  return (
    <Page title="Hàng hóa">
      <div className="flex gap-6">
        <div className="w-[16%]">
          <ProductFilterSidebar />
        </div>
        <div className="w-[84%] space-y-4">
          <div className="flex items-center justify-between gap-4 pb-1">
            <ProductSearch />
            <ProductButtonGroup />
          </div>
          <ProductTable />
        </div>
      </div>
    </Page>
  );
};

export default Products;
