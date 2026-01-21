import { COLORS } from "@/constant/colors";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    Pressable,
} from "react-native";
import { RNText } from "./text";

type Props = {
    label?: string;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    iconSize?: number;
    marginTop?: number;
    iconColor?: string;
    errorMessage?: string;
} & TextInputProps;

export function RNInput({
    label,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    iconSize = 20,
    iconColor = COLORS.textPrimary,
    marginTop,
    errorMessage,
    style,
    ...props
}: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ width: "100%", marginTop: marginTop || 0 }}>
            {label && label?.length > 0 && (
                <RNText
                    variant="body"
                    style={{
                        marginBottom: 5,
                    }}
                >
                    {label}
                </RNText>
            )}
            <View style={sts.container}>
                {LeftIcon && (
                    <View style={sts.iconLeft}>
                        <LeftIcon size={iconSize} color={iconColor} />
                    </View>
                )}

                <TextInput
                    {...props}
                    style={[
                        sts.input,
                        LeftIcon && sts.inputWithLeftIcon,
                        RightIcon && sts.inputWithRightIcon,
                        style,
                    ]}
                    secureTextEntry={props.secureTextEntry && !showPassword}
                    placeholderTextColor={COLORS.textSecondary}
                />

                {props.secureTextEntry && (
                    <Pressable
                        style={sts.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff size={iconSize} color={iconColor} />
                        ) : (
                            <Eye size={iconSize} color={iconColor} />
                        )}
                    </Pressable>
                )}

                {RightIcon && (
                    <Pressable style={sts.iconRight}>
                        <RightIcon size={iconSize} color={iconColor} />
                    </Pressable>
                )}
            </View>

            {errorMessage && errorMessage.length > 0 && (
                <RNText variant="caption" style={{ color: COLORS.error, marginTop: 4 }}>
                    {errorMessage}
                </RNText>
            )}
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        backgroundColor: COLORS.backgroundLight,
    },

    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 16,
        color: COLORS.textPrimary,
    },

    inputWithLeftIcon: {
        paddingLeft: 44,
    },

    inputWithRightIcon: {
        paddingRight: 44,
    },

    iconLeft: {
        position: "absolute",
        left: 12,
        zIndex: 1,
    },

    iconRight: {
        position: "absolute",
        right: 12,
        zIndex: 1,
    },
});
