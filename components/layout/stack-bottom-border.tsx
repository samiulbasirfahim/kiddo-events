import { COLORS } from "@/constant/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export function StackBottomBorder() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerShadowVisible: false,
                headerTitleAlign: "left",
                headerTitleStyle: {
                    // fontFamily: "ZenDots-Regular",
                    fontWeight: "800",
                    fontSize: 20,
                },

                headerLeft(props) {
                    return (
                        <TouchableOpacity
                            {...(props as any)}
                            style={{
                                padding: 8,
                                paddingRight: 14,
                            }}
                            onPress={() => {
                                if (router.canGoBack()) {
                                    router.back();
                                }
                            }}
                        >
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    );
                },
            }}
        />
    );
}
