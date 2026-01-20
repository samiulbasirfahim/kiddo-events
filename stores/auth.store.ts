import { router } from "expo-router";
import { create } from "zustand";

type AuthStore = {
    isLoggedIn: boolean;
    logIn: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    logIn: () => {
        router.dismissAll();
        router.replace("/(protected)");
        set({ isLoggedIn: true });
    },
}));
