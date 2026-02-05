import { COLORS } from "@/constant/colors";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export function AudioVisualizer({
    isRecording,
    metering,
}: {
    isRecording: boolean;
    metering: number;
}) {
    const numberOfBars = 30;
    const animatedValues = useRef(
        Array.from({ length: numberOfBars }, () => new Animated.Value(0.3)),
    ).current;

    useEffect(() => {
        if (isRecording) {
            const normalizedMetering = Math.max(0, Math.min(1, (metering + 60) / 60));
            const animations = animatedValues.map((animValue, index) => {
                const randomDelay = Math.random() * 100;
                const randomHeight = 0.3 + normalizedMetering * Math.random() * 0.7;

                return Animated.loop(
                    Animated.sequence([
                        Animated.delay(randomDelay),
                        Animated.timing(animValue, {
                            toValue: randomHeight,
                            duration: 150 + Math.random() * 100,
                            useNativeDriver: true,
                        }),
                        Animated.timing(animValue, {
                            toValue: 0.3 + Math.random() * 0.3,
                            duration: 150 + Math.random() * 100,
                            useNativeDriver: true,
                        }),
                    ]),
                );
            });

            animations.forEach((anim) => anim.start());

            return () => {
                animations.forEach((anim) => anim.stop());
            };
        } else {
            animatedValues.forEach((animValue) => {
                Animated.timing(animValue, {
                    toValue: 0.3,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            });
        }
    }, [isRecording, metering]);

    return (
        <View style={visualizerStyles.container}>
            {animatedValues.map((animValue, index) => (
                <Animated.View
                    key={index}
                    style={[
                        visualizerStyles.bar,
                        {
                            transform: [
                                {
                                    scaleY: animValue,
                                },
                            ],
                        },
                    ]}
                />
            ))}
        </View>
    );
}

const visualizerStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: 30,
        flex: 1,
    },
    bar: {
        width: 3,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
});
