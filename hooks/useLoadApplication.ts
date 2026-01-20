import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";

import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export function useLoadApplication() {
    const [fontLoaded] = useFonts({
        "ZenDots-Regular": require("../assets/fonts/ZenDots-Regular.ttf"),
    });

    const [isAppReady, setAppReady] = useState(false);

    async function loadApplication() {
        try {
            if (Platform.OS === "android") {
                NavigationBar.setStyle("dark");
            }

            setAppReady(true);
        } catch (error) {
            console.error("Error loading application:", error);
        }
    }

    useEffect(() => {
        loadApplication();
    }, []);

    useEffect(() => {
        async function hideSplashScreen() {
            if (isAppReady && fontLoaded) {
                await SplashScreen.hideAsync();
            }
        }

        hideSplashScreen();
    }, [isAppReady, fontLoaded]);

    return { isAppReady, fontLoaded };
}
