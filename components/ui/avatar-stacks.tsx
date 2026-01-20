import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constant/colors";
import { RNText } from "@/components/ui/text";

interface AvatarStackProps {
    avatars: string[];
    totalMembers: number;
}

export function AvatarStack({ avatars, totalMembers }: AvatarStackProps) {
    const displayAvatars = avatars.slice(0, 4);
    const remainingCount = totalMembers - displayAvatars.length;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <RNText variant="h3">Friends attending</RNText>
                <RNText variant="bodySecondary">{totalMembers} memberss</RNText>
            </View>

            <View style={styles.stack}>
                {displayAvatars.map((uri, index) => (
                    <View
                        key={index}
                        style={[styles.avatarWrapper, { zIndex: 10 + index }]}
                    >
                        <Image source={{ uri }} style={styles.avatar} contentFit="cover" />
                    </View>
                ))}

                {remainingCount > 0 && (
                    <View style={[styles.badge, { zIndex: 99 + totalMembers }]}>
                        <RNText variant="bodyBold" style={{ color: COLORS.background }}>
                            +{remainingCount}
                        </RNText>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 16,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    stack: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatarWrapper: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 3,
        borderColor: COLORS.background,
        backgroundColor: COLORS.backgroundSecondary,
        marginRight: -18, // This creates the overlap
        overflow: "hidden",
    },
    avatar: {
        flex: 1,
    },
    badge: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 3,
        borderColor: COLORS.background,
        backgroundColor: COLORS.primary, // Using your primary purple
        alignItems: "center",
        justifyContent: "center",
    },
});
