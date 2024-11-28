import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  isOpen,
  onClose,
}) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", damping: 20 }}
      className={`fixed inset-y-0 left-0 z-40 w-full sm:w-80 bg-white shadow-xl transform
                 ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                 transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Bộ lọc tìm kiếm</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Danh mục
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(category)}
                      onChange={() => onCategoryChange(category)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-600">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Khoảng giá
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">
                    Từ: {priceRange[0].toLocaleString()}đ
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    value={priceRange[0]}
                    onChange={(e) =>
                      onPriceRangeChange([
                        parseInt(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">
                    Đến: {priceRange[1].toLocaleString()}đ
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      onPriceRangeChange([
                        priceRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </motion.div>
  );
}
