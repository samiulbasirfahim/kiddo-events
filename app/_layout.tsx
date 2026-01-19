import { queryClient } from "@/queries";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthStore } from "@/stores/auth.store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useLoadApplication } from "@/hooks/useLoadApplication";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
    useLoadApplication();

    const isLoggedIn = useAuthStore((x) => x.isLoggedIn);

    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>
                <StatusBar style="dark" />
                <KeyboardProvider>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Protected guard={isLoggedIn}>
                            <Stack.Screen name="(protected)" />
                        </Stack.Protected>
                        <Stack.Protected guard={!isLoggedIn}>
                            <Stack.Screen name="(public)" />
                        </Stack.Protected>
                    </Stack>
                </KeyboardProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
