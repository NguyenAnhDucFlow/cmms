import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import PriceBookFilterSidebar from "../sections/price-book/PriceBookFilterSidebar";
import PriceBookTable from "../sections/price-book/PriceBookTable";
import PriceBookButton from "../sections/price-book/PriceBookButton";
import CreateProductModal from "../components/modal/CreateProductModal";
import useAuth from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";
import axios from "../utils/axios";

const PriceBook = () => {
  const { roles, user } = useAuth();
  const { storeId, stores } = useStore();
  const [products, setPriceBook] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const storeCentralId = stores.find(
    (store) => store.name === "Cửa hàng trung tâm"
  );
  const hasRoleAdmin = useMemo(
    () => roles.some((role) => role.name === "SENIOR_MANAGEMENT"),
    [roles]
  );

  const url = useMemo(() => {
    const baseUrl = "/material";
    if (hasRoleAdmin && storeId) return `${baseUrl}/${storeId}`;
    return hasRoleAdmin
      ? `${baseUrl}/${storeCentralId}`
      : `${baseUrl}/${user.store.id}`;
  }, [storeId, roles, user?.store?.id]);

  useEffect(() => {
    const loadPriceBook = async () => {
      try {
        const response = await axios.get("/materials/central-materials");
        setPriceBook(response.data.data);
        console.log("materials", response.data.data);
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
          <PriceBookFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-end pb-1">
            <PriceBookButton onAddNewClick={showModal} />
          </div>
          <PriceBookTable products={products} />
        </div>
      </div>
    </Page>
  );
};

export default PriceBook;
