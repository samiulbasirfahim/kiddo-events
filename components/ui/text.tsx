import { ReactNode } from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { COLORS } from "@/constant/colors";

const typography = StyleSheet.create({
    h1: {
        fontSize: 36,
        lineHeight: 40,
        fontWeight: "800",
        color: COLORS.textPrimary,
    },
    h2: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    h3: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: "600",
        color: COLORS.textPrimary,
    },

    body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "400",
        color: COLORS.textPrimary,
    },
    bodyBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    bodySecondary: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "400",
        color: COLORS.textSecondary,
    },

    primary: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "700",
        color: COLORS.primary,
    },
    accent: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "500",
        color: COLORS.accent,
    },
    caption: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: "400",
        color: COLORS.textSecondary,
    },
    label: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        color: COLORS.textSecondary,
    },
});

export type TextVariant = keyof typeof typography;

export type RNTextProps = TextProps & {
    variant?: TextVariant;
    children: ReactNode;
    color?: keyof typeof COLORS; // Optional override
};

export function RNText({
    variant = "body",
    children,
    style,
    color,
    ...props
}: RNTextProps) {
    return (
        <Text
            style={[
                typography[variant],
                color ? { color: COLORS[color] } : null,
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
}
