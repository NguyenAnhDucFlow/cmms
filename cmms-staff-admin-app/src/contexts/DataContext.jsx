import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [importList, setImportList] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoriesRes,
          brandsRes,
          unitsRes,
          importListRes,
          suppliersRes,
          shipperRes,
        ] = await Promise.all([
          axios.get("/categories"),
          axios.get("/brands"),
          axios.get("/units"),
          axios.get("/materials/import-list"),
          axios.get("/suppliers"),
          axios.get("/shipper/ACTIVE"),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
        setUnits(unitsRes.data.data);
        setImportList(importListRes.data.data);
        setSuppliers(suppliersRes.data.data);
        setShippers(shipperRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        categories,
        brands,
        units,
        setCategories,
        setUnits,
        setBrands,
        loading,
        importList,
        suppliers,
        shippers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
