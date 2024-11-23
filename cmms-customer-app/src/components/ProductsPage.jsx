import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import useCart from '../stores/useCart';

const products = [
  {
    id: 1,
    name: 'Premium Cement Mix',
    price: 14.99,
    category: 'Building Materials',
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80&w=400',
    description: 'High-quality cement mix for construction projects.',
  },
  {
    id: 2,
    name: 'Steel Reinforcement Bars',
    price: 24.99,
    category: 'Steel & Metals',
    image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&q=80&w=400',
    description: 'Durable steel bars for structural reinforcement.',
  },
  {
    id: 3,
    name: 'Hardwood Planks',
    price: 39.99,
    category: 'Wood & Lumber',
    image: 'https://images.unsplash.com/photo-1520970977690-3cdb969a2da5?auto=format&fit=crop&q=80&w=400',
    description: 'Premium hardwood planks for flooring and construction.',
  },
];

const categories = ['All', 'Building Materials', 'Steel & Metals', 'Wood & Lumber'];
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Name: A to Z', 'Name: Z to A'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Name: A to Z');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Name: A to Z':
          return a.name.localeCompare(b.name);
        case 'Name: Z to A':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                <div className="mt-2">
                  <span className="text-blue-600 font-semibold">${product.price.toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                  onClick={() => addItem(product)}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}