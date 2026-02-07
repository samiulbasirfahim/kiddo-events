import { FlashList, FlashListRef } from "@shopify/flash-list";
import {
    AudioModule,
    RecordingPresets,
    useAudioRecorder,
    useAudioRecorderState,
} from "expo-audio";

import { AudioVisualizer } from "@/components/common/audio-visualizer";
import {
    ChatBubble,
    type ChatBubbleProps,
} from "@/components/common/chat-bubble";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { imagePicker } from "@/lib/image-picker";
import { Message } from "@/types/chat";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import {
    ArrowDown,
    ArrowLeft,
    EllipsisVertical,
    Mic,
    MicOff,
    Paperclip,
    Send,
    X,
} from "lucide-react-native";
import { useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SwipeableProps } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
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
        },
        isOwnMessage: false,
    },
];

export default function ChatScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const recorderState = useAudioRecorderState(audioRecorder);
    const keyboardVisible = useKeyboardVisibility();

    const openSwipeableRef = useRef<SwipeableProps["ref"] | null>(null);
    const scrollRef = useRef<FlashListRef<ChatBubbleProps>>(null);
    const inputRef = useRef<TextInput>(null);

    const [replyToId, setReplyToId] = useState<Message | null>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const handleSwipeOpen = (message: Message | null, ref: any) => {
        // Close previous swipeable if opening a new one
        if (ref && openSwipeableRef.current && openSwipeableRef.current !== ref) {
            openSwipeableRef.current.current?.close();
        }

        // When opening a swipeable (ref is provided)
        if (ref && message) {
            inputRef.current?.focus();
            openSwipeableRef.current = ref;
            setReplyToId(message);
        }
    };

    const clearReply = () => {
        if (openSwipeableRef.current) {
            openSwipeableRef.current.current?.close();
        }
        openSwipeableRef.current = null;
        setReplyToId(null);
    };

    const record = async () => {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        if (!status.granted) {
            console.log("Permission to access microphone is required!");
            return;
        }

        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
        console.log("Recording started");
    };

    const stopRecorording = async () => {
        await audioRecorder.stop();
        console.log("Recording stopped");
    };

    const headerHeight = HEADER_HEIGHT + top;

    const uploadImage = async () => {
        imagePicker(
            (uri) => {
                if (uri) {
                    console.log("Selected image URI:", uri);
                }
            },
            {
                editable: false,
                multiple: true,
            },
        );
    };

    return (
        <View style={styles.outerContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            <View
                style={[
                    styles.topBar,
                    {
                        paddingTop: top,
                        height: headerHeight,
                    },
                ]}
            >
                <Pressable
                    style={{
                        paddingHorizontal: 14,
                        height: HEADER_HEIGHT,
                        justifyContent: "center",
                    }}
                    onPress={() => { }}
                >
                    <ArrowLeft size={24} color={COLORS.textPrimary} />
                </Pressable>

                <View
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 10,

                        backgroundColor: COLORS.primary,
                    }}
                />
                <View>
                    <RNText variant="bodyBold">Alex Johnson</RNText>
                    <RNText variant="caption">Active now</RNText>
                </View>

                <Pressable
                    style={{
                        marginLeft: "auto",
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        justifyContent: "center",
                    }}
                >
                    <EllipsisVertical />
                </Pressable>
            </View>
            <LinearGradient
                colors={["#DDD9FF", "#EDEBFE", "#D5D0FD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    position: "absolute",
                    zIndex: -1,
                }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={-bottom}
                style={{ flex: 1 }}
            >
                {showScrollToBottom && (
                    <Animated.View
                        entering={FadeInUp.duration(200)}
                        exiting={FadeOutDown.duration(200)}
                        style={{
                            position: "absolute",
                            bottom: 160,
                            right: 20,
                            zIndex: 1,
                        }}
                    >
                        <Pressable
                            style={{
                                padding: 6,
                                borderWidth: 3,
                                borderColor: COLORS.primary,
                                borderRadius: 9999,
                                backgroundColor: COLORS.background,
                            }}
                            onPress={() => {
                                scrollRef.current?.scrollToEnd({
                                    animated: true,
                                });
                                setShowScrollToBottom(false);
                            }}
                        >
                            <ArrowDown size={34} color={COLORS.primary} />
                        </Pressable>
                    </Animated.View>
                )}
                <FlashList
                    ref={scrollRef}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    onScroll={(event) => {
                        const {
                            contentOffset: { y },
                            contentSize: { height: contentHeight },
                            layoutMeasurement: { height: layoutHeight },
                        } = event.nativeEvent;
                        const distanceFromBottom = contentHeight - (y + layoutHeight);
                        setShowScrollToBottom(distanceFromBottom > 100);
                    }}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingTop: headerHeight + 16 }}
                    maintainVisibleContentPosition={{
                        autoscrollToBottomThreshold: 0.2,
                        startRenderingFromBottom: true,
                        animateAutoScrollToBottom: true,
                    }}
                    onStartReached={() => {
                        console.log("start reached");
                    }}
                    data={messages}
                    keyExtractor={(item) => item.message.id}
                    renderItem={({ item }) => (
                        <ChatBubble onSwipeOpen={handleSwipeOpen} {...item} />
                    )}
                />

                {replyToId && (
                    <Animated.View
                        entering={FadeInUp.duration(200)}
                        exiting={FadeOutDown.duration(200)}
                        style={styles.replyContainer}
                    >
                        <View
                            style={{
                                width: "90%",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View style={styles.replyInner}>
                                <RNText variant="label">
                                    Replying to{" "}
                                    {replyToId.sender === "user1" ? "Alex Johnson" : "Yourself"}
                                </RNText>
                                {replyToId.type === "text" ? (
                                    <RNText numberOfLines={1} variant="caption">
                                        {replyToId.content}
                                    </RNText>
                                ) : (
                                    <RNText variant="caption" numberOfLines={1}>
                                        Image
                                    </RNText>
                                )}
                            </View>
                            <View style={{ marginLeft: "auto", paddingRight: 12 }}>
                                {replyToId.type === "image" && (
                                    <Image
                                        source={{
                                            uri: replyToId.file!,
                                        }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 6,
                                        }}
                                        contentFit="contain"
                                    />
                                )}
                            </View>
                        </View>

                        <Pressable
                            onPress={clearReply}
                            style={{
                                padding: 4,
                                flex: 1,
                            }}
                        >
                            <X size={20} style={styles.replyClose} />
                        </Pressable>
                    </Animated.View>
                )}
                <View
                    style={[styles.chatOuterContainer, { paddingBottom: bottom + 16 }]}
                >
                    <View style={styles.chatInnerContainer}>
                        {keyboardVisible ? null : recorderState.isRecording ? (
                            <Pressable onPress={stopRecorording}>
                                <MicOff color={COLORS.background} size={28} />
                            </Pressable>
                        ) : (
                            <Pressable onPress={record}>
                                <Mic color={COLORS.muted} size={28} />
                            </Pressable>
                        )}
                        {!recorderState.isRecording ? (
                            <>
                                <TextInput ref={inputRef} style={styles.chatInput} />
                                <Pressable onPress={uploadImage}>
                                    <Paperclip color={COLORS.muted} size={28} />
                                </Pressable>
                            </>
                        ) : (
                            <View style={styles.recordingContainer}>
                                <View style={styles.recordPill}>
                                    <RNText style={{ color: COLORS.background }}>
                                        {Math.ceil(recorderState.durationMillis / 1000)}s
                                    </RNText>
                                </View>
                                <AudioVisualizer
                                    isRecording={recorderState.isRecording}
                                    metering={recorderState.metering ?? -160}
                                />
                            </View>
                        )}
                    </View>
                    <Pressable style={styles.sendButton}>
                        <Send size={28} color={COLORS.background} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
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
    chatOuterContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    chatInnerContainer: {
        alignItems: "center",
        flexDirection: "row-reverse",
        backgroundColor: COLORS.backgroundSecondary,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 24,
        gap: 12,
        paddingHorizontal: 8,
        flex: 1,
        height: 50,
    },
    chatInput: {
        flex: 1,
        padding: 0,
        paddingVertical: 6,
        fontSize: 20,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        marginLeft: 8,
        aspectRatio: 1,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
    },
    recordPill: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    recordingContainer: {
        flex: 1,
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    replyContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },

    replyInner: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    replyText: {
        color: COLORS.muted,
    },

    replyClose: {
        fontSize: 18,
        color: COLORS.primary,
        paddingHorizontal: 8,
    },
});
