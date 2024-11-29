export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getErrorMessage = (errorCode) => {
  const errorMessages = {
    PAYMENT_CANCELLED: "Payment was cancelled by the user",
    INSUFFICIENT_FUNDS: "Insufficient funds in the account",
    PAYMENT_DECLINED: "Payment was declined by the bank",
    TECHNICAL_ERROR: "Technical error occurred during payment processing",
    DEFAULT: "An unexpected error occurred",
  };

  return errorMessages[errorCode] || errorMessages.DEFAULT;
};
