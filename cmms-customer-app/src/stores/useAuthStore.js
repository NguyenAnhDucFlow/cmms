import { create } from 'zustand';
import { auth } from '../config/firebase';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  signOut: async () => {
    await auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;