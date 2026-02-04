import { COLORS } from "@/constant/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Modal() {
    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                flex: 1,
            }}
        >
            <Stack.Screen
                options={{
                    presentation: "formSheet",
                    sheetAllowedDetents: [0.34, 1],
                    sheetCornerRadius: 28,
                }}
            />
        </View>
    );
}
