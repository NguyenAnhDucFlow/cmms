import { formatCurrency, formatDate } from "../../utils/paymentHelpers";

export default function TransactionDetails({ transaction }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Transaction Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-medium">{transaction.transactionId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium">
            {formatCurrency(transaction.amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Date</span>
          <span className="font-medium">{formatDate(transaction.date)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">{transaction.paymentMethod}</span>
        </div>
      </div>
    </div>
  );
}
