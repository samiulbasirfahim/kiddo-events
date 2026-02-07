import { COLORS } from "@/constant/colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export function AudioVisualizer({
    isRecording,
    metering,
    usePrimaryBg = false,
}: {
    isRecording: boolean;
    metering: number;
    usePrimaryBg?: boolean;
}) {
    const [numberOfBars, setNumberOfBars] = useState(0);
    const [barHeights, setBarHeights] = useState<number[]>([]);
    const isInitialized = useRef(false);
    const meteringQueue = useRef<number[]>([]);

    // Initialize bar heights when numberOfBars is set
    useEffect(() => {
        if (numberOfBars > 0 && barHeights.length !== numberOfBars) {
            setBarHeights(Array(numberOfBars).fill(0.1));
        }
    }, [numberOfBars, barHeights.length]);

    useEffect(() => {
        if (!isRecording || numberOfBars === 0) {
            meteringQueue.current = [];
            return;
        }

        if (metering !== undefined && !isNaN(metering)) {
            meteringQueue.current.push(metering);
            // Keep only last 5 values
            if (meteringQueue.current.length > 5) {
                meteringQueue.current.shift();
            }
        }

        const interval = setInterval(() => {
            if (meteringQueue.current.length === 0) return;

            // Average the queued values for smoother result
            const avgMetering =
                meteringQueue.current.reduce((a, b) => a + b, 0) /
                meteringQueue.current.length;
            meteringQueue.current = [];

            // Normalize metering value from -30 to 0 range to 0 to 1
            const clampedMetering = Math.max(-30, Math.min(0, avgMetering));
            const normalizedMetering = (clampedMetering + 30) / 30;

            // Apply a stronger curve to make it even less sensitive
            const curvedMetering = Math.pow(normalizedMetering, 2);

            const baseHeight = 0.15;
            const meteringHeight = curvedMetering * 0.65;
            const randomVariation = (Math.random() - 0.5) * 0.08;
            const newHeight = Math.max(
                0.15,
                Math.min(0.85, baseHeight + meteringHeight + randomVariation),
            );

            // Shift all bars to the left and add new bar on the right
            setBarHeights((prev) => {
                if (prev.length === 0) return prev;
                const updated = [...prev];
                updated.shift();
                updated.push(newHeight);
                return updated;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [isRecording, metering, numberOfBars]);

    const handleLayout = useCallback(
        (event: LayoutChangeEvent) => {
            const containerWidth = event.nativeEvent.layout.width;
            const barWidth = 3;
            const gap = 2;
            const barWithGap = barWidth + gap;
            const calculatedBars = Math.floor((containerWidth + gap) / barWithGap);
            const newBarCount = Math.max(20, calculatedBars);

            // Always set the bar count on first layout or when it changes
            if (!isInitialized.current) {
                setNumberOfBars(newBarCount);
                isInitialized.current = true;
            } else if (newBarCount !== numberOfBars) {
                setNumberOfBars(newBarCount);
                setBarHeights((prev) => {
                    if (newBarCount > prev.length) {
                        return [
                            ...Array(newBarCount - prev.length).fill(0.1),
                            ...prev,
                        ];
                    } else if (newBarCount < prev.length) {
                        return prev.slice(prev.length - newBarCount);
                    }
                    return prev;
                });
            }
        },
        [numberOfBars],
    );

    return (
        <View
            style={[
                visualizerStyles.container,
                {
                    backgroundColor: usePrimaryBg
                        ? COLORS.primary + "40"
                        : COLORS.background + "40",
                },
            ]}
        >
            <View style={visualizerStyles.barsContainer} onLayout={handleLayout}>
                {numberOfBars > 0 &&
                    barHeights.length === numberOfBars &&
                    barHeights.map((height, index) => (
                        <AudioBar
                            key={index}
                            isRecording={isRecording}
                            targetHeight={height}
                        />
                    ))}
            </View>
        </View>
    );
}

function AudioBar({
    isRecording,
    targetHeight,
}: {
    isRecording: boolean;
    targetHeight: number;
}) {
    const scale = useSharedValue(targetHeight);

    useEffect(() => {
        if (isRecording) {
            scale.value = withSpring(targetHeight, {
                damping: 10,
                stiffness: 120,
                mass: 0.3,
            });
        } else {
            scale.value = withSpring(0.1, {
                damping: 15,
                stiffness: 120,
            });
        }
    }, [isRecording, targetHeight, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: scale.value }],
    }));

    return <Animated.View style={[visualizerStyles.bar, animatedStyle]} />;
}

const visualizerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    barsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: 30,
        width: "100%",
    },
    bar: {
        width: 3,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
});


