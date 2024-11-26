import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useCart from "../stores/useCart";
import useStoreLocation from "../stores/useStoreLocation";
import axios from "../utils/axios";
import Breadcrumb from "../components/Breadcrumb";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const { selectedStore } = useStoreLocation();
  const [loading, setLoading] = useState(null);
  const [activeImage, setActiveImage] = useState(""); // State cho ảnh trung tâm

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/materials/${id}/stores/${selectedStore.id}`
        );
        const productData = response.data.data;
        setProduct(productData);
        setActiveImage(productData.coverImageUrl || productData.images[0]); // Ảnh trung tâm mặc định
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && selectedStore?.id) {
      fetchProductDetails();
    }
  }, [id, selectedStore]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Sản phẩm", href: "/products", current: true },
  ];

  return (
    <>
      <div className="bg-white pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumb items={breadcrumbItems} />
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:aspect-h-4 lg:aspect-w-5 sm:overflow-hidden sm:rounded-lg"
            >
              {/* Ảnh trung tâm */}
              <img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-center object-fill rounded-md"
              />

              {/* Thumbnail Images */}
              <div className="mt-4 flex space-x-2 justify-center">
                {[product.coverImageUrl, ...product.images].map(
                  (img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className={classNames(
                        "h-16 w-16 object-cover object-center rounded-md cursor-pointer border",
                        activeImage === img
                          ? "border-blue-500"
                          : "border-gray-300"
                      )}
                      onClick={() => setActiveImage(img)}
                    />
                  )
                )}
              </div>
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0"
            >
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thông tin chi tiết
                </h3>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="font-medium text-gray-700">Trọng lượng</dt>
                      <dd className="text-gray-900">
                        {product.weightValue} {product.weightUnit}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">Danh mục</dt>
                      <dd className="text-gray-900">{product.category}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700">Thương hiệu</dt>
                      <dd className="text-gray-900">{product.brand}</dd>
                    </div>

                    <div>
                      <dt className="font-medium text-gray-700">Giá bán</dt>
                      <dd className="text-gray-900">${product.salePrice}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => addItem(product)}
                  className="w-full bg-blue-600 py-3 px-8 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
