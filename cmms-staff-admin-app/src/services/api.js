import axios from "../utils/axios";

export const fetchProductDetails = async ({ queryKey }) => {
  const [, productId, storeId] = queryKey;
  const response = await axios.get(`/materials/${productId}/stores/${storeId}`);
  return response.data.data;
};
