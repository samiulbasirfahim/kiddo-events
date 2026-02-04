import { COLORS } from "@/constant/colors";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { RNText } from "./text";

type Option = {
    label: string;
    value: string;
};

type RNSelectProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    options: Option[];
    onChange?: (value: string) => void;
    errorMessage?: string;
};

export function RNSelect({
    label,
    placeholder = "Select option",
    value,
    options,
    onChange,
    errorMessage,
}: RNSelectProps) {
    const [open, setOpen] = useState(false);

    const dropdownAnim = useSharedValue(0);
    const rotate = useSharedValue(0);

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        dropdownAnim.value = withTiming(open ? 1 : 0, { duration: 180 });
        rotate.value = withTiming(open ? 1 : 0, { duration: 200 });
    }, [open]);

    function toggle() {
        Keyboard.dismiss();
        setOpen((prev) => !prev);
    }

    function handleSelect(v: string) {
        onChange?.(v);
        setOpen(false);
    }

    const arrowStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value * 180}deg` }],
    }));

    const dropdownStyle = useAnimatedStyle(() => ({
        opacity: dropdownAnim.value,
        transform: [
            {
                translateY: withTiming(dropdownAnim.value ? 6 : 0),
            },
            {
                scale: 0.95 + dropdownAnim.value * 0.05,
            },
        ],
    }));

    return (
        <View style={{ width: "100%" }}>
            {label && (
                <RNText variant="label" style={{ marginBottom: 8 }}>
                    {label}
                </RNText>
            )}

            {/* Trigger */}
            <Pressable
                onPress={toggle}
                style={[
                    styles.container,
                    {
                        borderColor: errorMessage ? "#EF4444" : COLORS.border,
                        backgroundColor: COLORS.background + "88",
                    },
                ]}
            >
                <RNText
                    style={{
                        color: selected ? COLORS.textPrimary : COLORS.textSecondary,
                        flex: 1,
                    }}
                >
                    {selected?.label || placeholder}
                </RNText>

                <Animated.View style={arrowStyle}>
                    <ChevronDown size={20} color={COLORS.textPrimary} />
                </Animated.View>
            </Pressable>

            {/* Dropdown */}
            <Animated.View
                pointerEvents={open ? "auto" : "none"}
                style={[
                    styles.dropdown,
                    dropdownStyle,
                    {
                        backgroundColor: COLORS.background + "DD",
                        borderColor: COLORS.border,
                    },
                ]}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {options.map((item) => (
                        <Pressable
                            key={item.value}
                            onPress={() => handleSelect(item.value)}
                            style={[
                                styles.option,
                                {
                                    backgroundColor:
                                        item.value === value
                                            ? COLORS.primary + "DD"
                                            : "transparent",
                                },
                            ]}
                        >
                            <RNText
                                style={{
                                    color:
                                        item.value === value
                                            ? COLORS.background
                                            : COLORS.textPrimary,
                                    fontWeight: item.value === value ? "600" : "400",
                                }}
                            >
                                {item.label}
                            </RNText>
                        </Pressable>
                    ))}
                </ScrollView>
            </Animated.View>

            {errorMessage && (
                <RNText variant="caption" style={{ color: "#EF4444", marginTop: 4 }}>
                    {errorMessage}
                </RNText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 48,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
    },

    dropdown: {
        position: "absolute",
        top: 56,
        width: "100%",
        borderWidth: 1,
        borderRadius: 12,
        maxHeight: 220,
        overflow: "hidden",
        zIndex: 999,
    },

    option: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
