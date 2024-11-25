import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      orders: [],
      activeOrderId: null,

      // Initialize store with default order
      initializeStore: () => {
        const { orders, activeOrderId } = get();
        if (orders.length === 0) {
          const defaultOrder = {
            id: Date.now(),
            items: [],
            isDelivery: false,
            deliveryDetails: {},
            total: 0,
            customerInfo: null,
            footerTabKey: "1", // Default to regular sale
          };
          set({
            orders: [defaultOrder],
            activeOrderId: defaultOrder.id,
          });
        }
      },

      // Order management
      addOrder: () =>
        set((state) => {
          const newOrder = {
            id: Date.now(),
            items: [],
            isDelivery: false,
            deliveryDetails: {},
            total: 0,
            customerInfo: null,
            footerTabKey: "1",
          };
          return {
            orders: [...state.orders, newOrder],
            activeOrderId: newOrder.id,
          };
        }),

      removeOrder: (orderId) =>
        set((state) => {
          // Prevent removing the last order
          if (state.orders.length <= 1) {
            return state;
          }

          const newOrders = state.orders.filter(
            (order) => order.id !== orderId
          );
          return {
            orders: newOrders,
            activeOrderId:
              state.activeOrderId === orderId
                ? newOrders[0].id
                : state.activeOrderId,
          };
        }),

      setActiveOrder: (orderId) => set({ activeOrderId: orderId }),

      // Footer tab management
      setOrderFooterTab: (orderId, tabKey) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, footerTabKey: tabKey } : order
          ),
        })),

      // Item management
      addItemToOrder: (item) =>
        set((state) => {
          const orders = state.orders.map((order) => {
            if (order.id === state.activeOrderId) {
              const existingItemIndex = order.items.findIndex(
                (i) => i.materialCode === item.materialCode
              );
              let items;

              if (existingItemIndex >= 0) {
                items = order.items.map((i, index) =>
                  index === existingItemIndex
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                );
              } else {
                items = [...order.items, { ...item, quantity: 1 }];
              }

              return {
                ...order,
                items,
                total: items.reduce(
                  (sum, i) => sum + i.salePrice * i.quantity,
                  0
                ),
              };
            }
            return order;
          });
          return { orders };
        }),

      updateItemQuantity: (materialCode, quantity) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? {
                  ...order,
                  items: order.items.map((item) =>
                    item.materialCode === materialCode
                      ? { ...item, quantity }
                      : item
                  ),
                  total: order.items.reduce(
                    (sum, item) =>
                      sum +
                      item.salePrice *
                        (item.materialCode === materialCode
                          ? quantity
                          : item.quantity),
                    0
                  ),
                }
              : order
          ),
        })),

      removeItem: (materialCode) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? {
                  ...order,
                  items: order.items.filter(
                    (item) => item.materialCode !== materialCode
                  ),
                  total: order.items
                    .filter((item) => item.materialCode !== materialCode)
                    .reduce(
                      (sum, item) => sum + item.salePrice * item.quantity,
                      0
                    ),
                }
              : order
          ),
        })),

      // Delivery management
      setDeliveryDetails: (details) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? { ...order, deliveryDetails: details }
              : order
          ),
        })),

      toggleDeliveryMode: () =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? {
                  ...order,
                  isDelivery: !order.isDelivery,
                  footerTabKey: order.isDelivery ? "1" : "2", // Switch tab based on delivery mode
                }
              : order
          ),
        })),

      // Customer management
      setCustomerInfo: (customerInfo) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? { ...order, customerInfo }
              : order
          ),
        })),

      updateCustomerInfo: (field, value) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === state.activeOrderId
              ? {
                  ...order,
                  customerInfo: {
                    ...order.customerInfo,
                    [field]: value, // Cập nhật field cụ thể
                  },
                }
              : order
          ),
        })),
    }),
    {
      name: "pos-storage", // Storage key
      version: 1, // Version number for migrations
    }
  )
);

export default useStore;
