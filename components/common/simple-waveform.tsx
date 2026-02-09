import { COLORS } from "@/constant/colors";
import { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type SimpleWaveformProps = {
    isActive: boolean;
    color?: string;
    barCount?: number;
};

export const SimpleWaveform = memo(function SimpleWaveform({
    isActive,
    color = COLORS.primary,
    barCount = 12,
}: SimpleWaveformProps) {
    const bars = Array.from({ length: barCount }, (_, i) => i);

    return (
        <View style={styles.container}>
            {bars.map((index) => (
                <WaveBar key={index} isActive={isActive} index={index} color={color} />
            ))}
        </View>
    );
});

const WaveBar = memo(function WaveBar({
    isActive,
    index,
    color,
}: {
    isActive: boolean;
    index: number;
    color: string;
}) {
    const height = useSharedValue(4);

    useEffect(() => {
        if (isActive) {
            const minHeight = 4;
            const maxHeight = 20;
            const randomDelay = index * 50;

            setTimeout(() => {
                height.value = withRepeat(
                    withTiming(minHeight + Math.random() * (maxHeight - minHeight), {
                        duration: 300 + Math.random() * 400,
                    }),
                    -1,
                    true,
                );
            }, randomDelay);
        } else {
            cancelAnimation(height);
            height.value = withTiming(4, { duration: 200 });
        }
    }, [isActive, index]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
    }));

    return <Animated.View style={[styles.bar, animatedStyle, { backgroundColor: color }]} />;
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: 30,
        flex: 1,
    },
    bar: {
        width: 4,
        borderRadius: 1,
    },
});
