import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Sản Phẩm", href: "/products" },
  { name: "Dự Án", href: "/projects" },
  { name: "Giới Thiệu", href: "/about" },
  { name: "Liên Hệ", href: "/contact" },
];

export default function Navigation3D() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Construction Supply Co.
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative"
              >
                <Link
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 h-full relative"
                >
                  {item.name}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
