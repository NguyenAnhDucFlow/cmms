import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Xi Măng Chất Lượng Cao",
    image:
      "https://lh7-us.googleusercontent.com/VYYBUnSK6kQw0gqv78xZkLQ9DrJxiqkn-3QExGrDGqsOdbdnh841ZfKuo5_lQHwFxMFdUEWPY1k_P-JvSeruNXVzZyhd3OEgA9FH1IsfkbxJs2-tCas0h8vovaf5GM2-s1SJm2aPujaB",
    price: "180.000đ",
    category: "Xi măng",
  },
  {
    id: 2,
    name: "Gạch Ốp Tường Cao Cấp",
    image:
      "data:image/jpeg;base64,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",
    price: "250.000đ",
    category: "Gạch ốp",
  },
  {
    id: 3,
    name: "Sơn Nội Thất Premium",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxLTOSXyu2l5MCXZPZ5Gys2KFCLJxplPEWAw&s",
    price: "850.000đ",
    category: "Sơn",
  },
];

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các sản phẩm chất lượng cao được tin dùng bởi các chuyên
            gia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform-gpu"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-w-4 aspect-h-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-out"
                    style={{
                      transform:
                        hoveredId === product.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-semibold">
                      {product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                    >
                      Chi tiết
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
