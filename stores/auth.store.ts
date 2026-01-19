import { create } from "zustand";

type AuthStore = {
    isLoggedIn: boolean;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
}));
