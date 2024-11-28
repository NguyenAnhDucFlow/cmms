import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import video from "../../assets/856350-hd_1920_1080_30fps.mp4";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Xây Dựng Tương Lai
            <br />
            <span className="text-blue-400">Với Chất Lượng Hàng Đầu</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Cung cấp vật liệu xây dựng chất lượng cao với dịch vụ chuyên nghiệp
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">Khám Phá Ngay</span>
            <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDownIcon className="h-8 w-8 text-white/80" />
        </motion.div>
      </div>
    </div>
  );
}
