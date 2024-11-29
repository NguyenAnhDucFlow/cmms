import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const offers = [
  {
    id: 1,
    title: "Giảm giá khi đặt hàng số lượng lớn",
    description: "Tiết kiệm lên đến 20% cho đơn hàng trên 5000 USD",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&q=80&w=500",
    href: "/bulk-orders",
  },
  {
    id: 2,
    title: "Ưu đãi đặc biệt cho nhà thầu",
    description: "Giá ưu đãi dành riêng cho các nhà thầu có giấy phép",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&q=80&w=500",
    href: "/contractor-program",
  },
];

export default function SpecialOffers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Ưu đãi đặc biệt
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-48 w-full object-cover lg:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {offer.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {offer.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Tìm hiểu thêm
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
