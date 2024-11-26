import { motion } from "framer-motion";
import {
  TruckIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Giao hàng trong ngày",
    description:
      "Nhận vật liệu xây dựng ngay tại công trình của bạn trong ngày.",
    icon: TruckIcon,
  },
  {
    name: "Nhiều chi nhánh",
    description:
      "Hệ thống cửa hàng trên toàn quốc giúp bạn dễ dàng tìm địa điểm gần nhất.",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Giá cả cạnh tranh",
    description:
      "Mức giá tốt nhất cho mọi nhu cầu về vật liệu xây dựng của bạn.",
    icon: CurrencyDollarIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Tại sao chọn chúng tôi
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tất cả những gì bạn cần cho dự án xây dựng
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chúng tôi mang đến sự tiện lợi, nhanh chóng và giá trị vượt trội để
            giúp bạn hoàn thành công việc một cách dễ dàng.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon
                    className="h-8 w-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
