import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function ProductReviews({ reviews }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Đánh giá từ khách hàng
      </h2>

      <div className="space-y-8">
        <AnimatePresence>
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-8"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    {review.userName}
                  </h4>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${
                          review.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-200"
                        } h-4 w-4 flex-shrink-0`}
                      />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {format(new Date(review.date), "dd MMMM yyyy", {
                    locale: vi,
                  })}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex space-x-4">
                  {review.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Review image ${idx + 1}`}
                      className="h-10 w-10 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {reviews.length > 3 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-8 text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAllReviews
            ? "Thu gọn"
            : `Xem thêm ${reviews.length - 3} đánh giá`}
        </motion.button>
      )}
    </section>
  );
}
