import { ChatBubble } from "@/components/common/chat-bubble";
import { ChatHeader } from "@/components/common/chat-header";
import { ChatInput, ChatInputRef } from "@/components/common/chat-input";
import { ScrollToBottomButton } from "@/components/common/scroll-to-bottom-button";
import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { fetchMessages } from "@/data/chat";
import { Message } from "@/types/chat";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SwipeableProps } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatScreen() {
    const { top, bottom } = useSafeAreaInsets();

    const openSwipeableRef = useRef<SwipeableProps["ref"] | null>(null);
    const scrollRef = useRef<FlatList<Message>>(null);
    const chatInputRef = useRef<ChatInputRef>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const [replyToId, setReplyToId] = useState<Message | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [highlightedMessageId, setHighlightedMessageId] = useState<
        string | null
    >(null);
    const [isLoadingJump, setIsLoadingJump] = useState(false);
    const [initialLoad, setInitialLoad] = useState(false);

    const handleSwipeOpen = useCallback((message: Message | null, ref: any) => {
        if (ref && openSwipeableRef.current && openSwipeableRef.current !== ref) {
            openSwipeableRef.current.current?.close();
        }

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
    }, []);

    const handleSendImage = useCallback((uri: string) => {
        console.log("Send image:", uri);
    }, []);

    const handleSendVoice = useCallback((uri: string) => {
        console.log("Send voice:", uri);
    }, []);

    const handleBackPress = useCallback(() => {
        router.back();
    }, []);

    useEffect(() => {
        setIsLoadingJump(true);
        async function loadMessages() {
            const fetchedMessages = await fetchMessages();
            setMessages(fetchedMessages);

            requestAnimationFrame(() => {
                scrollRef.current?.scrollToOffset({
                    offset: 0,
                    animated: false,
                });
                setInitialLoad(true);
                setIsLoadingJump(false);
            });
        }

        loadMessages();
    }, []);

    async function fetchPreviousMessages() {
        console.log("Fetching previous messages...");
        if (messages.length === 0) return;
        const previousMessages: Message[] = await fetchMessages(messages[
            messages.length - 1
        ].id);
        const newMessages = [...previousMessages, ...messages];

        console.log(
            "New set of messages:",
            newMessages.map((m) => m.id),
        );

        // setMessages(newMessages);
    }

    const handleMenuPress = useCallback(() => { }, []);

    const handleScrollToBottom = useCallback(() => {
        scrollRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
        });
        setShowScrollToBottom(false);
    }, []);

    const jumpToMessage = useCallback(
        async (messageId: string) => {
            setIsLoadingJump(true);

            let currentMessages = messages;
            let index = currentMessages.findIndex((item) => item.id === messageId);

            while (index === -1 && currentMessages.length > 0) {
                const previousMessages: Message[] = await fetchMessages(
                    currentMessages[0].id,
                );

                if (previousMessages.length === 0) {
                    break;
                }

                currentMessages = [...previousMessages, ...currentMessages];

                console.log(
                    "New set of messages:",
                    currentMessages.map((m) => m.id),
                );

                // setMessages(currentMessages);

                index = currentMessages.findIndex((item) => item.id === messageId);
            }

            setIsLoadingJump(false);

            if (index !== -1) {
                requestAnimationFrame(() => {
                    scrollRef.current?.scrollToIndex({
                        index,
                        animated: true,
                        viewPosition: 0.5,
                    });

                    setHighlightedMessageId(messageId);
                    setTimeout(() => {
                        setHighlightedMessageId(null);
                    }, 2200);
                });
            }
        },
        [messages],
    );

    const handleScroll = useCallback((event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollToBottom(offsetY > 200);
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: Message }) => (
            <ChatBubble
                onSwipeOpen={handleSwipeOpen}
                onReplyPress={jumpToMessage}
                isHighlighted={highlightedMessageId === item.id}
                isOwnMessage={item.sender === "user1"}
                message={item}
            />
        ),
        [handleSwipeOpen, jumpToMessage, highlightedMessageId],
    );

    const keyExtractor = useCallback((item: Message) => item.id, []);

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
                {isLoadingJump && (
                    <View
                        style={[
                            styles.loadingContainer,
                            { zIndex: 1000, marginTop: headerHeight },
                        ]}
                    >
                        <ActivityIndicator size="small" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Fetching older messages...</Text>
                    </View>
                )}

                <ScrollToBottomButton
                    visible={showScrollToBottom}
                    onPress={handleScrollToBottom}
                    bottom={bottom + 100}
                />

                <FlatList
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    ref={scrollRef}
                    data={messages}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    inverted
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    onStartReached={fetchPreviousMessages}
                    onEndReachedThreshold={0.4}
                    onScrollToIndexFailed={(info) => {
                        setTimeout(() => {
                            scrollRef.current?.scrollToIndex({
                                index: info.index,
                                animated: true,
                                viewPosition: 0.5,
                            });
                        }, 100);
                    }}
                    contentContainerStyle={[
                        styles.list,
                        { paddingBottom: headerHeight + 16 },
                    ]}
                    showsVerticalScrollIndicator={false}
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
    list: {},
    loadingContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background + "EE",
        borderRadius: 24,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        alignSelf: "center",
        zIndex: 999,
    },
    loadingText: {
        fontSize: 14,
        color: COLORS.textPrimary,
        fontWeight: "500",
    },
});
