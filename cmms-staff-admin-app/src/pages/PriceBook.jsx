import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import PriceBookFilterSidebar from "../sections/price-book/PriceBookFilterSidebar";
import PriceBookTable from "../sections/price-book/PriceBookTable";
import PriceBookButton from "../sections/price-book/PriceBookButton";
import CreateProductModal from "../components/modal/CreateProductModal";
import useAuth from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";
import axios from "../utils/axios";
import { Pagination } from "antd";
import ProductSearch from "../sections/products/ProductSearch";

const PriceBook = () => {
  const { roles, user } = useAuth();
  const { storeId, stores } = useStore();
  const [products, setPriceBook] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filters, setFilters] = useState({
    name: "",
    category: null,
    brand: null,
  });

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

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPriceBook = async () => {
      try {
        const response = await axios.get("/materials/central-materials");
        setPriceBook(response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadPriceBook();
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Page title="Thiết lập giá">
      <CreateProductModal visible={isModalVisible} onClose={hideModal} />

      <div className="flex gap-6">
        <div className="w-[16%]">
          <PriceBookFilterSidebar setFilters={setFilters} />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <ProductSearch onSearch={handleSearch} />
            <PriceBookButton onAddNewClick={showModal} />
          </div>
          <PriceBookTable products={products} />
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

export default PriceBook;
