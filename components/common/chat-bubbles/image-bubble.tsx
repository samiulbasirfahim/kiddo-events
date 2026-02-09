import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet } from "react-native";
import Animated, {
    FadeIn,
    FadeOut,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.6;
const DEFAULT_HEIGHT = 200;

type ImageBubbleProps = {
    imageUrl: string;
    timestamp: Date;
    isOwnMessage: boolean;
};

export const ImageBubble = memo(function ImageBubble({
    imageUrl,
    timestamp,
    isOwnMessage,
}: ImageBubbleProps) {
    const [imageHeight, setImageHeight] = useState<number>(DEFAULT_HEIGHT);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        return () => {
            // Reset animation values on unmount
            scale.value = 0.8;
            opacity.value = 0;
        };
    }, [scale, opacity]);

    const handleImageLoad = (event: any) => {
        const { width, height } = event.source;
        if (width && height) {
            const ratio = height / width;
            const newHeight = IMAGE_WIDTH * ratio;
            setImageHeight((prev) => (prev === newHeight ? prev : newHeight));
        }
    };

    const openPreview = useCallback(() => {
        setIsPreviewVisible(true);
        scale.value = withTiming(1, { duration: 200 });
        opacity.value = withTiming(1, { duration: 200 });
    }, [scale, opacity]);

    const closePreview = useCallback(() => {
        scale.value = withTiming(0.8, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 });
        setTimeout(() => {
            setIsPreviewVisible(false);
        }, 200);
    }, [scale, opacity]);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const imageStyle = useMemo(
        () => [styles.image, { height: imageHeight }],
        [imageHeight],
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

    return (
        <>
            <Pressable onPress={openPreview}>
                <Image
                    source={{ uri: imageUrl }}
                    style={imageStyle}
                    contentFit="cover"
                    onLoad={handleImageLoad}
                    cachePolicy="memory-disk"
                    priority="normal"
                    recyclingKey={imageUrl}
                />
            </Pressable>

            <RNText style={timestampStyle} variant="caption">
                {formatTimeAMPM(timestamp)}
            </RNText>

            <Modal
                visible={isPreviewVisible}
                transparent
                animationType="none"
                statusBarTranslucent
                onRequestClose={closePreview}
            >
                <Animated.View
                    style={styles.modalContainer}
                    entering={FadeIn.duration(200)}
                    exiting={FadeOut.duration(200)}
                >
                    <Pressable style={styles.backdrop} onPress={closePreview} />

                    <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.fullImage}
                            contentFit="contain"
                            cachePolicy="memory-disk"
                            priority="high"
                        />
                    </Animated.View>

                    <Pressable
                        style={[styles.closeButton, { top: top + 16 }]}
                        onPress={closePreview}
                    >
                        <X size={28} color={COLORS.background} strokeWidth={2} />
                    </Pressable>
                </Animated.View>
            </Modal>
        </>
    );
});

const styles = StyleSheet.create({
    image: {
        width: IMAGE_WIDTH,
        borderRadius: 24,
    },
    timestamp: {
        marginTop: 4,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        justifyContent: "center",
        alignItems: "center",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    closeButton: {
        position: "absolute",
        right: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
});
