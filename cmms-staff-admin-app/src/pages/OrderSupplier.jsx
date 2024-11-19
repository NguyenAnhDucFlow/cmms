import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import OrderSupplierFilterSidebar from "../sections/order-supplier/OrderSupplierFilterSidebar";
import OrderSupplierTable from "../sections/order-supplier/OrderSupplierTable";
import OrderSupplierSearch from "../sections/order-supplier/OrderSupplierSearch";
import OrderSupplierButtonGroup from "../sections/order-supplier/OrderSupplierButtonGroup";
import axios from "../utils/axios";
import { Pagination } from "antd";

const OrderSupplier = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [totalElement, setTotalElement] = useState(0);

  // State cho phân trang và tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filters, setFilters] = useState({
    purchaseOrderCode: "",
    status: [],
  });

  const loadPurchaseOrders = async () => {
    try {
      const response = await axios.post("/purchase-order/search", {
        ...filters,
        status: filters.status,
        currentPage: currentPage - 1, // API sử dụng index từ 0
        size: pageSize, // Số lượng item trên mỗi trang
      });
      setPurchaseOrders(response.data.data);
      setTotalElement(response.data.totalElements);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error.message);
    }
  };

  useEffect(() => {
    loadPurchaseOrders();
  }, [currentPage, pageSize, filters]);

  const handleSearch = (searchText) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      purchaseOrderCode: searchText, // Cập nhật mã đặt hàng
    }));
    setCurrentPage(1); // Reset về trang đầu
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters, // Kết hợp filter mới
    }));
    setCurrentPage(1); // Reset về trang đầu
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <Page title="Giao dịch - Đặt hàng nhập">
      <div className="flex gap-6">
        <div className="w-[16%]">
          <OrderSupplierFilterSidebar setFilters={handleFilterChange} />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <OrderSupplierSearch onSearch={handleSearch} />
            <OrderSupplierButtonGroup />
          </div>
          <OrderSupplierTable
            products={purchaseOrders}
            handleProductCreated={handleSearch}
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
