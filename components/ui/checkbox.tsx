import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { RNText, RNTextProps } from "./text";
import { COLORS } from "@/constant/colors";

type Props = {
    label?: string;
    onChange?: (checked: boolean) => void;
    value?: boolean;
    disableExternalToggle?: boolean;
    size?: RNTextProps["size"];
    onPressLabel?: () => void;
} & ViewProps;

export function RNCheckbox({
    value,
    onChange,
    label,
    style,
    size = "md",
    disableExternalToggle,
    onPressLabel,
}: Props) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        if (typeof value === "boolean") {
            setIsChecked(value);
        }
    }, [value]);

    const toggleCheckbox = () => {
        if (disableExternalToggle) return;

        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    const checkBoxSize = size === "sm" ? 16 : size === "lg" ? 22 : 20;

    return (
        <View style={[sts.container, style]}>
            <Pressable
                onPress={toggleCheckbox}
                style={[
                    sts.checkbox,
                    {
                        width: checkBoxSize,
                        height: checkBoxSize,
                        borderRadius: 6, // shadcn square
                        backgroundColor: isChecked
                            ? COLORS.primary
                            : COLORS.background,
                        borderColor: isChecked
                            ? COLORS.primary
                            : COLORS.border,
                    },
                ]}
            >
                {isChecked && (
                    <Entypo
                        name="check"
                        size={checkBoxSize - 4}
                        color={COLORS.background}
                    />
                )}
            </Pressable>

            {label && (
                <RNText
                    variant="secondary"
                    size={size}
                    onPress={onPressLabel ?? toggleCheckbox}
                    style={sts.label}
                >
                    {label}
                </RNText>
            )}
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        flexShrink: 1,
    },
});
