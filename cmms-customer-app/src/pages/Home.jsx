import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const featuredCategories = [
  {
    name: 'Building Materials',
    description: 'Cement, bricks, blocks, and structural materials',
    image: 'https://images.unsplash.com/photo-1590674899484-10c4a45a48c1?auto=format&fit=crop&q=80&w=400&h=300',
    href: '/products?category=building-materials',
  },
  {
    name: 'Tools & Equipment',
    description: 'Power tools, hand tools, and construction equipment',
    image: 'https://images.unsplash.com/photo-1581147036324-c1c88bb6eb4e?auto=format&fit=crop&q=80&w=400&h=300',
    href: '/products?category=tools-equipment',
  },
  {
    name: 'Plumbing',
    description: 'Pipes, fittings, and plumbing supplies',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=400&h=300',
    href: '/products?category=plumbing',
  },
  {
    name: 'Electrical',
    description: 'Wiring, fixtures, and electrical components',
    image: 'https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&q=80&w=400&h=300',
    href: '/products?category=electrical',
  },
];

const features = [
  {
    name: 'Professional Support',
    description: 'Expert advice and support for your construction projects',
  },
  {
    name: 'Fast Delivery',
    description: 'Quick and reliable delivery to your construction site',
  },
  {
    name: 'Quality Products',
    description: 'High-quality materials from trusted manufacturers',
  },
  {
    name: 'Bulk Orders',
    description: 'Special pricing and support for large orders',
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BuildMart - Your Construction Materials Marketplace</title>
        <meta name="description" content="Quality construction materials, tools, and supplies for professionals and DIY enthusiasts." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Build Better with BuildMart
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Your one-stop shop for quality construction materials, tools, and supplies. 
                  Professional support for every project, big or small.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/products"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/contact"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Contact Sales <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Categories</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our wide range of construction materials and supplies
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img src={category.image} alt={category.name} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose BuildMart?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're committed to providing the best service and materials for your construction needs
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}