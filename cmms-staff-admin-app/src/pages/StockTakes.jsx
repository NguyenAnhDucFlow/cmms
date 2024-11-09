import React, { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import StockTakesFilterSidebar from "../sections/stock-takes/StockTakesFilterSidebar";
import StockTakesTable from "../sections/stock-takes/StockTakesTable";
import StockTakesSearch from "../sections/stock-takes/StockTakesSearch";
import StockTakesButton from "../sections/stock-takes/StockTakesButton";
import CreateProductModal from "../components/modal/CreateProductModal";
import useAuth from "../hooks/useAuth";
import { useStore } from "../hooks/useStore";
import axios from "../utils/axios";

const StockTakes = () => {
  const { roles, user } = useAuth();
  const { storeId, stores } = useStore();
  const [products, setProducts] = useState([]);

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
    const loadProducts = async () => {
      try {
        const response = await axios.get("/materials/central-materials");
        setProducts(response.data.data);
        console.log("materials", response.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadProducts();
  }, []);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Page title="Hàng hóa-Kiểm kho">
      <CreateProductModal visible={isModalVisible} onClose={hideModal} />

      <div className="flex gap-6">
        <div className="w-[16%]">
          <StockTakesFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <StockTakesSearch />
            <StockTakesButton onAddNewClick={showModal} />
          </div>
          <StockTakesTable products={products} />
        </div>
      </div>
    </Page>
  );
};

export default StockTakes;
