import PropTypes from "prop-types";

export default function ProductInfo({ name, category, description }) {
  return (
    <div className="p-4">
      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        {category}
      </span>
      <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
        {name}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
    </div>
  );
}

ProductInfo.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string,
};
