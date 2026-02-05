import { FlashList } from "@shopify/flash-list";
import {
    RecordingPresets,
    useAudioRecorder,
    useAudioRecorderState,
} from "expo-audio";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "@/constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import { HEADER_HEIGHT } from "@/constant/header-height";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    ChatBubble,
    type ChatBubbleProps,
} from "@/components/common/chat-bubble";
import { Stack } from "expo-router";
import { Mic, Paperclip, Send } from "lucide-react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { imagePicker } from "@/lib/image-picker";
import { useState } from "react";

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
        avatarUrl: "https://example.com/avatar1.png",
    },
];

export default function ChatScreen() {
    const { top, bottom } = useSafeAreaInsets();
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const recorderState = useAudioRecorderState(audioRecorder);

    const record = async () => {
        await audioRecorder.prepareToRecordAsync();
        audioRecorder.record();
    };

    const stopRecorording = async () => {
        await audioRecorder.stop();
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
            />
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
                <FlashList
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingTop: headerHeight + 16 }}
                    maintainVisibleContentPosition={{
                        autoscrollToBottomThreshold: 0.2,
                        startRenderingFromBottom: true,
                    }}
                    onStartReached={() => {
                        console.log("start reached");
                    }}
                    data={messages}
                    keyExtractor={(item) => item.message.id}
                    renderItem={({ item }) => <ChatBubble {...item} />}
                />
                <View
                    style={[styles.chatOuterContainer, { paddingBottom: bottom + 16 }]}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={styles.chatInnerContainer}>
                            <Pressable onPress={uploadImage}>
                                <Paperclip color={COLORS.muted} size={28} />
                            </Pressable>
                            <TextInput style={styles.chatInput} />
                            <Pressable onPressIn={record} onPressOut={stopRecorording}>
                                <Mic color={COLORS.muted} size={28} />
                            </Pressable>
                        </View>
                        <Pressable style={styles.sendButton}>
                            <Send size={28} color={COLORS.background} />
                        </Pressable>
                    </View>
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
        zIndex: 1,
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        justifyContent: "center",
    },
    chatOuterContainer: {
        alignItems: "center",
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    chatInnerContainer: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: COLORS.backgroundSecondary,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 24,
        gap: 12,
        paddingHorizontal: 8,
        flex: 1,
    },
    chatInput: {
        flex: 1,
        padding: 0,
        paddingVertical: 6,
        fontSize: 20,
        height: 50,
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
});
