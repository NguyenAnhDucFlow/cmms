import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderDetails({ order, isOpen, onClose }) {
  if (!order) return null;

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Order Details - {order.id}
                    </Dialog.Title>

                    <div className="mt-4 space-y-6">
                      {/* Order Status and Date */}
                      <div className="flex justify-between items-center">
                        <OrderStatusBadge status={order.status} />
                        <span className="text-sm text-gray-500">
                          {format(new Date(order.orderDate), "PPpp")}
                        </span>
                      </div>

                      {/* Customer Information */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900">
                          Customer Information
                        </h4>
                        <dl className="mt-2 text-sm text-gray-500">
                          <div className="mt-1">
                            <dt className="inline">Name: </dt>
                            <dd className="inline">{order.customer.name}</dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Email: </dt>
                            <dd className="inline">{order.customer.email}</dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Phone: </dt>
                            <dd className="inline">{order.customer.phone}</dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Address: </dt>
                            <dd className="inline">{order.customer.address}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Order Items */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900">
                          Order Items
                        </h4>
                        <div className="mt-2 divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <div key={item.id} className="py-3">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ${(item.quantity * item.unitPrice).toFixed(2)}
                                </span>
                              </div>
                              <div className="mt-1 text-sm text-gray-500">
                                {item.quantity} {item.unit} × $
                                {item.unitPrice.toFixed(2)}
                              </div>
                              <div className="mt-1 text-xs text-gray-500">
                                {Object.entries(item.specifications).map(
                                  ([key, value]) => (
                                    <span key={key} className="mr-3">
                                      {key}: {value}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900">
                          Payment Information
                        </h4>
                        <dl className="mt-2 text-sm">
                          <div className="flex justify-between py-1">
                            <dt className="text-gray-500">Method</dt>
                            <dd className="text-gray-900">
                              {order.payment.method}
                            </dd>
                          </div>
                          <div className="flex justify-between py-1">
                            <dt className="text-gray-500">Status</dt>
                            <dd className="text-gray-900">
                              {order.payment.status}
                            </dd>
                          </div>
                          <div className="flex justify-between py-1">
                            <dt className="text-gray-500">Subtotal</dt>
                            <dd className="text-gray-900">
                              $
                              {(
                                order.payment.total -
                                order.payment.tax -
                                order.payment.shipping
                              ).toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex justify-between py-1">
                            <dt className="text-gray-500">Tax</dt>
                            <dd className="text-gray-900">
                              ${order.payment.tax.toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex justify-between py-1">
                            <dt className="text-gray-500">Shipping</dt>
                            <dd className="text-gray-900">
                              ${order.payment.shipping.toFixed(2)}
                            </dd>
                          </div>
                          <div className="flex justify-between border-t pt-2 mt-2">
                            <dt className="font-medium text-gray-900">Total</dt>
                            <dd className="font-medium text-gray-900">
                              ${order.payment.total.toFixed(2)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Delivery Information */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900">
                          Delivery Information
                        </h4>
                        <dl className="mt-2 text-sm text-gray-500">
                          <div className="mt-1">
                            <dt className="inline">Tracking Number: </dt>
                            <dd className="inline">
                              {order.delivery.trackingNumber}
                            </dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Carrier: </dt>
                            <dd className="inline">{order.delivery.carrier}</dd>
                          </div>
                          <div className="mt-1">
                            <dt className="inline">Estimated Delivery: </dt>
                            <dd className="inline">
                              {format(
                                new Date(order.delivery.estimatedDelivery),
                                "PPp"
                              )}
                            </dd>
                          </div>
                          {order.delivery.actualDelivery && (
                            <div className="mt-1">
                              <dt className="inline">Actual Delivery: </dt>
                              <dd className="inline">
                                {format(
                                  new Date(order.delivery.actualDelivery),
                                  "PPp"
                                )}
                              </dd>
                            </div>
                          )}
                          {order.delivery.notes && (
                            <div className="mt-1">
                              <dt className="inline">Notes: </dt>
                              <dd className="inline">{order.delivery.notes}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
