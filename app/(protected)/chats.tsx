import { FlashList, FlashListRef } from "@shopify/flash-list";

import {
    ChatBubble,
    type ChatBubbleProps,
} from "@/components/common/chat-bubble";
import { ChatHeader } from "@/components/common/chat-header";
import { ChatInput, ChatInputRef } from "@/components/common/chat-input";
import { ScrollToBottomButton } from "@/components/common/scroll-to-bottom-button";
import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { Message } from "@/types/chat";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SwipeableProps } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const messages: ChatBubbleProps[] = [
    {
        message: {
            id: "1",
            content: "Hello!",
            sender: "user1",
            created_at: new Date("2024-06-01T10:00:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: false,
        avatarUrl: "https://example.com/avatar1.png",
    },
    {
        message: {
            id: "1-1",
            content: "Hello!",
            sender: "user1",
            created_at: new Date("2024-06-01T10:00:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: false,
        avatarUrl: "https://example.com/avatar1.png",
    },
    {
        message: {
            id: "2",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: {
                id: "1",
                content: "Hello!",
                type: "text",
                file: null,
                sender: "user1",
            },
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-1",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-2",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-3",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-4",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-5",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-6",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "2-7",
            content: "Hi there!",
            sender: "user2",
            created_at: new Date("2024-06-01T10:01:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },
    {
        message: {
            id: "3",
            content:
                "I'm good, thanks! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            sender: "user1",
            created_at: new Date("2024-06-01T10:02:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: {
                id: "2",
                content: "Hi there!",
                type: "text",
                file: null,
                sender: "user2",
            },
        },
        isOwnMessage: false,
        avatarUrl: "https://example.com/avatar1.png",
    },
    {
        message: {
            id: "4",
            content:
                "I'm good, thanks! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            sender: "user2",
            created_at: new Date("2024-06-01T10:03:00Z"),
            type: "text",
            file: null,
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar2.png",
    },

    {
        message: {
            id: "5",
            content: "",
            sender: "user1",
            created_at: new Date("2024-06-01T10:04:00Z"),
            type: "image",
            file: "https://velocebike.com/bangladesh/wp-content/uploads/sites/8/2024/05/Inferno-1.jpg",
            room: "room1",
            reply: {
                id: "3",
                content:
                    "I'm good, thanks! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                type: "text",
                file: null,
                sender: "user1",
            },
        },
        isOwnMessage: true,
        avatarUrl: "https://example.com/avatar1.png",
    },

    {
        message: {
            id: "6",
            content: "",
            sender: "user1",
            created_at: new Date("2024-06-01T10:04:00Z"),
            type: "image",
            file: "https://velocebike.com/bangladesh/wp-content/uploads/sites/8/2024/05/Inferno-1.jpg",
            room: "room1",
            reply: {
                id: "5",
                content: "",
                type: "image",
                file: "https://velocebike.com/bangladesh/wp-content/uploads/sites/8/2024/05/Inferno-1.jpg",
                sender: "user1",
            },
        },
        isOwnMessage: false,
    },
    {
        message: {
            id: "7",
            content: "",
            sender: "user2",
            created_at: new Date("2024-06-01T10:05:00Z"),
            type: "voice",
            file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            room: "room1",
            reply: null,
        },
        isOwnMessage: true,
    },
    {
        message: {
            id: "8",
            content: "",
            sender: "user1",
            created_at: new Date("2024-06-01T10:06:00Z"),
            type: "voice",
            file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            room: "room1",
            reply: {
                id: "7",
                content: "",
                type: "voice",
                file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                sender: "user2",
            },
        },
        isOwnMessage: false,
    },
];

export default function ChatScreen() {
    const { top, bottom } = useSafeAreaInsets();

    const openSwipeableRef = useRef<SwipeableProps["ref"] | null>(null);
    const scrollRef = useRef<FlashListRef<ChatBubbleProps>>(null);
    const chatInputRef = useRef<ChatInputRef>(null);

    const [replyToId, setReplyToId] = useState<Message | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const handleSwipeOpen = useCallback((message: Message | null, ref: any) => {
        // Close previous swipeable if opening a new one
        if (ref && openSwipeableRef.current && openSwipeableRef.current !== ref) {
            openSwipeableRef.current.current?.close();
        }

        // When opening a swipeable (ref is provided)
        if (ref && message) {
            openSwipeableRef.current = ref;
            setReplyToId(message);
        }
    }, []);

    const clearReply = useCallback(() => {
        if (openSwipeableRef.current) {
            openSwipeableRef.current.current?.close();
        }
        openSwipeableRef.current = null;
        setReplyToId(null);
    }, []);

    const handleSendMessage = useCallback((message: string) => {
        console.log("Send message:", message);
        // TODO: Implement send message logic
    }, []);

    const handleSendImage = useCallback((uri: string) => {
        console.log("Send image:", uri);
        // TODO: Implement send image logic
    }, []);

    const handleSendVoice = useCallback((uri: string) => {
        console.log("Send voice:", uri);
        // TODO: Implement send voice logic
    }, []);

    const handleBackPress = useCallback(() => {
        router.back();
    }, []);

    const handleMenuPress = useCallback(() => {
        // TODO: Implement menu logic
    }, []);

    const handleScrollToBottom = useCallback(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
        setShowScrollToBottom(false);
    }, []);

    const handleScroll = useCallback((event: any) => {
        const {
            contentOffset: { y },
            contentSize: { height: contentHeight },
            layoutMeasurement: { height: layoutHeight },
        } = event.nativeEvent;
        const distanceFromBottom = contentHeight - (y + layoutHeight);
        setShowScrollToBottom(distanceFromBottom > 100);
    }, []);

    const renderItem = useCallback(({ item }: { item: ChatBubbleProps }) => (
        <ChatBubble onSwipeOpen={handleSwipeOpen} {...item} />
    ), [handleSwipeOpen]);

    const keyExtractor = useCallback((item: ChatBubbleProps) => item.message.id, []);

    const headerHeight = HEADER_HEIGHT + top;

    return (
        <View style={styles.outerContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            
            <ChatHeader
                headerHeight={headerHeight}
                topInset={top}
                userName="Alex Johnson"
                userStatus="Active now"
                onBackPress={handleBackPress}
                onMenuPress={handleMenuPress}
            />
            
            <LinearGradient
                colors={["#DDD9FF", "#EDEBFE", "#D5D0FD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            />
            
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={-bottom}
                style={styles.keyboardView}
            >
                <ScrollToBottomButton
                    visible={showScrollToBottom}
                    onPress={handleScrollToBottom}
                />
                
                <FlashList
                    ref={scrollRef}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.flashList}
                    contentContainerStyle={{ paddingTop: headerHeight + 16 }}
                    maintainVisibleContentPosition={{
                        autoscrollToBottomThreshold: 0.2,
                        startRenderingFromBottom: true,
                        animateAutoScrollToBottom: true,
                    }}
                    data={messages}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    drawDistance={3000}
                    removeClippedSubviews={false}
                />

                <ChatInput
                    ref={chatInputRef}
                    replyTo={replyToId}
                    onClearReply={clearReply}
                    onSendMessage={handleSendMessage}
                    onSendImage={handleSendImage}
                    onSendVoice={handleSendVoice}
                    bottomInset={bottom}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
        zIndex: -1,
    },
    keyboardView: {
        flex: 1,
    },
    flashList: {
        flex: 1,
    },
});
