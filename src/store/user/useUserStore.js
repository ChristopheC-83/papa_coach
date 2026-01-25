import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isHydrated: false,
      isAuth: false,

      login: (userData) =>
        set({
          user: userData,
          isAuth: true,
        }),

      logout: () => {
        set({
          user: null,
          isAuth: false,
        });
        // Optionnel : localStorage.removeItem("arc_user_store")
        // Mais le set({user: null}) via persist s'en occupe déjà très bien.
      },

      setUser: (userData) =>
        set({
          user: userData,
          isAuth: Boolean(userData),
        }),

      updateUser: (newData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...newData } : null,
        })),

      // HELPERS : Très utile pour éviter les erreurs de lecture
      getUserId: () => get().user?.id || null,
      getUserRole: () => get().user?.role || "athlete",

      setHasHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "arc_user_store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);