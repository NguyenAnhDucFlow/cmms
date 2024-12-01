import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

export default function OrderFilters({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onFilterChange({ searchQuery: value, status: selectedStatus, dateRange });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onFilterChange({ searchQuery, status: value, dateRange });
  };

  const handleDateChange = (field, value) => {
    const newDateRange = { ...dateRange, [field]: value };
    setDateRange(newDateRange);
    onFilterChange({
      searchQuery,
      status: selectedStatus,
      dateRange: newDateRange,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search orders..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-48">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            {Object.values(ORDER_STATUS).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => handleDateChange("from", e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-500 self-center">to</span>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => handleDateChange("to", e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
