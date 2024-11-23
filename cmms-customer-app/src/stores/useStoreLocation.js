import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreLocation = create(
  persist(
    (set) => ({
      selectedStore: null,
      setSelectedStore: (store) => set({ selectedStore: store }),
    }),
    {
      name: 'store-location',
    }
  )
);

export default useStoreLocation;