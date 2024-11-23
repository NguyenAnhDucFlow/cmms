import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";

const ProductCard = ({ product }) => (
  <div
    title={`Giá: ${product.salePrice} | Tồn: ${product.quantity} `}
    class=" w-36 h-48 mx-auto hover:border-primary bg-white hover:border-2 border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition transform duration-300 relative group"
  >
    <div className="relative">
      {product.coverImageUrl ? (
        <img
          alt={product.name}
          src={product.coverImageUrl}
          class="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.UYefmuqvYGCqQqZN9xaW8QHaGp&pid=Api"
          class="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      )}
      <div className="absolute bottom-0 left-2 p-1 rounded-md text-primary bg-white">
        {formatCurrency(product.salePrice)}
      </div>
    </div>
    <div class="p-4 font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
      {`${product.name} (${product.unitName})`}
    </div>
  </div>
);

export default ProductCard;
