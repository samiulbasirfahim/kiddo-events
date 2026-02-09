import { formatTimeAMPM } from "@/chat/utils/time";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { memo, useMemo } from "react";
import { StyleSheet } from "react-native";

type TextBubbleProps = {
    content: string;
    timestamp: Date;
    isOwnMessage: boolean;
};

export const TextBubble = memo(function TextBubble({ 
    content, 
    timestamp, 
    isOwnMessage 
}: TextBubbleProps) {
    const textStyle = useMemo(() => ([
        styles.text,
        { color: isOwnMessage ? COLORS.background : COLORS.textPrimary }
    ]), [isOwnMessage]);

    const timestampStyle = useMemo(() => ([
        styles.timestamp,
        {
            color: isOwnMessage ? COLORS.background + "CC" : COLORS.textPrimary + "CC",
            alignSelf: isOwnMessage ? "flex-start" as const : "flex-end" as const,
        }
    ]), [isOwnMessage]);

    return (
        <>
            <RNText style={textStyle}>
                {content}
            </RNText>

            <RNText style={timestampStyle} variant="caption">
                {formatTimeAMPM(timestamp)}
            </RNText>
        </>
    );
});

const styles = StyleSheet.create({
    text: {},
    timestamp: {
        marginTop: 4,
    },
});
