import React from "react";
import Page from "../components/Page";
import ProductFilterSidebar from "../components/products/ProductFilterSidebar";
import ProductTable from "../components/products/ProductTable";
import ProductSearch from "../components/products/ProductSearch";
import ProductButtonGroup from "../components/products/ProductButtonGroup";

const Products = () => {
  return (
    <Page title="Hàng hóa">
      <div className="flex gap-4">
        <div className="w-1/5">
          <ProductFilterSidebar />
        </div>
        <div className="w-4/5">
          <div className="flex items-center justify-between">
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
