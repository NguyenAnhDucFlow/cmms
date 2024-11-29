import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import PriceTag from "./PriceTag";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link
        to={`/product/${product.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        aria-label={`View details for ${product.name}`}
      >
        <ProductImage
          src={product.coverImageUrl}
          alt={product.name}
          isNew={product.isNew}
        />
        <ProductInfo
          name={product.name}
          category={product.category}
          description={product.description}
        />
        <PriceTag
          price={product.salePrice}
          originalPrice={product.originalPrice}
          discount={product.discount}
        />
      </Link>
      <AddToCartButton product={product} />
    </motion.article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    isNew: PropTypes.bool,
  }).isRequired,
};
