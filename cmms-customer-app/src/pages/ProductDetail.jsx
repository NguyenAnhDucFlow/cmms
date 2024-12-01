import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useStoreLocation from "../stores/useStoreLocation";
import axios from "../utils/axios";
import Breadcrumb from "../components/Breadcrumb";
import ProductInfo from "../components/products/detail/ProductInfo";
import RelatedProducts from "../components/products/detail/RelatedProducts";
import ProductReviews from "../components/products/detail/ProductReviews";

const reviews = [
  {
    id: 1,
    userName: "Nguyễn Văn A",
    userAvatar:
      "https://banner2.cleanpng.com/20240229/agb/transparent-pokemon-sad-pikachu-with-red-nose-black-1710858214400.webp",
    rating: 5,
    date: "2024-11-25",
    comment: "Sản phẩm tuyệt vời, chất lượng vượt mong đợi!",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG6L83I_BbhEfqUnKbLeTEbE-tenH9nzarrA&s",
      "https://aicahpl.com/content_hpl/upload/Image/vat-lieu-xay-dung-gom-nhung-gi-1.jpg",
    ],
  },
  {
    id: 2,
    userName: "Trần Thị B",
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxKiEZ7J913NSX4e5toOV1QlZ1M8tDQR92eQ&s",
    rating: 4,
    date: "2024-11-20",
    comment: "Giao hàng nhanh, sản phẩm tốt nhưng đóng gói chưa kỹ.",
    images: [
      "https://aicahpl.com/content_hpl/upload/Image/vat-lieu-xay-dung-gom-nhung-gi-2.jpg",
    ],
  },
  {
    id: 3,
    userName: "Phạm Minh C",
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfh7q3kjxmKQj5_qwHpOpzA6bzjQptPtI0BA&s",
    rating: 3,
    date: "2024-11-18",
    comment:
      "Chất lượng tạm ổn, nhưng không giống mô tả lắm. Dịch vụ khách hàng hỗ trợ tốt.",
    images: [],
  },
  {
    id: 4,
    userName: "Lê Hồng D",
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfh7q3kjxmKQj5_qwHpOpzA6bzjQptPtI0BA&s",
    rating: 5,
    date: "2024-11-10",
    comment: "Mua lần thứ 2 rồi, vẫn rất hài lòng. 5 sao!",
    images: [
      "https://aicahpl.com/content_hpl/upload/Image/vat-lieu-xay-dung-gom-nhung-gi-4.jpg",
      "https://aicahpl.com/content_hpl/upload/Image/vat-lieu-xay-dung-gom-nhung-gi-5.jpg",
    ],
  },
  {
    id: 5,
    userName: "Hoàng Văn E",
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_AJ6ktBWyLwyHqchThEBNZ4xiT57dBtopQ&s",
    rating: 2,
    date: "2024-11-05",
    comment: "Sản phẩm không đạt như kỳ vọng, giao hàng chậm.",
    images: [],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { selectedStore } = useStoreLocation();
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!selectedStore?.id) return;

      setLoading(true);
      try {
        const productResponse = await axios.get(
          `/materials/${id}/stores/${selectedStore.id}`
        );
        const productData = productResponse.data.data;

        setProduct(productData);

        const categories = productData.category;
        const size = 4;
        const relatedResponse = await axios.get("/materials/search", {
          params: { storeId: selectedStore.id, categories, size },
        });

        setRelatedProducts(relatedResponse.data.data);

        // Đặt hình ảnh chính
        setActiveImage(productData.coverImageUrl || productData.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, selectedStore]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Không tìm thấy sản phẩm
          </h2>
          <p className="mt-2 text-gray-600">
            Sản phẩm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: product.category, href: `/products?category=${product.category}` },
    { name: product.name, href: `/product/${product.id}`, current: true },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* Left Column - Gallery */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:aspect-h-4 lg:aspect-w-5 sm:overflow-hidden sm:rounded-lg"
          >
            <div className="relative">
              <img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-center object-fill rounded-md "
              />

              {/* Thumbnail Images */}
              <div className="absolute inset-x-0 bottom-0">
                <div className="mt-4 flex space-x-2 justify-center ">
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
              </div>
            </div>
          </motion.div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews reviews={reviews} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
