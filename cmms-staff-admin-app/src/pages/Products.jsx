import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import ProductFilterSidebar from "../sections/products/ProductFilterSidebar";
import ProductTable from "../sections/products/ProductTable";
import ProductSearch from "../sections/products/ProductSearch";
import ProductButtonGroup from "../sections/products/ProductButtonGroup";
import CreateProductModal from "../components/modal/CreateProductModal";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const { user } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {}, []);

  // Hàm mở modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Hàm đóng modal
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Page title="Hàng hóa">
      {/* Modal tạo sản phẩm */}
      <CreateProductModal visible={isModalVisible} onClose={hideModal} />

      <div className="flex gap-6">
        <div className="w-[16%]">
          <ProductFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <ProductSearch />
            <ProductButtonGroup onAddNewClick={showModal} />
          </div>
          <ProductTable />
        </div>
      </div>
    </Page>
  );
};

export default Products;
