import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { LucideIcon, ExternalLink } from "lucide-react-native";
import { COLORS } from "@/constant/colors";
import { RNText } from "@/components/ui/text";
import { IconContainer } from "./icon-container";

interface InfoRowProps {
    icon: LucideIcon;
    label: string;
    value: string;
    subValue?: string;
    onPressValue?: () => void;
    isExternal?: boolean;
}

export function InfoRow({
    icon: Icon,
    label,
    value,
    subValue,
    onPressValue,
    isExternal,
}: InfoRowProps) {
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginRight: 12,
                }}
            >
                <IconContainer
                    icon={Icon}
                    size={40}
                    radius={12}
                    stroke={COLORS.primary}
                />
            </View>

            <View style={styles.textContainer}>
                <RNText variant="caption" color="textSecondary">
                    {label}
                </RNText>

                <TouchableOpacity
                    disabled={!onPressValue}
                    onPress={onPressValue}
                    style={styles.valueWrapper}
                >
                    <RNText variant="bodyBold">{value}</RNText>
                    {isExternal && (
                        <ExternalLink
                            size={16}
                            color={COLORS.primary}
                            style={{ marginLeft: 6 }}
                        />
                    )}
                </TouchableOpacity>

                {subValue && (
                    <Pressable onPress={() => { }}>
                        <RNText variant="caption" color="primary">
                            {subValue}
                        </RNText>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: COLORS.backgroundSecondary, // Using your light purple/blue color
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        flex: 1,
    },
    valueWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
});
