import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,

      setUser: (userData) => set({ user: userData }),

      setHasHydrated: (state) => set({ isHydrated: state }),

      clearUser: () => set({ user: null }),

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "arc_user_store", 
      onRehydrateStorage: () => (bool) => {
        bool.setHasHydrated(true);
      },
    }
  )
);
