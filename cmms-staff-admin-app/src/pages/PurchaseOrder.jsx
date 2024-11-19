import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import PurchaseOrderFilterSidebar from "../sections/purchase-order/PurchaseOrderFilterSidebar";
import PurchaseOrderTable from "../sections/purchase-order/PurchaseOrderTable";
import PurchaseOrderSearch from "../sections/purchase-order/PurchaseOrderSearch";
import PurchaseOrderButtonGroup from "../sections/purchase-order/PurchaseOrderButtonGroup";
import axios from "../utils/axios";
import { Pagination } from "antd";

const PurchaseOrder = () => {
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
      const response = await axios.post("/goods-receipts/search", {
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
    <Page title="Giao dịch - Nhập hàng">
      <div className="flex gap-6">
        <div className="w-[16%]">
          <PurchaseOrderFilterSidebar setFilters={handleFilterChange} />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <PurchaseOrderSearch onSearch={handleSearch} />
            <PurchaseOrderButtonGroup />
          </div>
          <PurchaseOrderTable
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

export default PurchaseOrder;
