import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import type { Message } from "@/types/chat";
import { Image } from "expo-image";
import { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type ReplyBubbleProps = {
    reply: Message["reply"];
    isOwnMessage: boolean;
    onPress?: () => void;
};

export const ReplyBubble = memo(function ReplyBubble({ 
    reply, 
    isOwnMessage,
    onPress
}: ReplyBubbleProps) {
    if (!reply) return null;

    const containerStyle = useMemo(() => ([
        styles.replyContainer,
        {
            backgroundColor: isOwnMessage ? COLORS.background + "20" : COLORS.primary + "20",
            borderLeftColor: isOwnMessage ? COLORS.background : COLORS.primary,
        },
    ]), [isOwnMessage]);

    const labelStyle = useMemo(() => ([
        styles.replyLabel,
        {
            color: isOwnMessage ? COLORS.background + "DD" : COLORS.textPrimary + "DD",
        },
    ]), [isOwnMessage]);

    const contentStyle = useMemo(() => ([
        styles.replyContent,
        {
            color: isOwnMessage ? COLORS.background : COLORS.textPrimary,
        },
    ]), [isOwnMessage]);

    return (
        <Pressable onPress={onPress} disabled={!onPress}>
            <View style={containerStyle}>
            {reply.type === "image" && reply.file ? (
                <Image
                    source={{ uri: reply.file }}
                    style={styles.replyImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    recyclingKey={reply.file}
                />
            ) : null}
            <View style={styles.replyTextContainer}>
                <RNText
                    style={labelStyle}
                    variant="caption"
                >
                    Replying to {reply.sender}
                </RNText>
                <RNText
                    style={contentStyle}
                    variant="caption"
                    numberOfLines={2}
                >
                    {reply.type === "text" ? reply.content : "Image"}
                </RNText>
            </View>
        </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    replyContainer: {
        borderLeftWidth: 3,
        paddingLeft: 8,
        paddingVertical: 6,
        marginBottom: 8,
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    replyImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    replyTextContainer: {
        flex: 1,
        gap: 2,
    },
    replyLabel: {
        fontWeight: "600",
    },
    replyContent: {},
});
