import { Fragment } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import useStoreLocation from '../stores/useStoreLocation';

const stores = [
  {
    id: 1,
    name: 'Downtown Construction Supply',
    address: '123 Main St, Downtown',
    city: 'New York',
    state: 'NY',
    phone: '(212) 555-0123',
  },
  {
    id: 2,
    name: 'Westside Builders Depot',
    address: '456 West Ave',
    city: 'Los Angeles',
    state: 'CA',
    phone: '(310) 555-0124',
  },
  {
    id: 3,
    name: 'Midwest Materials Center',
    address: '789 Central Rd',
    city: 'Chicago',
    state: 'IL',
    phone: '(312) 555-0125',
  },
];

export default function StoreSelector({ isOpen, onClose }) {
  const { selectedStore, setSelectedStore } = useStoreLocation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                    <MapPinIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Select Your Preferred Store
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Choose the store location nearest to you for accurate product availability and pricing.
                      </p>
                    </div>
                  </div>
                </div>

                <RadioGroup value={selectedStore} onChange={setSelectedStore} className="mt-4">
                  <div className="space-y-4">
                    {stores.map((store) => (
                      <RadioGroup.Option
                        key={store.id}
                        value={store}
                        className={({ checked }) =>
                          `${checked ? 'border-blue-600 ring-2 ring-blue-600' : 'border-gray-300'}
                          relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label as="p" className="font-medium text-gray-900">
                                  {store.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description as="div" className="text-gray-500">
                                  <p>{store.address}</p>
                                  <p>{`${store.city}, ${store.state}`}</p>
                                  <p>{store.phone}</p>
                                </RadioGroup.Description>
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={onClose}
                  >
                    Confirm Selection
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