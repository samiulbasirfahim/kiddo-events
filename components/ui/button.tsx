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
    link: { backgroundColor: "transparent", paddingVertical: 0 },
};

const buttonSizes = {
    sm: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 22 },
    lg: { paddingVertical: 18, paddingHorizontal: 28, borderRadius: 28 },
};

/**
 * Text config table (variant-aware)
 */
const buttonTextConfig: Record<
    keyof typeof buttonVariants,
    {
        color: string;
        variantBySize?: Record<keyof typeof buttonSizes, TextVariant>;
    }
> = {
    default: {
        color: COLORS.background,
        variantBySize: {
            sm: "caption",
            md: "bodyBold",
            lg: "h3",
        },
    },
    secondary: {
        color: COLORS.background,
        variantBySize: {
            sm: "caption",
            md: "bodyBold",
            lg: "h3",
        },
    },
    accent: {
        color: COLORS.background,
        variantBySize: {
            sm: "caption",
            md: "bodyBold",
            lg: "h3",
        },
    },
    outline: {
        color: COLORS.primary,
        variantBySize: {
            sm: "caption",
            md: "bodyBold",
            lg: "h3",
        },
    },
    ghost: {
        color: COLORS.primary,
        variantBySize: {
            sm: "caption",
            md: "bodyBold",
            lg: "h3",
        },
    },
    link: {
        color: COLORS.primary,
        variantBySize: {
            sm: "caption",
            md: "body",
            lg: "bodyBold",
        },
    },
};

interface ButtonProps extends TouchableOpacityProps {
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof buttonSizes;
    fullWidth?: boolean;
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
    const textConfig = buttonTextConfig[variant];
    const textVariant = textConfig.variantBySize?.[size] ?? "body";

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled || loading}
            style={[
                styles.base,
                buttonVariants[variant],
                buttonSizes[size],
                variant === "link" && styles.linkPaddingReset,
                fullWidth && { width: "100%" },
                (disabled || loading) && styles.disabled,
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={textConfig.color} size="small" />
            ) : (
                <RNText variant={textVariant} style={{ color: textConfig.color }}>
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
        alignSelf: "flex-start",
    },
    disabled: {
        opacity: 0.5,
    },
    linkPaddingReset: {
        paddingVertical: 0,
    },
});
