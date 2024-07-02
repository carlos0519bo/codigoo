import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  name: string | null;
  access_token: string | null;
};

type actions = {
  login: (name: string, access_token: string) => void;
  logout: () => void;
};

export const authStore = createStore<Store & actions>()(
  persist(
    (set) => ({
      name: '',
      access_token: '',
      login: (name: string, access_token: string) => set({ name, access_token }),
      logout: () => set({ name: null, access_token: null }),
    }),
    {
      name: 'session',
    }
  )
);

export const useAuth = () => useStore(authStore)