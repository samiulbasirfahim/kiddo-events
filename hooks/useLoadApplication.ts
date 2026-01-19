import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";

import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export function useLoadApplication() {
    async function loadApplication() {
        try {
            if (Platform.OS === "android") {
                NavigationBar.setStyle("dark");
            }

            await SplashScreen.hideAsync().catch(console.warn);
        } catch (error) {
            console.error("Error loading application:", error);
        }
    }

    useEffect(() => {
        loadApplication();
    }, []);
}
