import { StateCreator } from "zustand";

type State = {
  email: string;
  role: string;
  department: string;
  token: string;
  isAuthenticated: boolean;
};

const InitialState = {
  email: "",
  role: "",
  department: "",
  token: "",
  isAuthenticated: false
};

export interface AuthSlice {
  email: string;
  role: string;
  department: string;
  token: string;
  isAuthenticated: boolean;
  setAuthState: (updates: Partial<State>) => void;
  resetAuth: () => void;
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [["zustand/devtools", never]],
  [],
  AuthSlice
> = (set) => ({
  ...InitialState,
  setAuthState: (updates) =>
    set((state) => ({ ...state, ...updates }), false, "setAuthState"),
  resetAuth: () => set(InitialState),
});
