import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import OrderDetails from "../components/orders/OrderDetails";
import ExportMenu from "../components/orders/ExportMenu";

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const PAYMENT_METHODS = {
  COD: "Cash on Delivery",
  BANK_TRANSFER: "Bank Transfer",
  CREDIT_CARD: "Credit Card",
};

export const mockOrders = [
  {
    id: "ORD-2023-001",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      address: "123 Construction Ave, Builder City, BC 12345",
    },
    orderDate: "2023-12-01T08:30:00Z",
    status: ORDER_STATUS.DELIVERED,
    items: [
      {
        id: "PROD-001",
        name: "Portland Cement",
        quantity: 50,
        unit: "bags",
        unitPrice: 12.99,
        specifications: {
          type: "Type I/II",
          weight: "94 lbs",
          brand: "BuilderPro",
        },
      },
      {
        id: "PROD-002",
        name: "Steel Rebar #4",
        quantity: 100,
        unit: "pieces",
        unitPrice: 8.5,
        specifications: {
          diameter: "1/2 inch",
          length: "20 feet",
          grade: "Grade 60",
        },
      },
    ],
    payment: {
      method: PAYMENT_METHODS.BANK_TRANSFER,
      status: PAYMENT_STATUS.PAID,
      total: 1499.5,
      tax: 149.95,
      shipping: 75.0,
    },
    delivery: {
      trackingNumber: "TRK123456789",
      carrier: "Construction Express",
      estimatedDelivery: "2023-12-05T14:00:00Z",
      actualDelivery: "2023-12-05T13:45:00Z",
      notes: "Delivered to construction site entrance",
    },
  },
  {
    id: "ORD-2023-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      address: "456 Builder Lane, Construction Heights, CH 67890",
    },
    orderDate: "2023-12-02T10:15:00Z",
    status: ORDER_STATUS.PROCESSING,
    items: [
      {
        id: "PROD-003",
        name: "Concrete Mix",
        quantity: 20,
        unit: "bags",
        unitPrice: 15.99,
        specifications: {
          type: "High-Strength",
          weight: "80 lbs",
          brand: "MasterBuild",
        },
      },
    ],
    payment: {
      method: PAYMENT_METHODS.COD,
      status: PAYMENT_STATUS.PENDING,
      total: 319.8,
      tax: 31.98,
      shipping: 45.0,
    },
    delivery: {
      trackingNumber: "TRK987654321",
      carrier: "Construction Express",
      estimatedDelivery: "2023-12-07T14:00:00Z",
      notes: "Call customer before delivery",
    },
  },
];

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    dateRange: { from: "", to: "" },
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // Status filter
      if (filters.status !== "all" && order.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesSearch =
          order.id.toLowerCase().includes(searchLower) ||
          order.customer.name.toLowerCase().includes(searchLower) ||
          order.customer.email.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Date range filter
      if (filters.dateRange.from) {
        const orderDate = new Date(order.orderDate);
        const fromDate = new Date(filters.dateRange.from);
        if (orderDate < fromDate) return false;
      }
      if (filters.dateRange.to) {
        const orderDate = new Date(order.orderDate);
        const toDate = new Date(filters.dateRange.to);
        if (orderDate > toDate) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <ExportMenu
              orders={filteredOrders}
              selectedOrders={selectedOrders.length > 0 ? selectedOrders : null}
            />
          </div>

          <OrderFilters onFilterChange={setFilters} />
          <OrderTable
            orders={filteredOrders}
            onOrderClick={setSelectedOrder}
            selectedOrders={selectedOrders}
            onOrderSelect={(orders) => setSelectedOrders(orders)}
          />
        </motion.div>

        <OrderDetails
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </div>
    </div>
  );
}
