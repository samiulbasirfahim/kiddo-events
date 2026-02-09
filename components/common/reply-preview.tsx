import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import type { Message } from "@/types/chat";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

type ReplyPreviewProps = {
    replyTo: Message;
    onClearReply: () => void;
};

export const ReplyPreview = memo(function ReplyPreview({
    replyTo,
    onClearReply,
}: ReplyPreviewProps) {
    const senderName = useMemo(
        () => (replyTo.sender === "user1" ? "Alex Johnson" : "You"),
        [replyTo.sender]
    );

    const contentPreview = useMemo(() => {
        if (replyTo.type === "text") {
            return replyTo.content;
        } else if (replyTo.type === "image") {
            return "Image";
        } else {
            return "Voice message";
        }
    }, [replyTo.type, replyTo.content]);

    return (
        <Animated.View
            entering={FadeInUp.duration(200)}
            exiting={FadeOutDown.duration(200)}
            style={styles.container}
        >
            <View style={styles.leftBar} />
            
            <View style={styles.contentContainer}>
                <RNText variant="label" style={styles.senderText}>
                    Replying to {senderName}
                </RNText>
                <RNText numberOfLines={1} variant="caption" style={styles.previewText}>
                    {contentPreview}
                </RNText>
            </View>

            {replyTo.type === "image" && replyTo.file && (
                <Image
                    source={{ uri: replyTo.file }}
                    style={styles.thumbnail}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                />
            )}

            <Pressable onPress={onClearReply} style={styles.closeButton}>
                <X size={20} color={COLORS.textSecondary} />
            </Pressable>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        gap: 12,
    },
    leftBar: {
        width: 3,
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    contentContainer: {
        flex: 1,
        gap: 2,
    },
    senderText: {
        color: COLORS.primary,
        fontWeight: "600",
    },
    previewText: {
        color: COLORS.textSecondary,
    },
    thumbnail: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    closeButton: {
        padding: 4,
    },
});
