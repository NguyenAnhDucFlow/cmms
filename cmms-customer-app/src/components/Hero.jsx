import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative isolate pt-14 bg-gray-50">
      {/* Hiệu ứng nền gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Nội dung chính */}
      <div className="py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Vật Liệu Xây Dựng Cho Mọi Công Trình
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Chất lượng hàng đầu cho các nhà thầu và người đam mê DIY. Tìm mọi
              thứ bạn cần tại cửa hàng gần bạn.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-lg bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Mua Ngay
              </a>
              <a
                href="#"
                className="text-base font-semibold leading-6 text-gray-900 hover:text-blue-600"
              >
                Tìm hiểu thêm <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
