import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Landmark 81",
    location: "TP. Hồ Chí Minh",
    image:
      "https://static.wixstatic.com/media/31d75b_f9e6c2376cba40ce945e0e6f33798cbb~mv2.jpg/v1/fill/w_1400,h_716,al_c,q_85/5d753392038811.5e417a7e2fc04.jpg",
    description: "Tòa nhà cao nhất Việt Nam với thiết kế hiện đại",
  },
  {
    id: 2,
    title: "Sun Grand City",
    location: "Hà Nội",
    image:
      "https://duansungroup.vn/upimages/articles/chung-cu-58-tay-ho/sun-grand-city-quang-an-residence.jpg",
    description: "Khu đô thị phức hợp đẳng cấp",
  },
  {
    id: 3,
    title: "Vinhomes Ocean Park",
    location: "Hà Nội",
    image:
      "https://gcp-cdn.vinhomes.vn/cms-data/styles/images_1440_x_680/public/2021_10/VHOCP%2010_1634553680.jpeg?itok=2NGrWZ7V",
    description: "Đại đô thị đẳng cấp quốc tế",
  },
];

export default function FeaturedProjects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="py-16 bg-gray-900 text-white overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold sm:text-4xl mb-4"
          >
            Dự Án Tiêu Biểu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Khám phá những công trình đẳng cấp sử dụng vật liệu của chúng tôi
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {project.location}
                  </p>
                  <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
