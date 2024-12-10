import { StateCreator } from "zustand";

type User = {
  id: string;
  email: string;
  role: string;
  department: string;
  password: string;
};

const InitialState = {
  users: [] as User[]
};

export interface UsersSlice {
  users: User[];
  setUsers: (users: User[]) => void;
  resetUsers: () => void;
}

export const createUsersSlice: StateCreator<
  UsersSlice,
  [["zustand/devtools", never]],
  [],
  UsersSlice
> = (set) => ({
  ...InitialState,
  setUsers: (users) => set({ users }, false, "setUsers"),
  resetUsers: () => set(InitialState),
});