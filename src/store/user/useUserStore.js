import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      isAuth: false,

      login: (userData) =>
        set({
          user: userData,
          isAuth: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuth: false,
        }),

      setUser: (userData) =>
        set({
          user: userData,
          isAuth: !!userData, 
        }),

      setHasHydrated: (state) => set({ isHydrated: state }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: "arc_user_store",
      onRehydrateStorage: () => (bool) => {
        bool.setHasHydrated(true);
      },
    },
  ),
);
