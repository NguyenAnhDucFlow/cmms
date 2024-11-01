import React, { useState } from "react";
import Page from "../components/Page";
import StoreFilterSidebar from "../sections/stores/StoreFilterSidebar";
import StoreTable from "../sections/stores/StoreTable";
import StoreSearch from "../sections/stores/StoreSearch";
import StoreButton from "../sections/stores/StoreButton";
import CreateStoreModal from "../components/modal/CreateStoreModal";

const Stores = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Hàm mở modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Hàm đóng modal
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Page title="Quản lí cửa hàng">
      {/* Modal tạo sản phẩm */}
      <CreateStoreModal visible={isModalVisible} onClose={hideModal} />

      <div className="flex gap-6">
        <div className="w-[16%]">
          <StoreFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <StoreSearch />
            <StoreButton onAddNewClick={showModal} />
          </div>
          <StoreTable />
        </div>
      </div>
    </Page>
  );
};

export default Stores;
