import { COLORS } from "@/constant/colors";
import type { Message } from "@/types/chat";
import { ReplyIcon } from "lucide-react-native";
import { memo, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import { VoiceBubble } from "./chat-bubbles";
import { ImageBubble } from "./chat-bubbles/image-bubble";
import { ReplyBubble } from "./chat-bubbles/reply-bubble";
import { TextBubble } from "./chat-bubbles/text-bubble";

export type ChatBubbleProps = {
    message: Message;
    avatarUrl?: string;
    isOwnMessage: boolean;
    onSwipeOpen?: (message: Message | null, ref: any) => void;
    onReplyPress?: (messageId: string) => void;
    isHighlighted?: boolean;
};

// Move RightAction outside component for better performance
const RightAction = (isOwnMessage: boolean) => (prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: isOwnMessage ? drag.value + 20 : drag.value - 20,
                },
            ],
            justifyContent: "center" as const,
            alignItems: "center" as const,
            height: "100%",
        };
    });

    return (
        <Reanimated.View style={styles}>
            <ReplyIcon size={24} color={COLORS.textPrimary} />
        </Reanimated.View>
    );
};

export const ChatBubble = memo(function ChatBubble({
    message,
    avatarUrl,
    isOwnMessage,
    onSwipeOpen,
    onReplyPress,
    isHighlighted = false,
}: ChatBubbleProps) {
    const swipeAbleRef = useRef(null);
    
    const handleSwipeOpen = useCallback(() => {
        onSwipeOpen?.(message, swipeAbleRef);
    }, [message, onSwipeOpen]);
    
    const rightAction = useMemo(() => RightAction(isOwnMessage), [isOwnMessage]);

    // Memoize bubble styles
    const bubbleStyle = useMemo(() => [
        sts.bubbleContainer,
        {
            backgroundColor: isOwnMessage ? COLORS.primary : COLORS.background,
            paddingHorizontal: message.type === "image" ? 1 : 16,
            paddingVertical: message.type === "image" ? 1 : 10,
            borderRadius: message.type === "image" ? 13 : 24,
        },
    ], [isOwnMessage, message.type]);
    
    const containerStyle = useMemo(() => [
        sts.container,
        { justifyContent: isOwnMessage ? ("flex-end" as const) : ("flex-start" as const) }
    ], [isOwnMessage]);

    return (
        <Swipeable
            friction={4}
            ref={swipeAbleRef}
            overshootRight={false}
            overshootLeft={false}
            enableTrackpadTwoFingerGesture={false}
            rightThreshold={40}
            leftThreshold={40}
            onSwipeableWillOpen={handleSwipeOpen}
            renderLeftActions={isOwnMessage ? undefined : rightAction}
            renderRightActions={isOwnMessage ? rightAction : undefined}
            childrenContainerStyle={containerStyle}
        >
            {!isOwnMessage && avatarUrl ? (
                <View style={sts.avatar} />
            ) : null}
            <View style={[bubbleStyle, isHighlighted && sts.highlighted]}>
                {message.reply && (
                    <View style={message.type === "image" ? sts.replyPaddingImage : undefined}>
                        <ReplyBubble 
                            reply={message.reply} 
                            isOwnMessage={isOwnMessage}
                            onPress={() => onReplyPress?.(message.reply!.id)}
                        />
                    </View>
                )}

                {message.type === "text" ? (
                    <TextBubble
                        content={message.content}
                        timestamp={message.created_at}
                        isOwnMessage={isOwnMessage}
                    />
                ) : message.type === "image" ? (
                    <ImageBubble
                        imageUrl={message.file || ""}
                        timestamp={message.created_at}
                        isOwnMessage={isOwnMessage}
                    />
                ) : message.type === "voice" ? (
                    <VoiceBubble
                        audioUrl={message.file || ""}
                        timestamp={message.created_at}
                        isOwnMessage={isOwnMessage}
                    />
                ) : null}
            </View>
        </Swipeable>
    );
});

const sts = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginVertical: 4,
        flexDirection: "row",
    },
    bubbleContainer: {
        maxWidth: "80%",
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 6,
        backgroundColor: COLORS.primary,
    },
    replyPaddingImage: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    highlighted: {
        backgroundColor: COLORS.primary + "22",
    },
});
