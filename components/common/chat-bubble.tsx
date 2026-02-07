import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import type { Message } from "@/types/chat";
import { Image } from "expo-image";
import { ReplyIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image as Img, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

export type ChatBubbleProps = {
    message: Message;
    avatarUrl?: string;
    isOwnMessage: boolean;
    onSwipeOpen?: (message: Message | null, ref: any) => void;
};
const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.6;

export function ChatBubble({
    message,
    avatarUrl,
    isOwnMessage,
    onSwipeOpen,
}: ChatBubbleProps) {
    const [imageHeight, setImageHeight] = useState<number>(200);
    const swipeAbleRef = useRef(null);

    useEffect(() => {
        if (message.type === "image" && message.file) {
            Img.getSize(
                message.file,
                (width, height) => {
                    const ratio = height / width;
                    setImageHeight(IMAGE_WIDTH * ratio);
                },
                () => {
                    setImageHeight(200);
                },
            );
        }
    }, [message]);

    function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
        const styles = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: isOwnMessage ? drag.value + 20 : drag.value - 20,
                    },
                ],
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                // paddingRight: isOwnMessage ? 0 : 12,
                // paddingLeft: isOwnMessage ? 12 : 0,
            };
        });

        return (
            <Reanimated.View style={styles}>
                <ReplyIcon size={24} color={COLORS.textPrimary} />
            </Reanimated.View>
        );
    }

    return (
        <Swipeable
            friction={2}
            ref={swipeAbleRef}
            overshootRight={true}
            overshootLeft={true}
            onSwipeableWillOpen={() => onSwipeOpen?.(message, swipeAbleRef)}
            renderLeftActions={isOwnMessage ? undefined : RightAction}
            renderRightActions={isOwnMessage ? RightAction : undefined}
            childrenContainerStyle={[
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
                        paddingHorizontal: message.type === "image" ? 1 : 16,
                        paddingVertical: message.type === "image" ? 1 : 10,
                        borderRadius: message.type === "image" ? 13 : 24,
                    },
                ]}
            >
                {message.type === "text" ? (
                    <>
                        <RNText
                            style={{
                                color: isOwnMessage ? COLORS.background : COLORS.textPrimary,
                            }}
                        >
                            {message.content}
                        </RNText>

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
                            {formatTimeAMPM(message.created_at)}
                        </RNText>
                    </>
                ) : (
                    <>
                        <Image
                            source={{ uri: message.file || "" }}
                            style={{
                                width: IMAGE_WIDTH,
                                height: imageHeight,
                                borderRadius: 12,
                            }}
                            contentFit="contain"
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
                            {formatTimeAMPM(message.created_at)}
                        </RNText>
                    </>
                )}
            </View>
        </Swipeable>
    );
}

const sts = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginVertical: 4,
        flexDirection: "row",
    },
    bubbleContainer: {
        maxWidth: "80%",
    },
});
