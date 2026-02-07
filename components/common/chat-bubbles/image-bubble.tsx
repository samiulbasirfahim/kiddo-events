import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { Dimensions } from "react-native";

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

    return (
        <>
            <Image
                source={{ uri: imageUrl }}
                style={{
                    width: IMAGE_WIDTH,
                    height: imageHeight,
                    borderRadius: 12,
                }}
                contentFit="cover"
                onLoad={handleImageLoad}
                cachePolicy="memory-disk"
                priority="normal"
                recyclingKey={imageUrl}
            />

            <RNText
                style={{
                    color: isOwnMessage
                        ? COLORS.background + "CC"
                        : COLORS.textPrimary + "CC",
                    marginTop: 4,
                    alignSelf: isOwnMessage ? "flex-start" : "flex-end",
                    paddingHorizontal: 12,
                }}
                variant="caption"
            >
                {formatTimeAMPM(timestamp)}
            </RNText>
        </>
    );
});
