import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

export default function AccountPopover() {
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Đơn hàng của tôi", href: "/my-orders" },
    { name: "Cài đặt tài khoản", href: "#" },
    { name: "Địa chỉ đã lưu", href: "#" },
  ];
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none">
        <UserIcon className="h-6 w-6" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white p-6">
              {isAuthenticated ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900">
                      Xin chào,
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  <div className="space-y-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-sm text-gray-700 hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <button
                      onClick={logout}
                      className="text-sm text-gray-700 hover:text-blue-600"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500"
                  >
                    Đăng nhập
                  </Link>
                  <p className="text-center text-sm text-gray-500">
                    Khách hàng mới?{" "}
                    <Link to="#" className="text-blue-600 hover:text-blue-500">
                      Tạo tài khoản
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
