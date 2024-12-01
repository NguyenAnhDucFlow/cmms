import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
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

const statusStyles = {
  [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [ORDER_STATUS.PROCESSING]: "bg-blue-100 text-blue-800",
  [ORDER_STATUS.SHIPPED]: "bg-purple-100 text-purple-800",
  [ORDER_STATUS.DELIVERED]: "bg-green-100 text-green-800",
  [ORDER_STATUS.CANCELLED]: "bg-red-100 text-red-800",
};

export default function OrderStatusBadge({ status }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </motion.span>
  );
}

OrderStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ORDER_STATUS)).isRequired,
};
