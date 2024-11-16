import { useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';
import { auth } from '../config/firebase';

export function useAuth() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return auth;
}