import PropTypes from "prop-types";

export default function PriceTag({ price, originalPrice, discount }) {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center">
        <p className="text-2xl font-bold text-blue-600">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(price)}
        </p>
        {originalPrice && (
          <span className="ml-2 text-sm text-gray-500 line-through">
            ${originalPrice?.toFixed(2)}
          </span>
        )}
        {discount && (
          <span className="ml-2 text-sm font-medium text-green-600">
            {discount}% off
          </span>
        )}
      </div>
    </div>
  );
}

PriceTag.propTypes = {
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  discount: PropTypes.number,
};
