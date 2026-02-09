import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Image } from "expo-image";
import { memo, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
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
    isOwnMessage 
}: ImageBubbleProps) {
    const [imageHeight, setImageHeight] = useState<number>(DEFAULT_HEIGHT);

    const handleImageLoad = (event: any) => {
        const { width, height } = event.source;
        if (width && height) {
            const ratio = height / width;
            setImageHeight(IMAGE_WIDTH * ratio);
        }
    };

    const imageStyle = useMemo(() => ([
        styles.image,
        { height: imageHeight }
    ]), [imageHeight]);

    const timestampStyle = useMemo(() => ([
        styles.timestamp,
        {
            color: isOwnMessage ? COLORS.background + "CC" : COLORS.textPrimary + "CC",
            alignSelf: isOwnMessage ? "flex-start" as const : "flex-end" as const,
        }
    ]), [isOwnMessage]);

    return (
        <>
            <Image
                source={{ uri: imageUrl }}
                style={imageStyle}
                contentFit="cover"
                onLoad={handleImageLoad}
                cachePolicy="memory-disk"
                priority="normal"
                recyclingKey={imageUrl}
            />

            <RNText style={timestampStyle} variant="caption">
                {formatTimeAMPM(timestamp)}
            </RNText>
        </>
    );
});

const styles = StyleSheet.create({
    image: {
        width: IMAGE_WIDTH,
        borderRadius: 12,
    },
    timestamp: {
        marginTop: 4,
        paddingHorizontal: 12,
    },
});
