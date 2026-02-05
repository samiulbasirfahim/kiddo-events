import type { Message } from "@/types/chat";
import { Dimensions, Image as Img, StyleSheet, View } from "react-native";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Image } from "expo-image";
import { useEffect, useState } from "react";

export type ChatBubbleProps = {
    message: Message;
    avatarUrl?: string;
    isOwnMessage: boolean;
};
const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.6;

export function ChatBubble({
    message,
    avatarUrl,
    isOwnMessage,
}: ChatBubbleProps) {
    const [imageHeight, setImageHeight] = useState<number>(200);

    useEffect(() => {
        if (message.type === "image" && message.file) {
            Img.getSize(
                message.file,
                (width, height) => {
                    const ratio = height / width;
                    setImageHeight(IMAGE_WIDTH * ratio);
                },
                () => {
                    // fallback if image size fails
                    setImageHeight(200);
                },
            );
        }
    }, [message]);

    return (
        <View
            style={[
                sts.container,
                {
                    justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                },
            ]}
        >
            {!isOwnMessage && avatarUrl ? (
                <View
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: 20,
                        marginRight: 6,
                        backgroundColor: COLORS.primary,
                    }}
                ></View>
            ) : null}
            <View
                style={[
                    sts.bubbleContainer,
                    {
                        backgroundColor: isOwnMessage ? COLORS.primary : COLORS.background,
                    },
                ]}
            >
                {message.type === "text" ? (
                    <RNText
                        style={{
                            color: isOwnMessage ? COLORS.background : COLORS.textPrimary,
                        }}
                    >
                        {message.content}
                    </RNText>
                ) : (
                    <Image
                        source={{ uri: message.file || "" }}
                        style={{
                            width: IMAGE_WIDTH,
                            height: imageHeight,
                            borderRadius: 12,
                        }}
                        contentFit="contain"
                    />
                )}
            </View>
        </View>
    );
}

const sts = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 4,
        marginHorizontal: 8,
    },
    bubbleContainer: {
        maxWidth: "80%",
        borderRadius: 24,
        padding: 12,
    },
});
