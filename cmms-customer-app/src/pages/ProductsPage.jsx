import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useCart from "../stores/useCart";
import useStoreLocation from "../stores/useStoreLocation";
import Breadcrumb from "../components/Breadcrumb";
import axios from "../utils/axios";

export default function ProductsPage() {
  const { selectedStore } = useStoreLocation();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [sortBy, setSortBy] = useState("Tên: A đến Z");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    if (selectedStore) {
      const fetchMaterials = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get("/materials/search", {
            params: {
              storeId: selectedStore.id,
            },
          });
          setMaterials(response.data.data);
        } catch (err) {
          setError("Không thể tải danh sách vật liệu.");
        } finally {
          setLoading(false);
        }
      };

      fetchMaterials();
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data); // Cập nhật danh sách danh mục từ API
      } catch (err) {
        console.error("Không thể tải danh mục", err);
      }
    };

    fetchCategories();
  }, [selectedStore]);

  const handleCategoryChange = (category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = materials;

    if (selectedCategories.size > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.has(product.category)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "Giá: Thấp đến Cao":
          return a.salePrice - b.salePrice;
        case "Giá: Cao đến Thấp":
          return b.salePrice - a.salePrice;
        case "Tên: A đến Z":
          return a.name.localeCompare(b.name);
        case "Tên: Z đến A":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [materials, selectedCategories, sortBy, searchQuery]);
  const breadcrumbItems = [
    { name: "Sản phẩm", href: "/products", current: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {loading && <p>Đang tải sản phẩm...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Bộ lọc danh mục */}
              <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4">Danh mục</h2>
                  <div className="space-y-3">
                    {[...new Set(materials.map((item) => item.category))].map(
                      (category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.has(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      )
                    )}
                  </div>

                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Sắp xếp theo</h2>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[
                        "Giá: Thấp đến Cao",
                        "Giá: Cao đến Thấp",
                        "Tên: A đến Z",
                        "Tên: Z đến A",
                      ].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Lưới sản phẩm */}
              <div className="lg:w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="aspect-w-4 aspect-h-3">
                          <img
                            src={product.coverImageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {product.description}
                          </p>
                          <div className="mt-2">
                            <span className="text-blue-600 font-semibold">
                              {product.salePrice.toFixed(2)}₫
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="p-4 pt-0">
                        <button
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                          onClick={() => addItem(product)}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredAndSortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Không tìm thấy sản phẩm nào phù hợp.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
