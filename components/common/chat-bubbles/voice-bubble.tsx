import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import {
    requestRecordingPermissionsAsync,
    useAudioPlayer,
    useAudioSampleListener,
} from "expo-audio";
import { Pause, Play } from "lucide-react-native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { AudioVisualizer } from "../audio-visualizer";

type VoiceBubbleProps = {
    audioUrl: string;
    timestamp: Date;
    isOwnMessage: boolean;
};

export const VoiceBubble = memo(function VoiceBubble({
    audioUrl,
    timestamp,
    isOwnMessage,
}: VoiceBubbleProps) {
    const player = useAudioPlayer(audioUrl, {
        downloadFirst: true,
    });
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [metering, setMetering] = useState<number>(-20);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const permissionRequested = useRef(false);

    useEffect(() => {
        if (!permissionRequested.current) {
            permissionRequested.current = true;
            requestRecordingPermissionsAsync().catch(() => {
                console.warn("Recording permission is required for audio sampling");
            });
        }
    }, []);

    // Track loading state - check both duration and player status
    useEffect(() => {
        if (player.duration && player.duration > 0) {
            setIsLoading(false);
            setDuration(player.duration);
        }
    }, [player.duration]);

    // Fallback: if player is ready but duration hasn't updated, mark as not loading
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (player && !player.playing && !isLoading) {
                // Already loaded
            } else if (player) {
                setIsLoading(false);
            }
        }, 2000); // Give it 2 seconds to load

        return () => clearTimeout(timeout);
    }, [audioUrl]);

    useAudioSampleListener(
        player,
        useCallback(
            (sample) => {
                if (!player.playing) return;

                const channel = sample.channels[0];
                if (!channel || channel.frames.length === 0) return;

                const sumSquares = channel.frames.reduce(
                    (sum, frame) => sum + frame * frame,
                    0,
                );
                const rms = Math.sqrt(sumSquares / channel.frames.length);
                const dbfs = rms > 0 ? 20 * Math.log10(rms) : -160;

                console.log(
                    "Audio Sample RMS:",
                    rms.toFixed(5),
                    "dBFS:",
                    dbfs.toFixed(2),
                );
                setMetering(dbfs);
            },
            [player.playing],
        ),
    );

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (player.playing) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(player.currentTime);
            }, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [player.playing]);

    // Handle audio end - pause and reset to beginning
    useEffect(() => {
        if (!player.playing && currentTime > 0 && duration > 0) {
            // Check if we're at the end (within 100ms)
            if (currentTime >= duration - 0.1) {
                player.pause();
                player.seekTo(0);
                setCurrentTime(0);
            }
        }
    }, [player.playing, currentTime, duration]);

    const togglePlayPause = useCallback(() => {
        if (isLoading) return;

        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
    }, [player, isLoading]);

    const formatDuration = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);

    useEffect(() => {
        if (!player.playing) {
            setMetering(-20);
        }
    }, [player.playing]);

    const totalDuration = duration;

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.visualizerContainer}>
                    <AudioVisualizer
                        isRecording={player.playing}
                        metering={metering}
                        usePrimaryBg={!isOwnMessage}
                    />
                    <RNText
                        style={{
                            color: isOwnMessage
                                ? COLORS.background + "DD"
                                : COLORS.textPrimary + "DD",
                            marginVertical: 4,
                        }}
                        variant="caption"
                    >
                        {isLoading
                            ? "Loading..."
                            : `${formatDuration(currentTime)} / ${formatDuration(totalDuration)}`}
                    </RNText>
                </View>

                <Pressable
                    onPress={togglePlayPause}
                    style={[styles.playButton, isLoading && styles.playButtonDisabled]}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={isOwnMessage ? COLORS.background : COLORS.primary}
                        />
                    ) : player.playing ? (
                        <Pause
                            size={24}
                            color={isOwnMessage ? COLORS.background : COLORS.primary}
                            fill={isOwnMessage ? COLORS.background : COLORS.primary}
                        />
                    ) : (
                        <Play
                            size={24}
                            color={isOwnMessage ? COLORS.background : COLORS.primary}
                            fill={isOwnMessage ? COLORS.background : COLORS.primary}
                        />
                    )}
                </Pressable>
            </View>

            <RNText
                style={{
                    color: isOwnMessage
                        ? COLORS.background + "CC"
                        : COLORS.textPrimary + "CC",
                    marginTop: 4,
                    alignSelf: isOwnMessage ? "flex-start" : "flex-end",
                }}
                variant="caption"
            >
                {formatTimeAMPM(timestamp)}
            </RNText>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        minWidth: 200,
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    visualizerContainer: {
        flex: 1,
    },
    playButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    playButtonDisabled: {
        opacity: 0.5,
    },
});
