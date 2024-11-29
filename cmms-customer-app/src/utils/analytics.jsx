import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

mixpanel.init(MIXPANEL_TOKEN);

export const trackPaymentSuccess = (transactionData) => {
  mixpanel.track("Payment Success", {
    amount: transactionData.amount,
    transactionId: transactionData.transactionId,
    paymentMethod: transactionData.paymentMethod,
    timestamp: new Date().toISOString(),
  });
};

export const trackPaymentFailure = (errorData) => {
  mixpanel.track("Payment Failure", {
    reason: errorData.reason,
    errorCode: errorData.errorCode,
    timestamp: new Date().toISOString(),
  });
};
