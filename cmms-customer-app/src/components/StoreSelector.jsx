import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import useStoreLocation from "../stores/useStoreLocation";
import axios from "../utils/axios";

export default function StoreSelector({ isOpen, onClose }) {
  const { selectedStore, setSelectedStore } = useStoreLocation();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/stores");
        setStores(response.data.data);
      } catch (err) {
        setError("Không thể tải danh sách cửa hàng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchStores();
    }
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (selectedStore) {
            onClose();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <MapPinIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Chọn Cửa Hàng Bạn Muốn
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Vui lòng chọn cửa hàng gần nhất để đảm bảo thông tin sản
                        phẩm và giá chính xác.
                      </p>
                    </div>
                  </div>
                </div>

                {loading ? (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Đang tải danh sách cửa hàng...
                  </div>
                ) : error ? (
                  <div className="mt-4 text-center text-sm text-red-500">
                    {error}
                  </div>
                ) : (
                  <RadioGroup
                    value={selectedStore}
                    onChange={setSelectedStore}
                    className="mt-4"
                  >
                    <div className="space-y-4">
                      {stores.map((store) => (
                        <RadioGroup.Option
                          key={store.id}
                          value={store}
                          className={({ checked }) =>
                            `${
                              checked
                                ? "border-blue-600 ring-2 ring-blue-600"
                                : "border-gray-300"
                            }
                            relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className="font-medium text-gray-900"
                                  >
                                    {store.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="div"
                                    className="text-gray-500"
                                  >
                                    <p>{store.address}</p>
                                    {/* <p>{`${store?.city}, ${store?.state}`}</p> */}
                                    {/* <p>{store?.phone}</p> */}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                      selectedStore
                        ? "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                    }`}
                    onClick={() => {
                      if (selectedStore) {
                        onClose();
                      }
                    }}
                    disabled={!selectedStore}
                  >
                    Xác Nhận Lựa Chọn
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
