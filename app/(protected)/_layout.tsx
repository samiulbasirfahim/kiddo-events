import { Slot, Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "ios_from_right",
            }}
        ></Stack>
    );
}
