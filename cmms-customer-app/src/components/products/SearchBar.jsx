import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onFilterClick,
}) {
  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex-1 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-3 py-2 border-none focus:ring-0 rounded-l-lg"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFilterClick}
          className="p-2 hover:bg-gray-50 rounded-r-lg border-l flex items-center"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          <span className="ml-2 text-sm text-gray-600 hidden sm:inline">
            Bộ lọc
          </span>
        </motion.button>
      </div>
    </div>
  );
}
