import { COLORS } from "@/constant/colors";
import { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type PillIndicatorProps = {
    isFocused: boolean;
};

export function PillIndicator({ isFocused }: PillIndicatorProps) {
    const width = useSharedValue(isFocused ? 12 : 8);
    const backgroundColor = useSharedValue(
        isFocused ? COLORS.primary : COLORS.textSecondary,
    );

    const animatedStyle = useAnimatedStyle(() => ({
        width: width.value,
        height: width.value,
        borderRadius: 8,
        backgroundColor: backgroundColor.value,
    }));

    useEffect(() => {
        width.value = withTiming(isFocused ? 12 : 8, { duration: 300 });

        backgroundColor.value = withTiming(
            isFocused ? COLORS.primary : COLORS.textSecondary,
            { duration: 300 },
        );
    }, [isFocused]);

    return (
        <Animated.View
            style={[
                {
                    height: 14,
                },
                animatedStyle,
            ]}
        />
    );
}
