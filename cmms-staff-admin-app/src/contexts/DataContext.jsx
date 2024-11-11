import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes, unitsRes] = await Promise.all([
          axios.get("/categories"),
          axios.get("/brands"),
          axios.get("/units"),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
        setUnits(unitsRes.data.data);
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};