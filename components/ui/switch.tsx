import { COLORS } from "@/constant/colors";
import { Pressable } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from "react-native-reanimated";

type RNSwitchProps = {
    value?: boolean;
    onChange: (checked: boolean) => void;
};

export function RNSwitch({ value = false, onChange }: RNSwitchProps) {
    const toggle = () => {
        onChange(!value);
    };

    const knobStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(value ? 18 : 2),
                },
            ],
        };
    }, [value]);

    const trackStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(
                value ? COLORS.primary : COLORS.backgroundLight,
            ),
        };
    }, [value]);

    return (
        <Pressable onPress={toggle}>
            <Animated.View
                style={[
                    {
                        width: 42,
                        height: 24,
                        borderRadius: 12,
                        padding: 2,
                        justifyContent: "center",
                    },
                    trackStyle,
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: COLORS.background,
                        },
                        knobStyle,
                    ]}
                />
            </Animated.View>
        </Pressable>
    );
}
