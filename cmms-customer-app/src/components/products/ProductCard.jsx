import { motion } from "framer-motion";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useCart from "../../stores/useCart";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform-gpu transition-all duration-300"
    >
      <div className="relative aspect-w-4 aspect-h-3">
        <img
          src={product.coverImageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

        {/* Quick Actions */}
        <div
          className="absolute top-4 right-4 space-y-2 opacity-0 transform translate-x-4 transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateX(0)" : "translateX(1rem)",
          }}
        >
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            <HeartIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.salePrice)}
            </p>
            {product.originalPrice > product.salePrice && (
              <p className="text-sm text-gray-500 line-through">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.originalPrice)}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(product)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Thêm vào giỏ
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
