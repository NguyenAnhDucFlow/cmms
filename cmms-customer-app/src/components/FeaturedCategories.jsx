import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Cát",
    image: "https://nhamaysatthep.vn/wp-content/uploads/2020/10/fsffdtre.jpg",
    href: "/products?category=cat",
  },
  {
    id: 2,
    name: "Gạch",
    image: "https://lbm-vn.vn/wp-content/uploads/2018/11/Gach-tuynen.png",
    href: "/products?category=gach",
  },
  {
    id: 3,
    name: "Kính",
    image: "http://antoanglass.com/wp-content/uploads/2020/04/unnamed.jpg",
    href: "/products?category=kinh",
  },
  {
    id: 4,
    name: "Ống nước",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.TBK06dBqAdxpTsugijK9XgHaEZ&pid=Api&P=0&h=220",
    href: "/products?category=ongnuoc",
  },
  {
    id: 5,
    name: "Thép",
    image:
      "https://vatlieuxaydung.org.vn/Upload/48/Nam_2019/Thang_3/Ngay_4/vlxd.org_thep.jpg",
    href: "/products?category=thep",
  },
  {
    id: 6,
    name: "Vữa",
    image:
      "https://vatlieuxaydung.org.vn/Upload/48/Nam_2021/Thang_12/Ngay_1/vlxd_org_vua.jpg",
    href: "/products?category=vua",
  },
  {
    id: 7,
    name: "Thiết bị vệ sinh",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.dxa0frdFGQBaIbKZQtZmuQHaHa&pid=Api&P=0&h=220",
    href: "/products?category=thietbivesinh",
  },
  {
    id: 8,
    name: "Sơn và Hóa chất",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.yq1nylPViu4aSQKMLipUpwHaE8&pid=Api&P=0&h=220",
    href: "/products?category=son-hoachat",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Mua sắm theo danh mục
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="aspect-h-3 aspect-w-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
