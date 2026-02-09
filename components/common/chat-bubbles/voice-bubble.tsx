import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { useAudioPlayer } from "expo-audio";
import { Pause, Play } from "lucide-react-native";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SimpleWaveform } from "../simple-waveform";

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
    const player = useAudioPlayer(audioUrl, { downloadFirst: true });
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (player.duration && player.duration > 0) {
            setIsLoading(false);
            setDuration(player.duration);
        }
    }, [player.duration]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (player) {
                setIsLoading(false);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [audioUrl]);

    useEffect(() => {
        if (!player) return;
        
        setIsPlaying(player.playing);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (player.playing) {
            intervalRef.current = setInterval(() => {
                if (player && player.currentTime !== undefined) {
                    setCurrentTime(player.currentTime);
                }
            }, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [player, player?.playing]);

    useEffect(() => {
        if (
            !player.playing &&
            currentTime > 0 &&
            duration > 0 &&
            currentTime >= duration - 0.1
        ) {
            player.pause();
            player.seekTo(0);
            setCurrentTime(0);
        }
    }, [player.playing, currentTime, duration]);

    const togglePlayPause = useCallback(() => {
        if (isLoading || !player) return;

        try {
            if (player.playing) {
                player.pause();
                setIsPlaying(false);
            } else {
                player.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Audio playback error:', error);
        }
    }, [player, isLoading]);

    const formatDuration = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);

    const durationTextStyle = useMemo(
        () => [
            styles.durationText,
            {
                color: isOwnMessage
                    ? COLORS.background + "DD"
                    : COLORS.textPrimary + "DD",
            },
        ],
        [isOwnMessage],
    );

    const timestampStyle = useMemo(
        () => [
            styles.timestamp,
            {
                color: isOwnMessage
                    ? COLORS.background + "CC"
                    : COLORS.textPrimary + "CC",
                alignSelf: isOwnMessage
                    ? ("flex-start" as const)
                    : ("flex-end" as const),
            },
        ],
        [isOwnMessage],
    );

    const iconColor = useMemo(
        () => (isOwnMessage ? COLORS.background : COLORS.primary),
        [isOwnMessage],
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View>
                    <View style={styles.visualizerContainer}>
                        <SimpleWaveform isActive={isPlaying} color={iconColor} />

                        <Pressable
                            onPress={togglePlayPause}
                            style={[
                                styles.playButton,
                                isLoading && styles.playButtonDisabled,
                            ]}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color={iconColor} />
                            ) : isPlaying ? (
                                <Pause size={24} color={iconColor} fill={iconColor} />
                            ) : (
                                <Play size={24} color={iconColor} fill={iconColor} />
                            )}
                        </Pressable>
                    </View>
                    <RNText style={durationTextStyle} variant="caption">
                        {isLoading
                            ? "Loading..."
                            : `${formatDuration(currentTime)} / ${formatDuration(duration)}`}
                    </RNText>
                </View>
            </View>

            <RNText style={timestampStyle} variant="caption">
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
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playButton: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    playButtonDisabled: {
        opacity: 0.5,
    },
    durationText: {
        marginVertical: 4,
    },
    timestamp: {
        marginTop: 4,
    },
});
