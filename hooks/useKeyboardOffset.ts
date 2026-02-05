import { Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

export const useKeyboardOffset = (hasHeader = true) => {
    const insets = useSafeAreaInsets();
    const headerHeight = hasHeader ? useHeaderHeight() : 0;

    if (hasHeader) {
        return headerHeight;
    }

    if (Platform.OS === "ios") {
        return insets.top;
    }

    return StatusBar.currentHeight || 0;
};
