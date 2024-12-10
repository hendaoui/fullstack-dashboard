import { create } from "zustand";
import { createJSONStorage, devtools } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "./auth.store";
import { persist } from "zustand/middleware";
import { createMetricsSlice, MetricsSlice } from "./metrics.store";
import { createUsersSlice, UsersSlice } from "./users.store";

export const useStore = create<AuthSlice & MetricsSlice & UsersSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createMetricsSlice(...a),
        ...createUsersSlice(...a),
      }),
      {
        name: "store-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      enabled: import.meta.env.MODE === "development",
      name: "RTA Dashboard",
    }
  )
);

