import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import useStoreLocation from "../stores/useStoreLocation";
import useCart from "../stores/useCart";
import CartDrawer from "./CartDrawer";
import AccountPopover from "./AccountPopover";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Sản phẩm", href: "/products" },
  { name: "Liên hệ", href: "#" },
];

export default function Navbar({ onStoreSelect }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { selectedStore } = useStoreLocation();
  const { items } = useCart();

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <nav className="fixed w-full bg-white shadow z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                Construction Supply Co.
              </h1>
            </Link>

            {/* Menu trên desktop */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              {selectedStore && (
                <button
                  onClick={onStoreSelect}
                  className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                >
                  <span className="mr-2">📍</span>
                  {selectedStore.name}
                </button>
              )}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <AccountPopover />
            </div>

            {/* Menu trên mobile */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <AccountPopover />
              <button
                type="button"
                className="text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </a>
            ))}
            {selectedStore && (
              <button
                onClick={onStoreSelect}
                className="flex w-full items-center py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                <span className="mr-2">📍</span>
                {selectedStore.name}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer giỏ hàng */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
