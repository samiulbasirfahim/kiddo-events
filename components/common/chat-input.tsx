import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { imagePicker } from "@/lib/image-picker";
import type { Message } from "@/types/chat";
import { AudioModule, RecordingPresets, useAudioPlayer, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import { Mic, Paperclip, Pause, Play, Send, StopCircle, X } from "lucide-react-native";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ReplyPreview } from "./reply-preview";
import { SimpleWaveform } from "./simple-waveform";

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
    ({ replyTo, onClearReply, onSendMessage, onSendImage, onSendVoice, bottomInset = 0 }, ref) => {
        const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
        const recorderState = useAudioRecorderState(audioRecorder);

        const [isRecording, setIsRecording] = useState(false);
        const [isPaused, setIsPaused] = useState(false);
        const [audioUri, setAudioUri] = useState<string | null>(null);
        const [recordedDuration, setRecordedDuration] = useState<number>(0);
        const [previewCurrentTime, setPreviewCurrentTime] = useState<number>(0);
        const previewPlayer = useAudioPlayer(audioUri || "");
        const previewIntervalRef = useRef<NodeJS.Timeout | null>(null);
        const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

        const keyboardVisible = useKeyboardVisibility();
        const inputRef = useRef<TextInput>(null);
        const [inputText, setInputText] = useState("");

        useEffect(() => {
            if (audioUri && previewPlayer) {
                setIsPreviewPlaying(previewPlayer.playing);
            } else {
                setIsPreviewPlaying(false);
            }
        }, [audioUri, previewPlayer?.playing]);

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

        useEffect(() => {
            if (audioUri && previewCurrentTime > 0 && recordedDuration > 0) {
                const durationInSeconds = recordedDuration / 1000;
                if (previewCurrentTime >= durationInSeconds - 0.1) {
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

        const startRecording = useCallback(async () => {
            setIsRecording(true);

            const status = await AudioModule.requestRecordingPermissionsAsync();
            if (!status.granted) {
                return;
            }

            await audioRecorder.prepareToRecordAsync();
            audioRecorder.record();
        }, [audioRecorder]);

        const pauseRecording = useCallback(async () => {
            if (audioRecorder.isRecording) {
                setIsPaused(true);
                audioRecorder.pause();
            }
        }, [audioRecorder]);

        const resumeRecording = useCallback(async () => {
            if (!audioRecorder.isRecording && isPaused) {
                setIsPaused(false);
                audioRecorder.record();
            }
        }, [audioRecorder, isPaused]);

        const stopRecording = useCallback(async () => {
            setIsRecording(false);
            setIsPaused(false);
            setRecordedDuration(recorderState.durationMillis);
            await audioRecorder.stop();
            const uri = recorderState.url;
            if (uri) {
                setAudioUri(uri);
            }
        }, [audioRecorder, recorderState]);

        const cancelRecording = useCallback(() => {
            if (audioUri && previewPlayer.playing) {
                previewPlayer.pause();
            }
            if (previewIntervalRef.current) {
                clearInterval(previewIntervalRef.current);
            }
            setAudioUri(null);
            setRecordedDuration(0);
            setPreviewCurrentTime(0);
        }, [audioUri, previewPlayer]);

        const togglePreviewPlayback = useCallback(() => {
            if (!audioUri || !previewPlayer) return;

            if (previewPlayer.playing) {
                previewPlayer.pause();
                setIsPreviewPlaying(false);
            } else {
                if (previewCurrentTime > 0 && recordedDuration > 0) {
                    const durationInSeconds = recordedDuration / 1000;
                    if (previewCurrentTime >= durationInSeconds - 0.1) {
                        previewPlayer.seekTo(0);
                        setPreviewCurrentTime(0);
                    }
                }
                previewPlayer.play();
                setIsPreviewPlaying(true);
            }
        }, [audioUri, previewPlayer, previewCurrentTime, recordedDuration]);

        const sendVoiceMessage = useCallback(() => {
            if (audioUri && onSendVoice) {
                onSendVoice(audioUri);
                setAudioUri(null);
                setRecordedDuration(0);
            }
        }, [audioUri, onSendVoice]);

        const handleSendMessage = useCallback(() => {
            if (audioUri) {
                sendVoiceMessage();
            } else if (inputText.trim() && onSendMessage) {
                onSendMessage(inputText.trim());
                setInputText("");
            }
        }, [audioUri, inputText, sendVoiceMessage, onSendMessage]);

        const handleUploadImage = useCallback(async () => {
            imagePicker((uri) => {
                if (uri && onSendImage) {
                    onSendImage(uri);
                }
            }, { editable: false });
        }, [onSendImage]);

        const containerStyle = useMemo(
            () => [styles.chatOuterContainer, { paddingBottom: bottomInset + 16 }],
            [bottomInset]
        );

        const recordingDuration = useMemo(
            () => Math.ceil(recorderState.durationMillis / 1000),
            [recorderState.durationMillis]
        );

        const previewDuration = useMemo(
            () => Math.ceil(recordedDuration / 1000),
            [recordedDuration]
        );

        return (
            <>
                {replyTo && (
                    <ReplyPreview replyTo={replyTo} onClearReply={onClearReply} />
                )}
                <View style={containerStyle}>
                <View style={styles.chatInnerContainer}>
                    {keyboardVisible && isRecording ? (
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
                                    <RNText style={styles.recordText}>
                                        {recordingDuration}s
                                    </RNText>
                                </View>
                                <Pressable
                                    style={styles.pauseButton}
                                    onPress={isPaused ? resumeRecording : pauseRecording}
                                >
                                    {isPaused ? (
                                        <Play size={20} color={COLORS.background} fill={COLORS.background} />
                                    ) : (
                                        <Pause size={20} color={COLORS.background} fill={COLORS.background} />
                                    )}
                                </Pressable>
                            </View>
                            <SimpleWaveform isActive={!isPaused && recorderState.isRecording} />
                        </View>
                    ) : audioUri ? (
                        <View style={styles.recordingContainer}>
                            <View style={styles.recordControlsContainer}>
                                <View style={styles.recordPill}>
                                    <RNText style={styles.recordText}>
                                        {previewDuration}s
                                    </RNText>
                                </View>
                                <Pressable style={styles.pauseButton} onPress={togglePreviewPlayback}>
                                    {isPreviewPlaying ? (
                                        <Pause size={20} color={COLORS.background} fill={COLORS.background} />
                                    ) : (
                                        <Play size={20} color={COLORS.background} fill={COLORS.background} />
                                    )}
                                </Pressable>
                            </View>
                            <SimpleWaveform isActive={isPreviewPlaying} />
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
    }
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
    recordText: {
        color: COLORS.background,
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
});
