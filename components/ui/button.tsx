import React, { ReactNode } from "react";
import {
    ActivityIndicator,
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
} from "react-native";
import { COLORS } from "@/constant/colors";
import { RNText, TextVariant } from "./text";

const buttonVariants = {
    default: { backgroundColor: COLORS.primary },
    secondary: { backgroundColor: COLORS.secondary },
    accent: { backgroundColor: COLORS.accent },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: COLORS.backgroundSecondary,
    },
    ghost: { backgroundColor: "transparent" },
};

const buttonSizes = {
    sm: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
    md: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
    lg: { paddingVertical: 18, paddingHorizontal: 28, borderRadius: 16 }, // "Big"
};

const textVariantMap: Record<keyof typeof buttonSizes, TextVariant> = {
    sm: "caption",
    md: "bodyBold",
    lg: "h3",
};

interface ButtonProps extends TouchableOpacityProps {
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
    fullWidth?: boolean; // New Prop
    loading?: boolean;
    children: ReactNode;
}

export function RNButton({
    variant = "default",
    size = "md",
    fullWidth = false,
    loading,
    disabled,
    children,
    style,
    ...props
}: ButtonProps) {
    const isOutline = variant === "outline" || variant === "ghost";
    const contentColor = isOutline ? COLORS.primary : COLORS.background;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled || loading}
            style={[
                styles.base,
                buttonVariants[variant],
                buttonSizes[size],
                fullWidth && { width: "100%" }, // Conditional full width
                (disabled || loading) && styles.disabled,
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={contentColor} size="small" />
            ) : (
                <RNText variant={textVariantMap[size]} style={{ color: contentColor }}>
                    {children}
                </RNText>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start", // Default to wrapping content
    },
    disabled: {
        opacity: 0.5,
    },
});
