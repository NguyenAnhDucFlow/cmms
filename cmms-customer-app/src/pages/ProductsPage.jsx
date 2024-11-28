import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import useStoreLocation from "../stores/useStoreLocation";
import Breadcrumb from "../components/Breadcrumb";
import SearchBar from "../components/products/SearchBar";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";
import axios from "../utils/axios";

export default function ProductsPage() {
  const { selectedStore } = useStoreLocation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!selectedStore) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/materials/search", {
          params: { storeId: selectedStore.id },
        });
        setMaterials(response.data.data);
      } catch (err) {
        setError("Không thể tải danh sách vật liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [selectedStore]);

  const filteredProducts = useMemo(() => {
    return materials.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(product.category);
      const matchesPrice =
        product.salePrice >= priceRange[0] &&
        product.salePrice <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [materials, searchQuery, selectedCategories, priceRange]);

  const categories = useMemo(
    () => [...new Set(materials.map((item) => item.category))],
    [materials]
  );

  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products", current: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Đã có lỗi xảy ra
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Sản phẩm
          </motion.h1>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setIsFilterOpen(true)}
          />
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={(category) => {
              const newCategories = new Set(selectedCategories);
              if (newCategories.has(category)) {
                newCategories.delete(category);
              } else {
                newCategories.add(category);
              }
              setSelectedCategories(newCategories);
            }}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
