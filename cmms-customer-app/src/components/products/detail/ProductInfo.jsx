import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import useCart from "../../../stores/useCart";

const reviews = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    userAvatar: "https://via.placeholder.com/40", // Link ảnh đại diện
    rating: 5,
    date: "2024-11-25",
    comment: "Sản phẩm tuyệt vời, chất lượng vượt mong đợi!",
    images: [
      "https://via.placeholder.com/80", // Link ảnh review 1
      "https://via.placeholder.com/80", // Link ảnh review 2
    ],
  },
  {
    id: 2,
    userName: "Trần Thị B",
    userAvatar: "https://via.placeholder.com/40",
    rating: 4,
    date: "2024-11-20",
    comment: "Giao hàng nhanh, sản phẩm tốt nhưng đóng gói chưa kỹ.",
    images: ["https://via.placeholder.com/80"],
  },
  {
    id: 3,
    userName: "Phạm Minh C",
    userAvatar: "https://via.placeholder.com/40",
    rating: 3,
    date: "2024-11-18",
    comment:
      "Chất lượng tạm ổn, nhưng không giống mô tả lắm. Dịch vụ khách hàng hỗ trợ tốt.",
    images: [],
  },
  {
    id: 4,
    userName: "Lê Hồng D",
    userAvatar: "https://via.placeholder.com/40",
    rating: 5,
    date: "2024-11-10",
    comment: "Mua lần thứ 2 rồi, vẫn rất hài lòng. 5 sao!",
    images: [
      "https://via.placeholder.com/80",
      "https://via.placeholder.com/80",
    ],
  },
  {
    id: 5,
    userName: "Hoàng Văn E",
    userAvatar: "https://via.placeholder.com/40",
    rating: 2,
    date: "2024-11-05",
    comment: "Sản phẩm không đạt như kỳ vọng, giao hàng chậm.",
    images: [],
  },
];

export default function ProductInfo({ product }) {
  const { name, brand, category, description } = product;

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          {name}
        </motion.h1>
        <div className="mt-2 flex items-center space-x-4">
          <span className="text-gray-600">{brand}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600">{category}</span>
        </div>
      </div>

      <span className="text-3xl font-bold text-gray-900 mt-2">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.salePrice)}
      </span>

      {/* Description */}
      <div className="prose prose-sm max-w-none text-gray-600">
        <p>{description}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ShoppingCartIcon className="h-5 w-5" />
        <span>Thêm vào giỏ hàng</span>
      </motion.button>
      {/* Features */}
      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <TruckIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">Giao hàng miễn phí</span>
          </div>
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">Bảo hành 12 tháng</span>
          </div>
        </div>
      </div>
    </div>
  );
}
