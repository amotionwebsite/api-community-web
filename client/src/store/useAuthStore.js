import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loginDemo: ({ username, email }) =>
        set({
          user: {
            username: username || email.split("@")[0],
            email,
          },
          token: "demo-jwt-token",
        }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "api-community-auth",
    }
  )
);
