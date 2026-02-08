import { COLORS } from "@/constant/colors";
import { ArrowDown } from "lucide-react-native";
import { memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

type ScrollToBottomButtonProps = {
    visible: boolean;
    onPress: () => void;
    bottom?: number;
};

export const ScrollToBottomButton = memo(function ScrollToBottomButton({
    visible,
    onPress,
    bottom = 160,
}: ScrollToBottomButtonProps) {
    if (!visible) return null;

    return (
        <Animated.View
            entering={FadeInUp.duration(200)}
            exiting={FadeOutDown.duration(200)}
            style={[styles.container, { bottom }]}
        >
            <Pressable style={styles.button} onPress={onPress}>
                <ArrowDown size={34} color={COLORS.primary} />
            </Pressable>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        zIndex: 1,
    },
    button: {
        padding: 6,
        borderWidth: 3,
        borderColor: COLORS.primary,
        borderRadius: 9999,
        backgroundColor: COLORS.background,
    },
});
