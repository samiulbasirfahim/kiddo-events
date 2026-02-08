import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { imagePicker } from "@/lib/image-picker";
import type { Message } from "@/types/chat";

import {
    AudioModule,
    RecordingPresets,
    useAudioPlayer,
    useAudioRecorder,
    useAudioRecorderState,
    useAudioSampleListener,
} from "expo-audio";

import { Image } from "expo-image";
import { Mic, MicOff, Paperclip, Pause, Play, Send, StopCircle, X } from "lucide-react-native";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { AudioVisualizer } from "./audio-visualizer";

export type ChatInputRef = {
    focus: () => void;
    blur: () => void;
    clearReply: () => void;
};

type ChatInputProps = {
    replyTo: Message | null;
    onClearReply: () => void;
    onSendMessage?: (message: string) => void;
    onSendImage?: (uri: string) => void;
    onSendVoice?: (uri: string) => void;
    bottomInset?: number;
};

export const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
    (
        {
            replyTo,
            onClearReply,
            onSendMessage,
            onSendImage,
            onSendVoice,
            bottomInset = 0,
        },
        ref,
    ) => {
        const audioRecorder = useAudioRecorder({
            ...RecordingPresets.HIGH_QUALITY,
            isMeteringEnabled: true,
        });
        const recorderState = useAudioRecorderState(audioRecorder);

        const [isRecording, setIsRecording] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const [audioUri, setAudioUri] = useState<string | null>(null);
        const [recordedDuration, setRecordedDuration] = useState<number>(0);
        const [previewMetering, setPreviewMetering] = useState<number>(-20);
        const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
        const [previewCurrentTime, setPreviewCurrentTime] = useState<number>(0);
        // Use empty string to create a stable player instance
        const previewPlayer = useAudioPlayer(audioUri || "");
        const previewIntervalRef = useRef<NodeJS.Timeout | null>(null);

        const keyboardVisible = useKeyboardVisibility();
        const inputRef = useRef<TextInput>(null);
        const [inputText, setInputText] = useState("");

        // Audio sample listener - always active but checks conditions
        useAudioSampleListener(previewPlayer, (sample) => {
            // Only process if we have audio and it's playing
            if (!audioUri || !previewPlayer.playing) return;
                
                const channel = sample.channels[0];
                if (!channel || channel.frames.length === 0) return;

                const sumSquares = channel.frames.reduce(
                    (sum, frame) => sum + frame * frame,
                    0,
                );
                const rms = Math.sqrt(sumSquares / channel.frames.length);
                const dbfs = rms > 0 ? 20 * Math.log10(rms) : -160;
                setPreviewMetering(dbfs);
            });

        // Track preview player state changes
        useEffect(() => {
            if (audioUri && previewPlayer) {
                setIsPreviewPlaying(previewPlayer.playing);
            } else {
                setIsPreviewPlaying(false);
            }
        }, [audioUri, previewPlayer.playing]);

        // Reset metering when not playing
        useEffect(() => {
            if (!audioUri || !previewPlayer.playing) {
                setPreviewMetering(-20);
            }
        }, [audioUri, previewPlayer.playing]);

        // Poll current time during playback
        useEffect(() => {
            if (previewIntervalRef.current) {
                clearInterval(previewIntervalRef.current);
            }

            if (audioUri && previewPlayer.playing) {
                previewIntervalRef.current = setInterval(() => {
                    setPreviewCurrentTime(previewPlayer.currentTime);
                }, 100);
            }

            return () => {
                if (previewIntervalRef.current) {
                    clearInterval(previewIntervalRef.current);
                }
            };
        }, [audioUri, previewPlayer.playing]);

        // Handle audio end - pause and reset to beginning
        useEffect(() => {
            if (audioUri && previewCurrentTime > 0 && recordedDuration > 0) {
                const durationInSeconds = recordedDuration / 1000;
                // Check if we're at the end (within 100ms)
                if (previewCurrentTime >= durationInSeconds - 0.1) {
                    // Pause and reset for replay
                    if (previewPlayer.playing) {
                        previewPlayer.pause();
                    }
                    previewPlayer.seekTo(0);
                    setPreviewCurrentTime(0);
                    setIsPreviewPlaying(false);
                }
            }
        }, [audioUri, previewCurrentTime, recordedDuration]);

        useImperativeHandle(ref, () => ({
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
            clearReply: onClearReply,
        }));

        const startRecording = async () => {
            setIsRecording(true);

            const status = await AudioModule.requestRecordingPermissionsAsync();
            if (!status.granted) {
                console.log("Permission to access microphone is required!");
                return;
            }

            await audioRecorder.prepareToRecordAsync();
            audioRecorder.record();
        };

        const pauseRecording = async () => {
            if (audioRecorder.isRecording) {
                setIsPaused(true);
                audioRecorder.pause();
            }
        };

        const resumeRecording = async () => {
            if (!audioRecorder.isRecording && isPaused) {
                setIsPaused(false);
                audioRecorder.record();
            }
        };

        const stopRecording = async () => {
            setIsRecording(false);
            setIsPaused(false);
            setRecordedDuration(recorderState.durationMillis);
            await audioRecorder.stop();
            const uri = recorderState.url;
            if (uri) {
                setAudioUri(uri);
            }
        };

        const cancelRecording = () => {
            if (audioUri && previewPlayer.playing) {
                previewPlayer.pause();
            }
            if (previewIntervalRef.current) {
                clearInterval(previewIntervalRef.current);
            }
            setAudioUri(null);
            setRecordedDuration(0);
            setPreviewCurrentTime(0);
        };

        const togglePreviewPlayback = () => {
            if (!audioUri) return;
            
            if (previewPlayer.playing) {
                previewPlayer.pause();
            } else {
                // If at the end, seek to beginning before playing
                if (previewCurrentTime > 0 && recordedDuration > 0) {
                    const durationInSeconds = recordedDuration / 1000;
                    if (previewCurrentTime >= durationInSeconds - 0.1) {
                        previewPlayer.seekTo(0);
                        setPreviewCurrentTime(0);
                    }
                }
                previewPlayer.play();
            }
        };

        const sendVoiceMessage = () => {
            if (audioUri && onSendVoice) {
                onSendVoice(audioUri);
                setAudioUri(null);
                setRecordedDuration(0);
            }
        };

        const handleSendMessage = () => {
            if (audioUri) {
                sendVoiceMessage();
            } else if (inputText.trim() && onSendMessage) {
                onSendMessage(inputText.trim());
                setInputText("");
            }
        };

        const handleUploadImage = async () => {
            imagePicker(
                (uri) => {
                    if (uri && onSendImage) {
                        onSendImage(uri);
                    }
                },
                {
                    editable: false,
                },
            );
        };

        console.log("Metering state:", recorderState.metering);

        return (
            <>
                {replyTo && (
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
                                    {replyTo.sender === "user1" ? "Alex Johnson" : "Yourself"}
                                </RNText>
                                {replyTo.type === "text" ? (
                                    <RNText numberOfLines={1} variant="caption">
                                        {replyTo.content}
                                    </RNText>
                                ) : replyTo.type === "image" ? (
                                    <RNText variant="caption" numberOfLines={1}>
                                        Image
                                    </RNText>
                                ) : (
                                    <RNText variant="caption" numberOfLines={1}>
                                        Voice message
                                    </RNText>
                                )}
                            </View>
                            <View style={{ marginLeft: "auto", paddingRight: 12 }}>
                                {replyTo.type === "image" && (
                                    <Image
                                        source={{
                                            uri: replyTo.file!,
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
                            onPress={onClearReply}
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
                    style={[
                        styles.chatOuterContainer,
                        { paddingBottom: bottomInset + 16 },
                    ]}
                >
                    <View style={styles.chatInnerContainer}>
                        {keyboardVisible ? null : isRecording ? (
                            <Pressable onPress={stopRecording}>
                                <StopCircle color={COLORS.background} size={28} />
                            </Pressable>
                        ) : audioUri ? (
                            <Pressable onPress={cancelRecording}>
                                <X color={COLORS.error} size={28} />
                            </Pressable>
                        ) : (
                            <Pressable onPress={startRecording}>
                                <Mic color={COLORS.muted} size={28} />
                            </Pressable>
                        )}
                        {isRecording ? (
                            <View style={styles.recordingContainer}>
                                <View style={styles.recordControlsContainer}>
                                    <View style={styles.recordPill}>
                                        <RNText style={{ color: COLORS.background }}>
                                            {Math.ceil(recorderState.durationMillis / 1000)}s
                                        </RNText>
                                    </View>
                                    <Pressable
                                        style={styles.pauseButton}
                                        onPress={isPaused ? resumeRecording : pauseRecording}
                                    >
                                        {isPaused ? (
                                            <Play
                                                size={20}
                                                color={COLORS.background}
                                                fill={COLORS.background}
                                            />
                                        ) : (
                                            <Pause
                                                size={20}
                                                color={COLORS.background}
                                                fill={COLORS.background}
                                            />
                                        )}
                                    </Pressable>
                                </View>
                                <AudioVisualizer
                                    isRecording={!isPaused && recorderState.isRecording}
                                    metering={recorderState.metering ?? -160}
                                />
                            </View>
                        ) : audioUri ? (
                            <View style={styles.recordingContainer}>
                                <View style={styles.recordControlsContainer}>
                                    <View style={styles.recordPill}>
                                        <RNText style={{ color: COLORS.background }}>
                                            {Math.ceil(recordedDuration / 1000)}s
                                        </RNText>
                                    </View>
                                    <Pressable
                                        style={styles.pauseButton}
                                        onPress={togglePreviewPlayback}
                                    >
                                        {isPreviewPlaying ? (
                                            <Pause
                                                size={20}
                                                color={COLORS.background}
                                                fill={COLORS.background}
                                            />
                                        ) : (
                                            <Play
                                                size={20}
                                                color={COLORS.background}
                                                fill={COLORS.background}
                                            />
                                        )}
                                    </Pressable>
                                </View>
                                <AudioVisualizer
                                    isRecording={isPreviewPlaying}
                                    metering={previewMetering}
                                />
                            </View>
                        ) : (
                            <>
                                <TextInput
                                    ref={inputRef}
                                    style={styles.chatInput}
                                    value={inputText}
                                    onChangeText={setInputText}
                                    placeholder="Type a message..."
                                    placeholderTextColor={COLORS.muted}
                                    multiline
                                />
                                <Pressable onPress={handleUploadImage}>
                                    <Paperclip color={COLORS.muted} size={28} />
                                </Pressable>
                            </>
                        )}
                    </View>
                    <Pressable style={styles.sendButton} onPress={handleSendMessage}>
                        <Send size={28} color={COLORS.background} />
                    </Pressable>
                </View>
            </>
        );
    },
);

ChatInput.displayName = "ChatInput";

const styles = StyleSheet.create({
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
        minHeight: 50,
    },
    chatInput: {
        flex: 1,
        padding: 0,
        paddingVertical: 6,
        fontSize: 16,
        maxHeight: 120,
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
    recordControlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        minWidth: 100,
    },
    recordPill: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 50,
    },
    pauseButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    recordingContainer: {
        flex: 1,
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
    replyClose: {
        fontSize: 18,
        color: COLORS.primary,
        paddingHorizontal: 8,
    },
});
