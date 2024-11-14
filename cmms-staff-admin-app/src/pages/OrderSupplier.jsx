import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import OrderSupplierFilterSidebar from "../sections/order-supplier/OrderSupplierFilterSidebar";
import OrderSupplierTable from "../sections/order-supplier/OrderSupplierTable";
import OrderSupplierSearch from "../sections/order-supplier/OrderSupplierSearch";
import OrderSupplierButtonGroup from "../sections/order-supplier/OrderSupplierButtonGroup";
import { useStore } from "../hooks/useStore";
import axios from "../utils/axios";
import { Pagination } from "antd";

const OrderSupplier = () => {
  const { storeId, stores } = useStore();
  const [products, setProducts] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  // State cho phân trang và tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filters, setFilters] = useState({
    name: "",
    category: null,
    brand: null,
    isActive: null,
    hasStock: null,
    belowMinStock: null,
    aboveMaxStock: null,
    outOfStock: null,
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const storeCentral = stores.find(
    (store) => store.name === "Cửa hàng trung tâm"
  );

  const loadProducts = async () => {
    try {
      const endpoint =
        storeCentral && storeId === storeCentral.id
          ? "/materials/central-materials"
          : "/materials/store-materials";
      console.log("endpoint", endpoint);
      const response = await axios.get(endpoint, {
        params: {
          storeId,
          name: filters.name,
          category: filters.category,
          brand: filters.brand,
          isActive: filters.isActive,
          hasStock: filters.hasStock,
          belowMinStock: filters.belowMinStock,
          aboveMaxStock: filters.aboveMaxStock,
          outOfStock: filters.outOfStock,
          currentPage: currentPage - 1, // API có thể sử dụng chỉ số trang bắt đầu từ 0
          size: pageSize,
        },
      });
      setProducts(response.data.data);
      setTotalElement(response.data.totalElements);
      console.log("materials", response.data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage, pageSize, filters, reloadTrigger]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleProductCreated = () => {
    setCurrentPage(1);
    setReloadTrigger((prev) => !prev);
  };

  // Handler cho tìm kiếm sản phẩm
  const handleSearch = (searchText) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: searchText,
    }));
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm mới
  };

  // Handler cho thay đổi phân trang
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <Page title="Giao dịch - Đặt hàng nhập">
      <div className="flex gap-6">
        <div className="w-[16%]">
          <OrderSupplierFilterSidebar
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <OrderSupplierSearch onSearch={handleSearch} />
            <OrderSupplierButtonGroup />
          </div>
          <OrderSupplierTable
            products={products}
            handleProductCreated={OrderSupplierSearch}
          />
          <div className="flex items-center justify-start">
            <Pagination
              size="small"
              total={totalElement}
              current={currentPage}
              pageSize={pageSize}
              showSizeChanger
              onChange={handlePageChange}
              pageSizeOptions={["8", "10", "20", "50"]}
            />
            <div className="text-sm ml-2">Tổng số {totalElement} hàng hóa</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default OrderSupplier;
