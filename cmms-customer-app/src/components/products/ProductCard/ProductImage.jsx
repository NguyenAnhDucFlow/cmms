import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function ProductImage({ src, alt, isNew }) {
  return (
    <div className="relative aspect-w-4 aspect-h-3">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
      {isNew && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            New
          </span>
        </div>
      )}
    </div>
  );
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
};
