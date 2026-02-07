import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { ArrowLeft, EllipsisVertical } from "lucide-react-native";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type ChatHeaderProps = {
    headerHeight: number;
    topInset: number;
    avatarUrl?: string;
    userName: string;
    userStatus: string;
    onBackPress: () => void;
    onMenuPress: () => void;
};

export const ChatHeader = memo(function ChatHeader({
    headerHeight,
    topInset,
    avatarUrl,
    userName,
    userStatus,
    onBackPress,
    onMenuPress,
}: ChatHeaderProps) {
    return (
        <View
            style={[
                styles.topBar,
                {
                    paddingTop: topInset,
                    height: headerHeight,
                },
            ]}
        >
            <Pressable style={styles.backButton} onPress={onBackPress}>
                <ArrowLeft size={24} color={COLORS.textPrimary} />
            </Pressable>

            <View style={styles.avatar} />
            
            <View>
                <RNText variant="bodyBold">{userName}</RNText>
                <RNText variant="caption">{userStatus}</RNText>
            </View>

            <Pressable style={styles.menuButton} onPress={onMenuPress}>
                <EllipsisVertical />
            </Pressable>
        </View>
    );
});

const styles = StyleSheet.create({
    topBar: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 1,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
    },
    backButton: {
        paddingHorizontal: 14,
        height: HEADER_HEIGHT,
        justifyContent: "center",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: COLORS.primary,
    },
    menuButton: {
        marginLeft: "auto",
        paddingHorizontal: 14,
        paddingVertical: 8,
        justifyContent: "center",
    },
});
