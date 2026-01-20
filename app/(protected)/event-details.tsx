import React from "react";
import {
    StyleSheet,
    useWindowDimensions,
    View,
    ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Globe,
    Heart,
    MapPin,
    MessageSquare,
} from "lucide-react-native";

import { COLORS } from "@/constant/colors";
import { RNText } from "@/components/ui/text";
import { InfoRow } from "@/components/ui/event-details-info-row";
import { AvatarStack } from "@/components/ui/avatar-stacks";
import { RNButton } from "@/components/ui/button";

export default function Screen() {
    const { height, width } = useWindowDimensions();
    const { top } = useSafeAreaInsets();

    const IMAGE_HEIGHT = height * 0.5;

    return (
        <View style={styles.outerContainer}>
            <View style={[styles.imageWrapper, { width, height: IMAGE_HEIGHT }]}>
                <Image
                    source={require("../../assets/images/event-details-top-image.png")}
                    style={StyleSheet.absoluteFill}
                    contentFit="cover"
                />
            </View>

            <View style={[styles.header, { paddingTop: top + 8 }]}>
                <Link href=".." style={styles.iconButton}>
                    <ArrowLeft color={COLORS.textPrimary} />
                </Link>
                <View style={styles.headerRight}>
                    <View style={styles.iconButton}>
                        <MessageSquare color={COLORS.textPrimary} />
                    </View>
                    <View style={styles.iconButton}>
                        <Heart stroke={COLORS.textSecondary} />
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: IMAGE_HEIGHT / 1.5 }}
            >
                <View style={styles.contentCard}>
                    <View style={styles.placeholderCard}>
                        <RNText variant="h2" style={{ marginBottom: 20 }}>
                            Magical Puppet Show
                        </RNText>

                        <InfoRow icon={Calendar} label="Date" value="Sun, July 21" />

                        <InfoRow icon={Clock} label="Time" value="3:00 PM" />

                        <InfoRow
                            icon={MapPin}
                            label="Location"
                            value="Brooklyn Community Center"
                            isExternal
                        />

                        <InfoRow
                            icon={Globe}
                            label="Organizer"
                            value="Creative Kids NYC"
                            subValue="creativekidsnyc.org"
                        />

                        <View style={styles.separator} />

                        <RNText variant="h3" style={{ marginBottom: 8 }}>
                            About
                        </RNText>
                        <RNText variant="bodySecondary">
                            A magical interactive puppet show for kids aged 3-8. Features
                            singing, laughter, and a post-show puppet-making workshop.
                        </RNText>
                    </View>

                    <View style={[styles.placeholderCard, { marginTop: 16 }]}>
                        <AvatarStack
                            avatars={[
                                "https://randomuser.me/api/portraits/men/1.jpg",
                                "https://randomuser.me/api/portraits/men/2.jpg",
                                "https://randomuser.me/api/portraits/men/3.jpg",
                                "https://randomuser.me/api/portraits/men/4.jpg",
                            ]}
                            totalMembers={15}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <RNButton fullWidth>Buy Ticket - 15$</RNButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
    imageWrapper: {
        position: "absolute",
        top: 0,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: "hidden",
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        zIndex: 100,
    },
    headerRight: {
        flexDirection: "row",
        gap: 8,
    },
    iconButton: {
        padding: 12,
        backgroundColor: COLORS.background,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        // Adding elevation/shadow for visibility against image
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scrollView: {
        flex: 1,
    },
    contentCard: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    placeholderCard: {
        width: "100%",
        borderRadius: 16,
        padding: 12,
        backgroundColor: COLORS.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    footer: {
        padding: 20,
        paddingBottom: 32,
        alignItems: "center",
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.backgroundSecondary,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },

    separator: {
        height: 1,
        backgroundColor: COLORS.textSecondary,
        marginVertical: 20,
    },
});
